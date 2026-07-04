from src.data_loader import load_loan_dataset


def main():
    X, y = load_loan_dataset()

    print("Dataset loader works.")
    print(f"Feature shape: {X.shape}")
    print(f"Target shape: {y.shape}")

    print("\nFirst 5 target values after mapping:")
    print(y.head())

    print("\nTarget class distribution after mapping:")
    print(y.value_counts())

    print("\nFeature columns:")
    print(X.columns.tolist())


if __name__ == "__main__":
    main()