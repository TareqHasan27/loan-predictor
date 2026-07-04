from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer


def get_column_groups(X):
    categorical_columns = X.select_dtypes(include=["object"]).columns.tolist()
    numerical_columns = X.select_dtypes(include=["int64", "float64"]).columns.tolist()

    return categorical_columns, numerical_columns


def build_missing_value_preprocessor(X):
    categorical_columns, numerical_columns = get_column_groups(X)

    missing_value_preprocessor = ColumnTransformer(
        transformers=[
            (
                "numerical_imputer",
                SimpleImputer(strategy="median"),
                numerical_columns,
            ),
            (
                "categorical_imputer",
                SimpleImputer(strategy="most_frequent"),
                categorical_columns,
            ),
        ]
    )

    return missing_value_preprocessor