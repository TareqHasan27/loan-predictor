from pathlib import Path

import pandas as pd


DATASET_PATH = Path("data/raw/loan_prediction.csv")


def main():
    if not DATASET_PATH.exists():
        print("Dataset not found.")
        print(f"Expected file path: {DATASET_PATH}")
        print("Download your loan prediction CSV and rename it to loan_prediction.csv")
        print("Then place it inside: ml-service/data/raw/")
        return

    df = pd.read_csv(DATASET_PATH)

    print("\nDataset loaded successfully.")
    print(f"Shape: {df.shape[0]} rows, {df.shape[1]} columns")

    print("\nColumn names:")
    print(df.columns.tolist())

    print("\nFirst 5 rows:")
    print(df.head())

    print("\nMissing values per column:")
    print(df.isnull().sum())

    if "Loan_Status" in df.columns:
        print("\nTarget class distribution:")
        print(df["Loan_Status"].value_counts())
        print("\nTarget class distribution percentage:")
        print(df["Loan_Status"].value_counts(normalize=True) * 100)
    else:
        print("\nWarning: Target column 'Loan_Status' was not found.")


if __name__ == "__main__":
    main()