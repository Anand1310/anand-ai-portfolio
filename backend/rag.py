import os
import shutil
from langchain_community.document_loaders import PyPDFLoader, TextLoader, JSONLoader
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

def load_documents():

    print("Loading documents...")

    docs = []

    try:
        print("Loading Resume...")
        pdf_loader = PyPDFLoader("data/Anand_Resume.pdf")
        pdf_docs = pdf_loader.load()
        docs.extend(pdf_docs)
        print(f"Loaded Resume docs: {len(pdf_docs)}")

    except Exception as e:
        print("Resume LOAD ERROR:", str(e))

    try:
        print("Loading Profile JSON...")
        json_loader = JSONLoader(
            file_path="data/profile.json",
            jq_schema=".",
            text_content=False
        )

        json_docs = json_loader.load()
        docs.extend(json_docs)

        print(f"Loaded Profile JSON: {len(json_docs)}")

    except Exception as e:
        print("PROFILE JSON LOAD ERROR:", str(e))

    try:
        print("Loading Agentic Portfolio project text...")
        text_loader = TextLoader("data/projects.txt")

        text_docs = text_loader.load()
        docs.extend(text_docs)

        print(f"Loaded Agentic Portfolio Project Text: {len(text_docs)}")

    except Exception as e:
        print("AGENTIC PORTFOLIO TEXT LOAD ERROR:", str(e))

    print(f"Total docs loaded: {len(docs)}")

    return docs


def create_vector_store():

    try:
        persist_path = "./chroma_db"

        if os.path.exists(persist_path):
            print("Deleting previous vector store...")
            shutil.rmtree(persist_path)
            print("Old vector DB deleted")

        print("Creating vector store...")

        docs = load_documents()

        embeddings = OpenAIEmbeddings()

        db = Chroma.from_documents(
            docs,
            embeddings,
            persist_directory="./chroma_db"
        )

        print("Vector DB created successfully")

        return db

    except Exception as e:
        print("VECTOR STORE ERROR:", str(e))


def get_relevant_docs(query):

    try:
        print("Running similarity search...")
        print("User Query:", query)

        embeddings = OpenAIEmbeddings()

        db = Chroma(
            persist_directory="./chroma_db",
            embedding_function=embeddings
        )

        print("Connected to Chroma DB")

        results = db.similarity_search(query, k=3)

        print(f"Retrieved docs: {len(results)}")

        return "\n".join([doc.page_content for doc in results])

    except Exception as e:
        print("RETRIEVAL ERROR:", str(e))
        raise e


def debug_db():

    try:
        print("Debugging DB...")

        db = Chroma(
            persist_directory="./chroma_db",
            embedding_function=OpenAIEmbeddings()
        )

        docs = db.similarity_search("Anu Anand", k=5)

        print(f"Found docs: {len(docs)}")

        for i, doc in enumerate(docs):
            print(f"\n--- Doc {i} ---")
            print(doc.page_content[:300])

    except Exception as e:
        print("DEBUG DB ERROR:", str(e))
        
# create_vector_store()
# debug_db()