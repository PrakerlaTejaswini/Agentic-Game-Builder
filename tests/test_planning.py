def test_plan_generation():
    from phases.plan import create_plan

    class MockLLM:
        def generate(self, prompt):
            return "- Game genre: Arcade\n- Controls: Keyboard"

    llm = MockLLM()
    plan = create_plan(llm, "Single player, keyboard")

    assert "Game genre" in plan
