import pandas as pd

from src.data_loader import load_loan_dataset
from src.preprocessing import build_missing_value_preprocessor, get_column_groups


def main():
    X, y = load_loan_dataset()

    categorical_columns, numerical_columns = get_column_groups(X)

    print("Column groups detected successfully.")

    print("\nNumerical columns:")
    print(numerical_columns)

    print("\nCategorical columns:")
    print(categorical_columns)

    print("\nMissing values before preprocessing:")
    print(X.isnull().sum())

    missing_value_preprocessor = build_missing_value_preprocessor(X)
    X_processed = missing_value_preprocessor.fit_transform(X)

    missing_values_after = pd.isna(X_processed).sum()

    print("\nProcessed feature shape:")
    print(X_processed.shape)

    print("\nTotal missing values after preprocessing:")
    print(missing_values_after)

    print("\nTarget shape:")
    print(y.shape)


if __name__ == "__main__":
    main()