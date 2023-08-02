const DEFAULT_LOCAL = "http://localhost:3100";

const BASE_SERVER_URL = DEFAULT_LOCAL;

export const EMPLOYEES_URL = `${BASE_SERVER_URL}/employees`

export const EMPLOYEES_USERNAME_URL = `${EMPLOYEES_URL}/username`

export const ROLE_URL = `${BASE_SERVER_URL}/job-roles`

export const LOCATION_URL = `${BASE_SERVER_URL}/locations`

export const PREDICT_SALARY_URL = `${EMPLOYEES_URL}/predict-salary`