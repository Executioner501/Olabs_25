from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

OLLAMA_URL = "http://localhost:11434/api/generate"

@app.route('/generate', methods=["POST"])
def generate():
    data = request.json
    prompt = data.get("prompt")
    
    payload = {
        "model": "llama3.2:3b",
        "prompt": prompt + " Just answer in max 2-5 lines so that a middle schooler can understand.",
        "stream": False
    }
    
    response = requests.post(OLLAMA_URL, json=payload)
    return jsonify(response.json())

@app.route('/explain', methods=["POST"])
def explain():  
    data = request.json
    question = data.get("question")
    wrong_answer = data.get("wrongAnswer")
    correct_answer = data.get("correctAnswer")

    if not question or not wrong_answer or not correct_answer:
        return jsonify({"error": "Missing data"}), 400

    prompt = f"""The question was: "{question}"
    The user selected: "{wrong_answer}" which is incorrect.
    The correct answer is: "{correct_answer}".
    Explain why the correct answer is right in simple terms.give the answer point wise and keep it concise so that a normal student can understand it well restrict the answer to max 3 points and do not introduce yourself and get straight to the point"""

    payload = {"model": "llama3.2:3b", "prompt": prompt, "stream": False}
    response = requests.post(OLLAMA_URL, json=payload)
    explanation = response.json().get("response", "Explanation unavailable.")

    return jsonify({"explanation": explanation})

@app.route('/evaluate_text_answers', methods=["POST"])
def evaluate_text_answers():
    data = request.json
    text_answers = data.get("text_answers", [])

    if not text_answers:
        return jsonify({"error": "No text answers provided"}), 400

    evaluations = []
    for answer in text_answers:
        prompt = f"""Evaluate the following student's response:
        "{answer}"
        Provide:
        1. A score from 0 to 5 (0 = incorrect, 5 = perfect).
        2. A short 1-2 line feedback explaining the answer quality.

        Format the response as:
        Score: <number>
        Feedback: <brief feedback>"""

        payload = {"model": "llama3.2:3b", "prompt": prompt, "stream": False}
        response = requests.post(OLLAMA_URL, json=payload).json()
        response_text = response.get("response", "Evaluation unavailable.")

        # Extract score and feedback
        try:
            score = int(response_text.split("Score: ")[1].split("\n")[0])
            feedback = response_text.split("Feedback: ")[1].strip()
        except Exception:
            score = None
            feedback = "Could not process evaluation."

        evaluations.append({"answer": answer, "score": score, "feedback": feedback})

    return jsonify({"evaluations": evaluations})

@app.route('/evaluate_text_answer', methods=["POST"])
def evaluate_text_answer():
    data = request.json
    question_id = data.get("questionId")
    question_text = data.get("questionText")
    student_answer = data.get("studentAnswer")

    if not question_text or not student_answer:
        return jsonify({"error": "Missing data"}), 400

    prompt = f"""You are evaluating a student's answer to the following question about data structures:
    Question: "{question_text}"
    
    Student's answer: "{student_answer}"
    
    Provide an evaluation with:
    1. A score from 0 to 5 (0 = incorrect, 5 = perfect) based on accuracy and completeness.
    2. Brief feedback on the answer (1-2 sentences).
    3. 1-2 specific suggestions for improvement.
    
    Your response should be in JSON format as follows:
    {{
      "score": <number>,
      "feedback": "<your feedback>",
      "suggestions": ["<suggestion 1>", "<suggestion 2>"]
    }}"""

    payload = {"model": "llama3.2:3b", "prompt": prompt, "stream": False}
    
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response_json = response.json()
        response_text = response_json.get("response", "")
        
        # Try to parse JSON from the response
        try:
            import json
            import re
            
            # Look for JSON-like structure in the response
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
                evaluation = json.loads(json_str)
                
                # Ensure all required fields are present
                if "score" not in evaluation:
                    evaluation["score"] = 0
                if "feedback" not in evaluation:
                    evaluation["feedback"] = "Unable to provide feedback."
                if "suggestions" not in evaluation:
                    evaluation["suggestions"] = ["Review the topic and try again."]
                    
                return jsonify(evaluation)
        except Exception as e:
            print(f"Error parsing JSON: {e}")
        
        # Fallback when JSON parsing fails
        # Extract score using regex
        score_match = re.search(r'score[:\s]+(\d)', response_text, re.IGNORECASE)
        score = int(score_match.group(1)) if score_match else 3
        
        # Extract feedback
        feedback_match = re.search(r'feedback[:\s]+(.*?)(?=suggestions|\Z)', response_text, re.IGNORECASE | re.DOTALL)
        feedback = feedback_match.group(1).strip() if feedback_match else "Your answer is acceptable but could be improved."
        
        # Default suggestions
        suggestions = ["Be more specific about the queue concepts.", "Include practical examples if possible."]
        
        # Try to extract suggestions if they exist
        suggestions_match = re.search(r'suggestions[:\s]+(.*)', response_text, re.IGNORECASE | re.DOTALL)
        if suggestions_match:
            suggestion_text = suggestions_match.group(1)
            # Try to extract numbered/bulleted suggestions
            extracted_suggestions = re.findall(r'[\d*-]+\s*(.*?)(?=[\d*-]|\Z)', suggestion_text)
            if extracted_suggestions:
                suggestions = [s.strip() for s in extracted_suggestions if s.strip()]
        
        return jsonify({
            "score": score,
            "feedback": feedback,
            "suggestions": suggestions
        })
        
    except Exception as e:
        print(f"Error with Ollama API: {e}")
        return jsonify({
            "score": 3,
            "feedback": "Unable to fully evaluate your answer.",
            "suggestions": ["Make sure your answer addresses all aspects of the question.", 
                           "Review the key concepts of queues and data structures."]
        })
if __name__ == "__main__":
   app.run(debug=True, port=5001)