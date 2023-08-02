import numpy as np
import pandas as pd

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Read in the file 
df = pd.read_csv('tasks.csv')
df.head()
print(df)

# Choosing the features and the target
features = ['teamSize', 'Budget']
X = df[features]  # Features => teamSize, Budget.
y = df['completionTime']     # Target => completionTime
y2 = df['estimatedDuration']

y2_encod = pd.get_dummies(y2)

print(y2_encod)

# random_state => seed value used by random number generator
X_train, X_test, y2_encod_train, y2_encod_test = train_test_split(X, y2_encod, test_size=0.3, random_state=0)

#Implement the classifer
model = LinearRegression()
model.fit(X_train, y2_encod_train)

#come out with the prediction
predictions = model.predict(X_test)
print(predictions)
