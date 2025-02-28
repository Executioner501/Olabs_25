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
    Explain why the correct answer is right in simple terms.give the answer point wise and keep it concise so that a normal student can understand it well"""

    payload = {"model": "llama3.2:3b", "prompt": prompt, "stream": False}
    response = requests.post(OLLAMA_URL, json=payload)
    explanation = response.json().get("response", "Explanation unavailable.")

    return jsonify({"explanation": explanation})

if __name__ == "__main__":
    app.run(debug=True)
