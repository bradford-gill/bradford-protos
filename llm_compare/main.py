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

    response = client.responses.create(
        model="gpt-4o",
        tools=[{"type": "web_search_preview"}],
        input="What was a positive news story from today?"
    )

    return response.output_text
    

def perplexity_search(user_input):
    api_key = os.getenv("PERPLEXITY_API_KEY")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "sonar-medium-online",
        "query": user_input,
        "search": True
    }
    
    response = requests.post(
        "https://api.perplexity.ai/chat/completions",
        headers=headers,
        json=data
    )
    
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"Error: {response.status_code}, {response.text}"


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
            st.markdown(openai_response)
    
    with right:
        st.subheader("Perplexity")
        with st.spinner("Loading Perplexity response..."):
            perplexity_response = perplexity_search(user_input)
            st.markdown(perplexity_response)


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
