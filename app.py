from flask import Flask, render_template, request
from agent import run_agent

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    idea = request.form["idea"]
    clarification = request.form.get("clarification", "")

    result = run_agent(idea, clarification)

    return render_template(
        "index.html",
        questions=result["questions"],
        plan=result["plan"],
        output=result["output_dir"]
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)