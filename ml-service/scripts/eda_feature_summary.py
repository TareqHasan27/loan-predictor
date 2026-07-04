from pathlib import Path

import pandas as pd


DATASET_PATH = Path("data/raw/loan_prediction.csv")
TARGET_COLUMN = "Loan_Status"
ID_COLUMN = "Loan_ID"


def main():
    if not DATASET_PATH.exists():
        print("Dataset not found.")
        print(f"Expected path: {DATASET_PATH}")
        return

    df = pd.read_csv(DATASET_PATH)

    print("\nDataset loaded successfully.")
    print(f"Original shape: {df.shape[0]} rows, {df.shape[1]} columns")

    if TARGET_COLUMN not in df.columns:
        print(f"\nError: Target column '{TARGET_COLUMN}' was not found.")
        print("Available columns:")
        print(df.columns.tolist())
        return

    if ID_COLUMN in df.columns:
        df = df.drop(columns=[ID_COLUMN])
        print(f"\nDropped ID column: {ID_COLUMN}")

    X = df.drop(columns=[TARGET_COLUMN])
    y = df[TARGET_COLUMN]

    categorical_columns = X.select_dtypes(include=["object"]).columns.tolist()
    numerical_columns = X.select_dtypes(include=["int64", "float64"]).columns.tolist()

    print("\nTarget column:")
    print(TARGET_COLUMN)

    print("\nFeature columns:")
    print(X.columns.tolist())

    print("\nCategorical columns:")
    print(categorical_columns)

    print("\nNumerical columns:")
    print(numerical_columns)

    print("\nTarget value counts:")
    print(y.value_counts())

    print("\nTarget percentage:")
    print((y.value_counts(normalize=True) * 100).round(2))

    print("\nMissing values in categorical columns:")
    print(X[categorical_columns].isnull().sum())

    print("\nMissing values in numerical columns:")
    print(X[numerical_columns].isnull().sum())


if __name__ == "__main__":
    main()