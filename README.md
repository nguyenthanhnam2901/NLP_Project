# Text Summarization Project

## Overview
This project is a **Text Summarization Web Application** that utilizes a fine-tuned **PEGASUS** model for text summarization. It consists of a **Flask-based backend** for handling summarization requests and a **React-based frontend** for user interaction.

## Features
- Summarizes input text using a fine-tuned PEGASUS model.
- Simple and intuitive UI for text input and summarization.
- Flask API backend for model inference.
- Supports GPU acceleration if available.

## Project Structure
```
Text Summarization Project
│── backend
│   │── app.py                 # Flask backend
│   │── requirements.txt       # Dependencies for backend
│── frontend
│   │── public
│   │   └── index.html         # Basic HTML template
│   │── src
│   │   ├── App.js             # Main React Component
│   │   ├── index.js           # React Entry Point
│   │   ├── package.json       # Frontend Dependencies
│   │   ├── package-lock.json  # Package Lock File
│── Text-Summarization-Fine-tuning-Transformers-model.ipynb # Model Fine-Tuning Notebook
```

## Setup and Installation

### Download model (if train) or Checkpoint (if use right away) 
- https://drive.google.com/drive/folders/17arjGx9-NPU-AdxjuZGrGkwvYNlzjZcn?usp=sharing

### Backend Setup
#### Prerequisites:
- Python 3.8+
- CUDA (Optional for GPU acceleration)
- Virtual environment (recommended)

#### Steps:
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  
   
   <!-- On Windows use:  -->
   python -m venv venv
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```sh
   python app.py
   ```
   The backend will start at `http://localhost:5000/`

### Frontend Setup
#### Prerequisites:
- Node.js and npm
   ```sh
   <!-- Recommend same environment as backend -->
   
   <!-- On window 10/11: -->
   <!-- Install Node.js and npm -->
   winget install OpenJS.NodeJS

   <!-- Check -->
   node -v
   npm -v

   <!-- If got blocked by shell: try these code then reset -->
   Get-Command node -ErrorAction SilentlyContinue
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```

#### Steps:
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React frontend:
   ```sh
   npm start
   ```
   The frontend will be available at `http://localhost:3000/`

## API Endpoint
- **Endpoint:** `POST /summarize`
- **Request Body:**
  ```json
  {
    "text": "Your text to summarize here"
  }
  ```
- **Response:**
  ```json
  {
    "summary": "Generated summary here"
  }
  ```

## Model Training & Fine-Tuning
The **fine-tuning process** is documented in `Text-Summarization-Fine-tuning-Transformers-model.ipynb` using **Hugging Face Transformers** and the **SAMSum dataset**.

#### Key Libraries Used:
```sh
pip install transformers[sentencepiece] datasets sacrebleu rouge_score py7zr
```

#### Training Steps:
- Load **SAMSum dataset** (`datasets.load_dataset("samsum")`)
- Tokenize input text and summaries.
- Fine-tune `google/pegasus-cnn_dailymail` using **Hugging Face Trainer**.
- Evaluate using **ROUGE metrics**.
- Save the model and tokenizer for deployment.

## References
- [Hugging Face Transformers](https://huggingface.co/transformers/)
- [SAMSum Dataset](https://huggingface.co/datasets/samsum)
- [PEGASUS Paper](https://arxiv.org/abs/1912.08777)

## Future Improvements
- Deploy on a cloud platform (AWS/GCP/Heroku).
- Add user authentication.
- Support multilingual summarization.
- Optimize model for faster inference.

---
**Author:** Group 21  
**Date:** February 2025

