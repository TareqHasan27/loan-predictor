from sklearn.model_selection import train_test_split

from src.data_loader import load_loan_dataset


def main():
    X, y = load_loan_dataset()

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    print("Train/test split completed successfully.")

    print("\nFull dataset shape:")
    print(f"X: {X.shape}")
    print(f"y: {y.shape}")

    print("\nTraining set shape:")
    print(f"X_train: {X_train.shape}")
    print(f"y_train: {y_train.shape}")

    print("\nTest set shape:")
    print(f"X_test: {X_test.shape}")
    print(f"y_test: {y_test.shape}")

    print("\nFull target distribution:")
    print(y.value_counts(normalize=True).round(3))

    print("\nTraining target distribution:")
    print(y_train.value_counts(normalize=True).round(3))

    print("\nTest target distribution:")
    print(y_test.value_counts(normalize=True).round(3))


if __name__ == "__main__":
    main()