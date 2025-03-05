import streamlit as st
from dotenv import load_dotenv
import os
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Set up Streamlit page config
st.set_page_config(page_title="Training plan creation", layout="wide")
st.title("Training Plan Agent")
st.markdown("""
This is a quickly made prototype created by Brad of Blackmore Intellegence.
            
This has not been thoroughly tested or evaluated, it is for proof of concept only. 
            
Please feel free to email feedback to brad@blackmore.ai
""")

# Add a refresh button in the sidebar
if st.button("Clear conversation"):
    st.session_state.messages = [
        {"role": "assistant", "content": "Hi! What kind of endurance event can I help you with?"}
    ]
    st.rerun()


# Create system prompt
system_prompt = {"role": "system", "content": """
        You are an endurance training plan expert, you need to collect information from the user via a conversation,
        ask one at a time as if you are having a conversation to a coach or therapist. 
        
        You must be very polite and encouraging, postivity matters when trying to accomplish these goals. 
        Get the information as quickly as possible.
        Ask one pointed question at a time.
        
        Prompt the user until you have collected the following information:
         - Current Fitness Level - Assess baseline endurance fitness. (ei: what is their volume on a given week)
         - Injury History - Identify significant on going injuries to prevent recurrence.
         - Training History - Ask the user for some detials about their training history (ei, is this their first marathon)
         - Terrain - Are there a lot of hills or techinical features like techincal trials? If so ask if they want to add techincal training sessions
         - Training Duration - How many weeks until the race

        When the following information is collected, create a training plan.
                 
        Please format the training plan as a chart, with the x axis being day of the week and the y axis being weeks until race. 
        Include total weekly milages and details about each workout including relative effort.      
        """}

# Initialize chat history in session state if it doesn't exist
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "Hi! What kind of endurance event can I help you with?"}
    ]

# Display chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Chat input
if prompt := st.chat_input("Talk with the training plan agent"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    # Display user message
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # Get assistant response
    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        
        try:
            with st.spinner('Thinking...'):
                response = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[{"role": m["role"], "content": m["content"]} for m in st.session_state.messages] + [system_prompt]
                )

                assistant_response = response.choices[0].message.content
                message_placeholder.markdown(assistant_response)
                
                # Add assistant response to chat history
                st.session_state.messages.append({"role": "assistant", "content": assistant_response})
            
        except Exception as e:
            message_placeholder.error(f"An error occurred: {str(e)}")
