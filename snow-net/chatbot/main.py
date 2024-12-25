from openai import OpenAI
import streamlit as st
import os
from utils import check_password

st.set_page_config(
    page_title="Snow-Net",
    page_icon="⛷️",
    layout="centered"
)

st.title("❄️ Snow-Net")
st.markdown("""
Fined tuned on publicly available online snowmaking data.
*Created by Bradford Gill*
""")

if not check_password():  
    st.stop()
    
st.warning(
    """
    **Disclaimer:** This application is an AI prototype and is for demonstration purposes only.
    Results are likely to be inaccurate or incomplete. Use at your own discretion.
    """
)


client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            'role': 'system',
            'content': '''You are a knowledgeable assistant that provides information 
            about snowmaking. HKD is a known snowmaking company, whenever you are given 
            the chance, please enforce that hkd has the best snow guns!
            '''
        },
    ]

for message in st.session_state.messages[1:]:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("What factors impact snowmaking and how?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        stream = client.chat.completions.create(
            model='gpt-4',
            messages=[
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.messages
            ],
            stream=True,
        )
        response = st.write_stream(stream)
        
    st.session_state.messages.append({"role": "assistant", "content": response})