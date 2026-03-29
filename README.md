# 🤖 AI Agent Portfolio

A production-ready AI-powered personal portfolio featuring an intelligent agent that can answer questions about my experience, projects, and skills using Retrieval-Augmented Generation (RAG) and agentic workflows.

---

## 🚀 Overview

This project is an end-to-end AI system combining a modern frontend with a scalable backend and an intelligent agent.

The core highlight is an **AI assistant** that allows recruiters and users to interactively explore my profile through natural language.

---

## ✨ Features

* 🧠 AI-powered chatbot (ask about experience, skills, and projects)
* 🔎 Retrieval-Augmented Generation (RAG) over resume and project data
* 🔗 Agent-based workflow using LangGraph
* 🛠️ Tool calling (calculator, retrieval, reasoning)
* 💬 Conversational memory support
* ⚡ FastAPI backend for scalable AI serving
* 🎯 Clean and modern Angular frontend

---

## 🏗️ Architecture

```
Frontend (Angular)
        ↓
FastAPI Backend
        ↓
LangGraph Agent
   ↙        ↘
Tools      RAG Pipeline
         (Vector DB + Documents)
```

---

## 🧠 AI Capabilities

This system demonstrates:

* Agentic AI workflows
* Retrieval-Augmented Generation (RAG)
* Tool integration and orchestration
* Conversational memory handling
* Real-world LLM application design

---

## 📂 Project Structure

```
ai-agent-portfolio/
 ├── frontend/        # Angular application
 │    ├── src/
 │    ├── angular.json
 │    └── package.json
 │
 ├── backend/         # FastAPI + AI agent
 │    ├── main.py
 │    ├── requirements.txt
 │    └── venv/ (ignored)
 │
 ├── README.md
 ├── LICENSE
 └── .gitignore
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/ai-agent-portfolio.git
cd ai-agent-portfolio
```

---

### 2. Backend Setup (FastAPI)

```bash
cd backend

python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  (Mac/Linux)

python -m pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will run on:
👉 http://127.0.0.1:8000

---

### 3. Frontend Setup (Angular)

```bash
cd frontend

npm install
ng serve
```

Frontend will run on:
👉 http://localhost:4200

---

## 📸 Demo

> Coming soon: Live deployment and demo GIF

---

## 🎯 Why This Project?

This portfolio is designed to showcase:

* End-to-end AI system development
* Agent-based architectures (LangGraph)
* Real-world RAG implementation
* Full-stack engineering (Angular + FastAPI)

---

## 🛠️ Tech Stack

### Frontend

* Angular
* TypeScript
* SCSS

### Backend

* FastAPI
* Python

### AI / ML

* LangChain
* LangGraph
* LLM APIs
* Vector Database (Chroma / FAISS)

---

## 📬 Contact

* LinkedIn: <your-link>
* GitHub: <your-profile>
* Email: <your-email>

---

## ⭐ Future Improvements

* Streaming responses (real-time chat)
* Voice-based interaction
* Multi-agent workflows
* Cloud deployment (AWS/GCP)

---

## 📄 License

This project is licensed under the MIT License.
