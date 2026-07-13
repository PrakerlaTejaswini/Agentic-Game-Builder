def test_clarification_questions():
    from phases.clarify import clarify_requirements

    class MockLLM:
        def generate(self, prompt):
            return "1. What controls?\n2. Win condition?"

    llm = MockLLM()
    result = clarify_requirements(llm, "Make a game")

    assert "1." in result
    assert "?" in result
