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

from src.data_loader import load_loan_dataset
from src.preprocessing import build_full_preprocessor


def evaluate_model(model_name, model_pipeline, X_train, X_test, y_train, y_test):
    print(f"\nTraining {model_name}...")
    model_pipeline.fit(X_train, y_train)

    y_pred = model_pipeline.predict(X_test)
    y_pred_proba = model_pipeline.predict_proba(X_test)[:, 1]

    return {
        "model": model_name,
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_pred_proba),
    }


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
    ]

    results = []

    for model_name, model in models:
        model_pipeline = Pipeline(
            steps=[
                ("preprocessor", build_full_preprocessor(X_train)),
                ("model", model),
            ]
        )

        result = evaluate_model(
            model_name,
            model_pipeline,
            X_train,
            X_test,
            y_train,
            y_test,
        )

        results.append(result)

    print_results(results)


if __name__ == "__main__":
    main()