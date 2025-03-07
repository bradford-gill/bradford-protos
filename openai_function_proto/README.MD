## Development

### Creating and activating venv using UV
~~~bash
# Create a virtual environment
uv venv venv

# Activate the virtual environment
source venv/bin/activate

# Save installed packages to requirements.txt
uv pip freeze > requirements.txt

uv pip install -r requirements.txt
~~~