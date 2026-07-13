def create_plan(llm, clarified_input: str) -> str:
    prompt = f"""
Create a structured game plan with:
- Game mechanics
- Controls
- Game loop
- Assets
- Framework (Vanilla JS or Phaser)
- File structure

Clarified requirements:
{clarified_input}
"""
    return llm.generate(prompt)
