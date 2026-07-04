from pathlib import Path

import pandas as pd


DATASET_PATH = Path("data/raw/loan_prediction.csv")
TARGET_COLUMN = "Loan_Status"
ID_COLUMN = "Loan_ID"


def load_loan_dataset():
    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found at {DATASET_PATH}. "
            "Place loan_prediction.csv inside ml-service/data/raw/"
        )

    df = pd.read_csv(DATASET_PATH)

    if TARGET_COLUMN not in df.columns:
        raise ValueError(
            f"Target column '{TARGET_COLUMN}' was not found. "
            f"Available columns: {df.columns.tolist()}"
        )

    if ID_COLUMN in df.columns:
        df = df.drop(columns=[ID_COLUMN])

    X = df.drop(columns=[TARGET_COLUMN])
    y = df[TARGET_COLUMN].map({"Y": 1, "N": 0})

    if y.isnull().any():
        raise ValueError(
            "Target column contains unexpected values. "
            "Expected only 'Y' and 'N'."
        )

    return X, y