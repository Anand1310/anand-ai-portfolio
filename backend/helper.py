from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()
def summarize_conversation(messages):
    try:
        print("Summarization started")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "Summarize this conversation briefly for memory retention."
                },
                {
                    "role": "user",
                    "content": str(messages)
                }
            ]
        )
        summary = response.choices[0].message.content
        print("Summarization successful")
        return summary
    
    except Exception as e:
        print(f"Summarization failed: {str(e)}", exc_info=True)
        return None