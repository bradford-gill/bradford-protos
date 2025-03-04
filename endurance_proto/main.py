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

# Create system prompt
system_prompt = {"role": "system", "content": """
        You are an endurance training plan expert, you need to collect information from the user via a convesation,
        ask one at a time as if you are having a conversation to a coach or therapist.  
        Prompt the user until you have collected the following information. 

        Current Fitness Level - Assess baseline endurance, strength, and experience.
        Injury History - Identify past injuries to prevent recurrence.
        Training History - Consider past training volume, intensity, and structure.
        Age & Recovery Ability - Younger athletes may recover faster, while older athletes may need more rest.
        Duration & Intensity - Different endurance sports have different energy system demands (e.g., marathon vs. cycling race).
        Terrain & Conditions - Tailor training to the race environment (hills, altitude).
        Technical Skills - Sports like mountain biking or open-water swimming require skill training.
        Training Duration - How many weeks until the race

        When the following information is collected, create a training plan.
        Please format the training plan as a chart, with the x axis being day of the week and the y axis being weeks until race. 
        Include total weekly milages and details about each workout.        
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
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": m["role"], "content": m["content"]} for m in st.session_state.messages] + [system_prompt]
            )

            assistant_response = response.choices[0].message.content
            message_placeholder.markdown(assistant_response)
            
            # Add assistant response to chat history
            st.session_state.messages.append({"role": "assistant", "content": assistant_response})
            
        except Exception as e:
            message_placeholder.error(f"An error occurred: {str(e)}")
