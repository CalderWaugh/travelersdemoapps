import EmployeeList from "../EmployeeList";
import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { EMPLOYEES_URL, ROLE_URL, LOCATION_URL } from "../../api/urls";
import SearchBar from "../SearchBar";
import FilterBox from "../FilterBox";
import '../style/Home.css'
import NavBar from "../NavBar";
import PredictSalaryModal from "../PredictSalaryModal";


function Home() {
    const [employees, setEmployees] = useState();
    const [filters, setFilters] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSearch, setSelectedSearch] = useState("Name");
    const [selectedFilters, setSelectedFilters] = useState({});
    const [loggedInUser, setLoggedInUser] = useState();
    const [predictModal, setPredictModal] = useState(false);

    const searchParams = ["Name","Employee Number"];

    async function fetchEmployees(body={}) {
        let result = await fetch(EMPLOYEES_URL, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        return result.json();
    }

    async function onSearch() {
        let searchQry = searchQuery.trim()
        let body = {}

        if (searchQry !== "") {
            if (selectedSearch === "Name") {
                body["Name"] = searchQry;
            }
            else if (selectedSearch === "Employee Number") {
                body["EmployeeNumber"] = parseInt(searchQry);
            }
        }

        let filteredEmployees = await fetchEmployees(body);

        const allFilteredValues = {};
        for (const filterCategory in selectedFilters) {
            let filterValues = selectedFilters[filterCategory];
            let trueValues = Object.keys(filterValues).filter(
                (value) => filterValues[value]
            );

            if (trueValues.length > 0) {
                allFilteredValues[filterCategory] = trueValues;
            }
        }

        if (Object.keys(allFilteredValues).length > 0) {
            for (const filterCategory in allFilteredValues) {
                filteredEmployees = filteredEmployees.filter((emp) => {
                    let value = emp[filterCategory]
                    let res = allFilteredValues[filterCategory].includes(value)
                    return res
                });
            }

        }

        setEmployees(filteredEmployees);
    }

    async function getFilters() {
        let jobRolesRes = await fetch(ROLE_URL);
        let locationsRes = await fetch(LOCATION_URL);

        let jobRoles = await jobRolesRes.json();
        let locations = await locationsRes.json();

        let filters = {
            "JobRole": jobRoles,
            "WorkLocation": locations
        }
        setFilters(filters)
    }

    function handleSearchQuery(value) {
    setSearchQuery(value);
    }
    
    function handleSelectedSearch(value) {
    setSelectedSearch(value);
    }

    function handleSelectedFilters(filters) {
    setSelectedFilters(filters)
    }

    function handleUserUpdate(userData) {
        setLoggedInUser(userData)
    }

    function canViewSalary(employee) {
        if (loggedInUser) {
            const isSelf = (employee.EmployeeNumber === loggedInUser.EmployeeNumber);
            const isManager = (employee.EmployeeManager === loggedInUser.EmployeeNumber)
            const isHR = (loggedInUser.JobRole === "HR" || loggedInUser.JobRole === "Human Resources")
            return isSelf || isManager || isHR;
        }
        return false;
    }

    const togglePredictModal = () => {
        setPredictModal(!predictModal)
    }

    if (predictModal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    useEffect(() => {
        async function getInitialData() {
            getFilters();
            let fetchedEmployees = await fetchEmployees();
            setEmployees(fetchedEmployees);
        }
        getInitialData()
    }, []);

    return(
        <>
        <NavBar loggedInUser={loggedInUser} updateUser={handleUserUpdate} handleClickPredict={togglePredictModal} />
        {predictModal && 
        <PredictSalaryModal 
            modal={predictModal}
            toggleModal={togglePredictModal}
            jobRoles={filters["JobRole"]}
            workLocations={filters["WorkLocation"]}
            />
        }
        <div className='home'>
        <SearchBar 
            searchQuery={searchQuery}
            handleSearchQuery={handleSearchQuery}
            selectedSearch={selectedSearch}
            handleSelectedSearch={handleSelectedSearch}
            searchParams={searchParams} 
            onSearch={onSearch} 
        />
        <FilterBox
            filters={filters}
            onSearch={onSearch}
            selectedFilters={selectedFilters}
            handleSelectedFilters={handleSelectedFilters} />
        <EmployeeList employees={employees} canViewSalary={canViewSalary} />
        </div>
        </>
    )
}

export default Home;