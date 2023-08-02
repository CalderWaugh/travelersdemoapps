import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Load the data from the CSV file
data = pd.read_csv('tasks.csv')

# Prepare the input features (X) and target variable (y)
X = data.drop('completionTime', axis=1)  # Assuming 'completion_time' is the target variable
y = data['completionTime']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model's performance
mse = mean_squared_error(y_test, y_pred)
print('Mean Squared Error:', mse)

# Example usage: Predict completion time for new project attributes
new_project_attributes = pd.DataFrame({'attribute1': [data.estimatedDuration], 'attribute2': [data.Workload]})
predicted_completion_time = model.predict(new_project_attributes)
print('Predicted Completion Time:', predicted_completion_time)
