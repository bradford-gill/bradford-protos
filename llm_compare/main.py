import os
from dotenv import load_dotenv
import streamlit as st
import requests

# Load environment variables from .env file
load_dotenv()


def open_ai_search(user_input):
    from openai import OpenAI
    # Use API key from environment variables
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # Create a placeholder for streaming output
    placeholder = st.empty()
    full_response = ""

    # Stream the response
    for chunk in client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": user_input}],
        tools=[{"type": "web_search"}],
        stream=True
    ):
        content = chunk.choices[0].delta.content or ""
        full_response += content
        placeholder.markdown(full_response)
    
    return full_response
    

def perplexity_search(user_input):
    headers = {
            "Authorization": f"Bearer {os.getenv('PERPLEXITY_API_KEY')}",
            "Content-Type": "application/json",
        }
    
    base_url = "https://api.perplexity.ai/chat/completions"

    default_system_message = """You are a helpful assistant that provides accurate information.
        Keep responses concise and to the point."""

    # Add stream=True to enable streaming
    payload = {
        "model": "sonar-pro",
        "messages": [
            {
                "role": "system",
                "content": default_system_message,
            },
            {"role": "user", "content": user_input},
        ],
        "max_tokens": 1000,
        "temperature": 0.2,
        "stream": True
    }

    # Create a placeholder for streaming output
    placeholder = st.empty()
    full_response = ""
    sources = []

    try:
        with requests.post(
            base_url,
            json=payload,
            headers=headers,
            stream=True
        ) as response:
            response.raise_for_status()
            
            for line in response.iter_lines():
                if line:
                    line = line.decode('utf-8')
                    if line.startswith('data: '):
                        data = line[6:]  # Remove 'data: ' prefix
                        if data == "[DONE]":
                            break
                        
                        import json
                        try:
                            chunk = json.loads(data)
                            if 'choices' in chunk and len(chunk['choices']) > 0:
                                content = chunk['choices'][0]['delta'].get('content', '')
                                if content:
                                    full_response += content
                                    placeholder.markdown(f"{full_response}\n\n----\n\n{sources}")
                                
                                # Check if there are citations in the chunk
                                if 'citations' in chunk:
                                    for url in chunk['citations']:
                                        if url not in sources:
                                            sources.append(url)
                                            placeholder.markdown(f"{full_response}\n\n----\n\n{sources}")
                        except json.JSONDecodeError:
                            pass

        return f"""
            {full_response}
            ----

            {sources}        
            """

    except requests.exceptions.RequestException as e:
        raise Exception(f"Error querying Perplexity API: {str(e)}")


def compare_search():
    st.title("Compare two models ")
    st.write("Welcome to the multi-page Streamlit app!")
    st.write("Select a page from the sidebar to navigate.")

    # Print OpenAI version
    import openai
    st.sidebar.markdown(f"OpenAI Version: {openai.__version__}")

    # Create a text input for user queries
    user_input = st.text_input("Enter your search query:", "")
    
    # Add a search button
    if not st.button("Search"):
        st.stop()

    if not user_input:
        st.warning("Please enter a search query.")
        st.stop()

    left, right = st.columns(2)

    with left:
        st.subheader("Open AI")
        with st.spinner("Loading OpenAI response..."):
            openai_response = open_ai_search(user_input)
            # The markdown display happens inside the open_ai_search function now
    
    with right:
        st.subheader("Perplexity")
        with st.spinner("Loading Perplexity response..."):
            perplexity_response = perplexity_search(user_input)
            # The markdown display happens inside the perplexity_search function now


# Dictionary of pages
pages = {
    "Home": compare_search,
}

if __name__ == "__main__":
    # Sidebar for navigation
    st.sidebar.title("Navigation")
    selection = st.sidebar.radio("Go to", list(pages.keys()))

    # Display the selected page
    pages[selection]()

    # Optional: Add some styling and app info in the sidebar
    st.sidebar.markdown("---")
    st.sidebar.info("This is a multi-page Streamlit app example.")
