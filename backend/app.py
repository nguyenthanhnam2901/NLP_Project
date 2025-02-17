from flask import Flask, request, jsonify
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import torch
from flask_cors import CORS  # Import flask_cors

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Load model and tokenizer
MODEL_PATH = "../pegasus-samsum/checkpoint-920"  # Adjusted path
TOKENIZER_PATH = "../tokenizer"   # Adjusted path
device = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_PATH)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_PATH).to(device)
summarizer = pipeline("summarization", model=model, tokenizer=tokenizer, device=0 if device == 'cuda' else -1)

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    summary = summarizer(text, length_penalty=0.8, num_beams=8, max_length=128)[0]["summary_text"]
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)
