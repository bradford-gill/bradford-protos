import json
import requests
from dotenv import load_dotenv
import os
from openai import OpenAI

# Load environment variables from .env
load_dotenv()

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Example function to fetch weather data
def get_weather(city):
    """Fetches weather data for a given city."""
    api_url = f"https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true"
    response = requests.get(api_url)

    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": f"Discripe the weather: {response.json()}"}],
    )


    return response.choices[0].message

# Define the function schema for OpenAI function calling
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a specific city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "The name of the city to get the weather for",
                    }
                },
                "required": ["city"],
            },
        }
    }
]

def main():
    # Call the OpenAI API
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": "What's the weather like in Tokyo?"}],
        tools=tools,
        tool_choice="auto",  # OpenAI will decide when to call the function
    )

    # Check if OpenAI wants to call a tool/function
    tool_calls = response.choices[0].message.tool_calls
    for tool_call in tool_calls:
        if tool_call.function.name == "get_weather":
            # Parse the arguments
            arguments = json.loads(tool_call.function.arguments)
            # Call the function
            weather_info = get_weather(arguments["city"])
            print(weather_info)

if __name__ == "__main__":
    main()