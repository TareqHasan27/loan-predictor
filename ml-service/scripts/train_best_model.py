import json
from pathlib import Path

import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from xgboost import XGBClassifier

from src.data_loader import load_loan_dataset
from src.preprocessing import build_full_preprocessor


MODEL_DIR = Path("model")
MODEL_PATH = MODEL_DIR / "loan_approval_model.joblib"
METRICS_PATH = MODEL_DIR / "model_metrics.json"


def evaluate_model(model_name, model_pipeline, X_train, X_test, y_train, y_test):
    print(f"\nTraining {model_name}...")

    model_pipeline.fit(X_train, y_train)

    y_pred = model_pipeline.predict(X_test)
    y_pred_proba = model_pipeline.predict_proba(X_test)[:, 1]

    metrics = {
        "model": model_name,
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_pred_proba),
    }

    return metrics, model_pipeline


def print_results(results):
    print("\nModel comparison results:")
    print("-" * 78)
    print(
        f"{'Model':<25}"
        f"{'Accuracy':<12}"
        f"{'Precision':<12}"
        f"{'Recall':<12}"
        f"{'F1':<10}"
        f"{'ROC-AUC':<10}"
    )
    print("-" * 78)

    for result in results:
        print(
            f"{result['model']:<25}"
            f"{result['accuracy']:<12.4f}"
            f"{result['precision']:<12.4f}"
            f"{result['recall']:<12.4f}"
            f"{result['f1']:<10.4f}"
            f"{result['roc_auc']:<10.4f}"
        )

    print("-" * 78)


def save_best_model(best_model_pipeline, best_metrics, all_results):
    MODEL_DIR.mkdir(exist_ok=True)

    joblib.dump(best_model_pipeline, MODEL_PATH)

    metrics_payload = {
        "selection_metric": "roc_auc",
        "best_model": best_metrics,
        "all_models": all_results,
    }

    with open(METRICS_PATH, "w", encoding="utf-8") as file:
        json.dump(metrics_payload, file, indent=4)

    print(f"\nBest model saved to: {MODEL_PATH}")
    print(f"Model metrics saved to: {METRICS_PATH}")


def main():
    X, y = load_loan_dataset()

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    models = [
        (
            "Logistic Regression",
            LogisticRegression(max_iter=1000, random_state=42),
        ),
        (
            "Random Forest",
            RandomForestClassifier(
                n_estimators=200,
                random_state=42,
                class_weight="balanced",
            ),
        ),
        (
            "XGBoost",
            XGBClassifier(
                n_estimators=200,
                learning_rate=0.05,
                max_depth=3,
                subsample=0.8,
                colsample_bytree=0.8,
                eval_metric="logloss",
                random_state=42,
            ),
        ),
    ]

    results = []
    trained_models = {}

    for model_name, model in models:
        model_pipeline = Pipeline(
            steps=[
                ("preprocessor", build_full_preprocessor(X_train)),
                ("model", model),
            ]
        )

        metrics, trained_pipeline = evaluate_model(
            model_name,
            model_pipeline,
            X_train,
            X_test,
            y_train,
            y_test,
        )

        results.append(metrics)
        trained_models[model_name] = trained_pipeline

    print_results(results)

    best_metrics = max(results, key=lambda item: item["roc_auc"])
    best_model_name = best_metrics["model"]
    best_model_pipeline = trained_models[best_model_name]

    print(f"\nBest model selected: {best_model_name}")
    print(f"Best ROC-AUC: {best_metrics['roc_auc']:.4f}")

    save_best_model(best_model_pipeline, best_metrics, results)


if __name__ == "__main__":
    main()