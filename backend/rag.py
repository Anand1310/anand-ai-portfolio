from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

def load_documents():
    docs = []

    pdf_loader = PyPDFLoader("data\Anand_Resume.pdf")
    docs.extend(pdf_loader.load())

    text_loader = TextLoader("data\projects.txt")
    docs.extend(text_loader.load())

    return docs


def create_vector_store():
    docs = load_documents()

    embeddings = OpenAIEmbeddings()

    db = Chroma.from_documents(docs, embeddings, persist_directory="./chroma_db")

    return db

def get_relevant_docs(query):
    embeddings = OpenAIEmbeddings()
    db = Chroma(persist_directory="./chroma_db", embedding_function=embeddings)

    results = db.similarity_search(query, k=3)

    return "\n".join([doc.page_content for doc in results])

def debug_db():
    db = Chroma(
        persist_directory="./chroma_db",
        embedding_function=OpenAIEmbeddings()
    )

    docs = db.similarity_search("Anu Anand", k=5)

    for i, doc in enumerate(docs):
        print(f"\n--- Doc {i} ---")
        print(doc.page_content[:300])