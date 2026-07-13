import os

def generate_game_files(llm, plan: str, game_id: int):
    output_dir = f"output/game_{game_id}"
    os.makedirs(output_dir, exist_ok=True)

    html = llm.generate(f"Generate ONLY index.html code:\n{plan}")
    css = llm.generate(f"Generate ONLY style.css code:\n{plan}")
    js = llm.generate(f"Generate ONLY game.js code:\n{plan}")

    with open(f"{output_dir}/index.html", "w", encoding="utf-8") as f:
        f.write(html)

    with open(f"{output_dir}/style.css", "w", encoding="utf-8") as f:
        f.write(css)

    with open(f"{output_dir}/game.js", "w", encoding="utf-8") as f:
        f.write(js)

    return output_dir
