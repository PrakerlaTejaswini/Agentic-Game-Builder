from llm import GeminiLLM
from phases.clarify import clarify_requirements
from phases.plan import create_plan
from phases.generate import generate_game_files
from evaluation.metrics import evaluate_output

def run_agent():
    llm = GeminiLLM()
    game_id = 1

    while True:
        idea = input("\nEnter a game idea (or type 'exit'): ")
        if idea.lower() == "exit":
            break

        print("\n--- Phase 1: Clarification ---")
        questions = clarify_requirements(llm, idea)
        print(questions)

        clarified = input("\nAnswer the questions:\n")

        print("\n--- Phase 2: Planning ---")
        plan = create_plan(llm, clarified)
        print(plan)

        print("\n--- Phase 3: Execution ---")
        output_dir = generate_game_files(llm, plan, game_id)

        print("\n--- Evaluation ---")
        evaluate_output(output_dir)

        print(f"\n🎮 Game {game_id} saved in {output_dir}")
        game_id += 1

    print("\n👋 Agent stopped")

if __name__ == "__main__":
    run_agent()
