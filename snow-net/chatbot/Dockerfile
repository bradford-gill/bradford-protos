# Use the official Python image
FROM python:3.11-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt to the working directory
COPY requirements.txt /app/

# Install the dependencies
RUN uv pip install --no-cache-dir -r requirements.txt --system

# Copy the rest of the application code to the working directory
COPY . /app/

# Expose the port Streamlit runs on
EXPOSE 80

# Command to run the Streamlit app
CMD ["streamlit", "run", "app.py", "--server.port=80"]