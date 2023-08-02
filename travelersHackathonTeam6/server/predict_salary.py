import pickle
import math
import pandas as pd
import sklearn
import sys
from sklearn.preprocessing import OneHotEncoder

# # Load the trained model from the pickle file
with open('DirectoryWithEncoder.pkl', 'rb') as file:
    model, encoder = pickle.load(file)

# # Define the list of unique states and job roles
# # states = df['WorkLocation'].unique().tolist()
# # roles = df['JobRole'].unique().tolist()

# # Get the job role and work location from command-line arguments
role = sys.argv[1]
state = sys.argv[2]

# # # Validate the job role and work location
# # if role not in roles:
# #     print('Invalid job role. Please provide a valid job role.')
# #     sys.exit(1)

# # if state not in states:
# #     print('Invalid work location. Please provide a valid work location.')
# #     sys.exit(1)

# # # Create a dataframe with the user input
user_input = [{'JobRole': role, 'WorkLocation': state}]
new_search = pd.DataFrame(user_input)

# # # Encode the user input using the same encoder used during training
encode_search = pd.DataFrame(encoder.transform(new_search), columns=encoder.get_feature_names_out(['JobRole', 'WorkLocation']))

# # # Make the prediction using the trained model
prediction = model.predict(encode_search)

# # # Print the predicted salary
print(math.floor(prediction[0]))
