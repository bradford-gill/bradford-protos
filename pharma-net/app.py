import os
from typing import Callable
import streamlit as st
from openai import OpenAI
import itertools

from utils import check_password

prompts = [
    f"Tell me about {drug}" for drug in [
        "Pembrolizumab (Keytruda)",
        "Nivolumab (Opdivo)",
        "Trastuzumab (Herceptin)",
        "Imatinib (Gleevec)",
        "Bevacizumab (Avastin)",
        "Lenalidomide (Revlimid)",
        "Dabrafenib (Tafinlar) and Trametinib (Mekinist)",
    ]
]
    

class Session:
    def __init__(self) -> None:
        self.reset()
        
        self.client = OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
        )
    
    def reset(self) -> None:
        print('NEW SESSION')
        self.messages = [
            {
                'role': 'system',
                'content': '''You are a knowledgeable assistant that provides information 
                about high-end pharmaceuticals. Please highlight and suggest appropriate 
                Pharmacological Aids that will help the user. If the user asks something 
                outside of pharmaceuticals, please say you cannot answer the question since 
                you are not trained on that data.
                
                You must include the disclaimer: 
                
                "**This information is for general knowledge purposes only and is 
                not a substitute for professional medical advice, diagnosis, or 
                treatment. Always consult a licensed healthcare provider for any
                medical concerns**'''
            },
        ]
    
    def get_response(self, user_input: str) -> str:
        self.messages.append(
            {
                'role': 'user', 
                'content': user_input + ". Be specific and try to mention specific names of drugs that may help.",
            }
        )
        
        chat_completion = self.client.chat.completions.create(
            messages=self.messages,
            max_tokens=1000,
            model="gpt-4o",
        )
        
        self.messages.append(
            {
                'role': 'system', 
                'content': chat_completion.choices[0].message.content,
            }
        )

        return chat_completion.choices[0].message.content
        
session = Session()

# Streamlit app
def main():
    st.title("Pharma-net prototype")
    
    if not check_password():  
        st.stop()
 
    st.markdown("""
    Welcome to the Pharma-net prototype created by Bradford Gill.
    
    This is to be used as a proof of concept for prototyping only. Please expect errors in answers and a less than optimized user experience.
    
    Thank you for your consideration, feedback is appreciated. 
    
    **Contact**: (413)-575-3769
    """)
    
    st.warning("FOR PROTOTYPE USE ONLY - RESULT ACCURACY MAY VARY")
    

  
    if st.button("Reset Session"):
        session.reset()
        st.rerun()

    
    # Input field
    st.markdown("""
    #### I am an LLM trained on high-end pharmaceuticals, how can I help you?
    Please enter your own prompts to experiment with the model
    """)
    
    custom_input: bool = st.toggle("Custom Input", value=True)
    
    with st.form(key="my_form"):
        user_input = st.text_area(
            "Enter prompt",
            prompts[0],
        ) if custom_input else st.selectbox("Select prompt", options=prompts)
        
        submit = st.form_submit_button("Submit")
    
    if submit:
        # Call the get_response function
        with st.spinner("Running AI model"):
            message = session.get_response(user_input)

        # Display the response in markdown
        st.markdown(message)

    
    
    # >> Chat history >>
        
    if len(session.messages) > 1:
        st.markdown(" \n " * 8)
        st.markdown("### Chat history: ")
        
    for message in session.messages[1:]: 
        if message['role'] == 'system':
            st.markdown(message["content"])
        else: 
            st.markdown(f"_{message['content']}_")


if __name__ == "__main__":
    main()