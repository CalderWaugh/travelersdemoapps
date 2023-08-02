# Searchable Enterprise Directory

Contributors: Ava Downey, Jacob Lettick, Noah Ramdial

### How to Run:
1. Clone repo into local directory and navigate to root of repo
1. To run website paste `cd frontend/search-enterprise && npm i && npm start` into the command prompt
1. Alternatively, to run just predictive models navigate to `Back/data_science` and run any of the jupyter notebook files
    - **generate_data** randomly generates a dataset of 1000 rows of data a company would have on their employees
    - **predict_salary_train.ipynb** trains a linear regression model to predict salary based on job location and job role from the randomly generated data
    - **predict_salary.ipynb** uses the model trained in **predict_salary_train.ipynb** to predict a new salary based on job location and job role

### Future Contributions
1. Add test cases to test functionality of site
1. Add further security to application
1. Implement generated graphs from predictive model into react app