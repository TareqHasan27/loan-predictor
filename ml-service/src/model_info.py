import json
from pathlib import Path


METRICS_PATH = Path(__file__).resolve().parents[1] / "model" / "model_metrics.json"


def load_model_info():
    if not METRICS_PATH.exists():
        raise FileNotFoundError(
            f"Model metrics file not found at {METRICS_PATH}. "
            "Run scripts.train_best_model first."
        )

    with open(METRICS_PATH, "r", encoding="utf-8") as file:
        return json.load(file)