import os

def test_game_files_creation():
    from phases.generate import generate_game_files

    class MockLLM:
        def generate(self, prompt):
            return """
--- index.html ---
<html></html>
--- style.css ---
body{}
--- game.js ---
console.log("game");
"""

    llm = MockLLM()
    generate_game_files(llm, "test plan")

    assert os.path.exists("output/index.html")
    assert os.path.exists("output/style.css")
    assert os.path.exists("output/game.js")
