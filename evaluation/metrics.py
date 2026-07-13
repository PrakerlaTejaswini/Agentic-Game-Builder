import os

def evaluate_output(output_dir: str):
    required_files = ["index.html", "style.css", "game.js"]
    missing = [
        f for f in required_files
        if not os.path.exists(os.path.join(output_dir, f))
    ]

    if missing:
        print("❌ Missing files:", missing)
    else:
        print("✅ Playable game generated successfully")
