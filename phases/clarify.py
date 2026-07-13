def clarify_requirements(llm, idea: str) -> str:
    prompt = f"""
You are a game designer.
Ask 3–5 clarification questions before implementing the game.

Game idea:
{idea}
"""
    return llm.generate(prompt)
