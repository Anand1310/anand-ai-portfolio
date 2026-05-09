from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rag import get_relevant_docs
from helper import summarize_conversation
from openai import OpenAI
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
client = OpenAI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    session_id: str

chat_memory = {}
conversation_summary = ""

@app.get("/")
def root():
    return {"message": "AI Portfolio Backend Running"}

@app.get("/profile")
def get_profile():
    try:
        with open("data/profile.json") as f:
            print("Profile Loaded")
            return json.load(f)
    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        print("Chat API called, session_id:", req.session_id)
        print("User message:", req.message)

        if not req.message.strip():
            return

        if req.session_id not in chat_memory:
            chat_memory[req.session_id] = []

        history = chat_memory[req.session_id]

        context = get_relevant_docs(req.message)

        print("Context retrieved")

        summary = conversation_summary.get(req.session_id, "")

        system_prompt = f"""
        You are an AI portfolio assistant representing Anu Anand.

        RULES:
        - Speak about Anu Anand in third person
        - Only answer portfolio/career related questions
        - Keep answers concise
        - Focus on projects, impact, systems, and technical skills
        - No fluff
        - Use bullets when useful

        Conversation Summary:
        {summary}

        Relevant Context:
        {context}
        """

        messages = [
            {"role": "system", "content": system_prompt}
        ]

        for msg in history:
            messages.append(msg)

        messages.append({"role": "user", "content": req.message})

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )

        reply = response.choices[0].message.content

        print("OpenAI response received, reply: ", reply)

        history.append({"role": "user", "content": req.message})
        history.append({"role": "assistant", "content": reply})
        
        if len(history) > 6:
            summary = summarize_conversation(history)
            conversation_summary[req.session_id] = summary
            chat_memory[req.session_id] = history[-4:]
            print("Conversation summarized")
            
        print("Summary:", conversation_summary.get(req.session_id))

        return { "response": reply }
    except Exception as e:
        print("Chat Failed, ERROR:", str(e))
        return {"error": str(e)}