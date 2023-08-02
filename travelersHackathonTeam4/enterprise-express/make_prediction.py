import pickle as pkl
import pandas as pd
import numpy as np
import copy
pickled_model = pkl.load(open('model.pkl', 'rb'))

def make_prediction(data_dict):
    global pickled_model
    try:
        #print(pickled_model.feature_names_in_)
        base_dictionary = {}
        for feature_name in pickled_model.feature_names_in_:
            base_dictionary[feature_name] = [0]

        dummy_df = pd.DataFrame.from_dict(
            base_dictionary
        )

        dummy_df['role_'+data_dict['role']][0] = 1
        dummy_df['location_'+data_dict['location']][0] = 1 

        #print(dummy_df)
        model_prediction = pickled_model.predict(dummy_df.tail(1))
        return {'salary': np.array2string(model_prediction[0][0])}
    except Exception as ex:
        print(ex)
        return {'salary': np.nan}
if(__name__=="__main__"):
    print(make_prediction({"role": "CEO", "location": "Hartford"}))
    locations = {"Hartford": 0, "New Haven": 0, "Storrs": 0, "New London": 0}
    roles = {  
    "CEO": copy.copy(locations),
    "COO": copy.copy(locations),
    "CFO": copy.copy(locations),
    "CTO": copy.copy(locations),
    "Security": copy.copy(locations),
    "Legal": copy.copy(locations),
    "Accounting": copy.copy(locations),
    "HR": copy.copy(locations),
    "Laser Technician": copy.copy(locations),
    "Laser Engineer": copy.copy(locations),
    "Data Engineer": copy.copy(locations),
    "IT": copy.copy(locations)
    }

    for role in roles.keys():
        for location in locations.keys():
            print(role, location)
            try:
                roles[role][location] = float(make_prediction({"role": role, "location": location})['salary'])
            except:
                roles[role][location] = None
    output = pd.DataFrame.from_dict(roles)
    print(output.axes)
    output.fillna(method = 'ffill', inplace = True, axis = 1)
    print(output)
    output.to_csv("predictions.csv")