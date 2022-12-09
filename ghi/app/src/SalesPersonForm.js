import React, { useState } from 'react';

const SalesPersonForm = () => {

    const [name, setName] = useState('');
    const [employee_number, setEmployeeNumber] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newSalesperson = {
            "name": name,
            "employee_number": employee_number,
        };
        // console.log(newSalesperson);
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newSalesperson),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(salespeopleUrl, fetchConfig)
            .then(response => response.json)
            .then(() => {
                setName('');
                setEmployeeNumber('');
            })
            .catch(e => console.error('Salespeople fetch error: ', e))
        //add some success alert here
    }

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleChangeEmpNum = (event) => {
        const value = event.target.value;
        setEmployeeNumber(value);
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Sales Person</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeEmpNum} value={employee_number} placeholder="employee number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                            <label htmlFor="employee_number">Employee Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalesPersonForm;
