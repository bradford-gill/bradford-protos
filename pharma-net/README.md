# Pharma-net 
Prototype to provide insights into high end pharmaceutical 

## Deployment 
### Docker 
~~~bash
docker build -t proto .
# if .env file !exist -> nano .env
docker run -d --env-file .env -p 8080:8080 proto

~~~
### Conda on local 
~~~bash 
# Create env & install deps 
conda create --name protos python=3.11

conda deactivate; conda activate protos

pip install -r requirements.txt

# export env vars
source .env 

# run streamlit
streamlit run app.py
~~~



