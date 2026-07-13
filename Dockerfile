# # Use Python base image
# FROM python:3.11-slim

# # Set working directory inside container
# WORKDIR /app

# # Copy project files into container
# COPY . .

# # Install dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Run the agent
# CMD ["python", "agent.py"]


FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]