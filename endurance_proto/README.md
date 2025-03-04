
# Front End
## Docker deployment
~~~bash
docker build -t proto .

# if .env file does not exist -> nano .env
docker run --env-file .env -p 80:80 proto
~~~

## Local Deployment
~~~bash
# install uv (if needed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# create env
uv venv .venv

# activate env
source .venv/bin/activate

# install requirements
uv pip install -r requirements.txt

# run app
uv run streamlit run main.py
~~~


## Docker Compose Deployment
Make sure you have a `.env` file in the root directory with your OpenAI API key before running Docker Compose.

~~~bash
# verify .env file exists and contains OPENAI_API_KEY
[ ! -f .env ] && echo "Error: .env file missing" && exit 1

# start services with docker compose
docker compose up -d

# services will be available at https://endurance.blackmore.ai
~~~


