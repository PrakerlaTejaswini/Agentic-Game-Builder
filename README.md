🎮 Agentic Game-Builder AI
Overview

This project implements an Agentic AI system that designs and generates a small, playable HTML/CSS/JavaScript game from an ambiguous natural-language game idea.

The system is not prompt-engineering only. Instead, it demonstrates:

Explicit agent phases

Controlled decision-making

Clear separation of responsibilities

End-to-end automation inside Docker

The agent follows a structured workflow:
Clarify → Plan → Build → Evaluate

🎯 Objective

The AI agent is capable of:

Accepting a natural-language game idea

Asking clarifying questions before implementation

Producing a structured internal plan

Generating a playable browser game using:

index.html

style.css

game.js

Outputting runnable files that work locally in a browser

Running fully inside a Docker container

🧠 Agent Architecture

The agent is designed as a controller-orchestrator system with clear phases.

1️⃣ Clarification Phase

File: phases/clarify.py

Takes the raw game idea

Asks only necessary follow-up questions

Ensures requirements are sufficiently clear

Prevents premature code generation

2️⃣ Planning Phase

File: phases/plan.py

Converts clarified requirements into a structured plan

Defines:

Game mechanics

Controls

Game loop

Assets

File structure

Decides whether to use vanilla JavaScript or a framework

3️⃣ Execution Phase

File: phases/generate.py

Generates:

index.html

style.css

game.js

Ensures:

Game runs locally in a browser

Controls work

Game is playable without manual edits

4️⃣ Evaluation Phase

File: evaluation/metrics.py

Verifies:

Files are generated

Required files exist

Output structure is correct

📁 Project Structure
agentic-game-builder/
│
├── agent.py
├── llm.py
├── requirements.txt
├── Dockerfile
├── README.md
│
├── phases/
│   ├── clarify.py
│   ├── plan.py
│   └── generate.py
│
├── evaluation/
│   └── metrics.py
│
└── output/
    └── game_1/
        ├── index.html
        ├── style.css
        └── game.js

🚀 How to Run the Agent (Local)
1️⃣ Create Virtual Environment (Optional)
python -m venv agent
agent\Scripts\activate   # Windows

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Set Gemini API Key
export GEMINI_API_KEY=your_api_key_here


(On Windows PowerShell:)

setx GEMINI_API_KEY "your_api_key_here"

4️⃣ Run the Agent
python agent.py

🐳 Docker Build & Run Instructions
1️⃣ Build Docker Image
docker build -t agentic-game-builder .

2️⃣ Run the Container
docker run -it --rm -e GEMINI_API_KEY=your_api_key agentic-game-builder

3️⃣ Generated Output

The generated game files will appear in the output/ directory

Open index.html in a browser to play the game