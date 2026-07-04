import pandas as pd

from src.data_loader import load_loan_dataset
from src.preprocessing import build_full_preprocessor, get_column_groups


def main():
    print("Starting full preprocessor test...")

    X, y = load_loan_dataset()

    categorical_columns, numerical_columns = get_column_groups(X)

    print("\nColumn groups detected successfully.")

    print("\nNumerical columns:")
    print(numerical_columns)

    print("\nCategorical columns:")
    print(categorical_columns)

    full_preprocessor = build_full_preprocessor(X)

    X_processed = full_preprocessor.fit_transform(X)

    print("\nOriginal feature shape:")
    print(X.shape)

    print("\nProcessed feature shape:")
    print(X_processed.shape)

    print("\nTotal missing values after full preprocessing:")
    print(pd.isna(X_processed).sum())

    print("\nFirst processed row:")
    print(X_processed[0])

    print("\nTarget shape:")
    print(y.shape)

    print("\nFull preprocessor test completed successfully.")


if __name__ == "__main__":
    main()