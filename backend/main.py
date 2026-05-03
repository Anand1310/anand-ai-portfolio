from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rag import get_relevant_docs
from openai import OpenAI
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
client = OpenAI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    session_id: str

chat_memory = {}

@app.get("/")
def root():
    return {"message": "AI Portfolio Backend Running"}

@app.get("/profile")
def get_profile():
    with open("data/profile.json") as f:
        return json.load(f)

@app.post("/chat")
def chat(req: ChatRequest):

    if req.session_id not in chat_memory:
        chat_memory[req.session_id] = []

    history = chat_memory[req.session_id]

    context = get_relevant_docs(req.message)

    system_prompt = f"""
        You are an AI assistant representing Anu Anand, a Software Engineer.

        Your job is to answer like a top candidate being evaluated by a recruiter — not like AI-generated content.

        STRICT RULES:
        - Keep answers concise (max 6 to 8 lines unless asked)
        - Have bullets point where ever applicable.
        - Focus on IMPACT, SYSTEMS BUILT, and SKILLS
        - Avoid generic phrases like "strong candidate", "blend of skills"
        - Sound confident and direct
        - No unnecessary headings
        - No fluff

        Style Example:
        - Built X using Y → achieved Z impact

        Context: {context}
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

    history.append({"role": "user", "content": req.message})
    history.append({"role": "assistant", "content": reply})

    return { "response": reply }