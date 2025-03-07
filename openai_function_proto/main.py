from openai import OpenAI
import json
import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def parse_string_to_dict(input_string, desired_keys):
    """
    Parse a string into a dictionary with specified keys using OpenAI.
    
    Args:
        input_string: The string to parse
        desired_keys: Dictionary of {key_name: description} pairs
    
    Returns:
        Dictionary with the specified keys
    """
    # Create schema for the function
    properties = {}
    for key, description in desired_keys.items():
        properties[str(key)] = {
            "type": "string", 
            "description": str(description)
        }
    
    # Define the function/tool schema
    tools = [
        {
            "type": "function",
            "function": {
                "name": "extract_information",
                "description": f"Extract structured information from the text",
                "parameters": {
                    "type": "object",
                    "properties": properties,
                    "required": list(desired_keys.keys())
                }
            }
        }
    ]
    
    # Make the API call
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "You extract information accurately from text."},
            {"role": "user", "content": f"Extract the following information from this text: {input_string}"}
        ],
        tools=tools,
        tool_choice={"type": "function", "function": {"name": "extract_information"}}
    )
    
    # Extract the structured data
    tool_call = response.choices[0].message.tool_calls[0]
    extracted_data = json.loads(tool_call.function.arguments)
    
    return extracted_data

# Example usage
input_text = "Brad is a super rad skier, who typically skis in the bridger mountians of montana. He has scarpa boots and blackcrow skis."

class SkierInfo(BaseModel):
    name: str = Field(description="The person's full name")
    skis: str = Field(description="what type of skis does the person have")
    boots: str = Field(description="what type of ski boots does the person have")
    mountain_range: str = Field(description="What mountian range does the person ski in normally")


result = parse_string_to_dict(input_text, dict(SkierInfo.model_fields))
print(json.dumps(result, indent=2))
print("\n\nSkier info:")
print(SkierInfo(**result))