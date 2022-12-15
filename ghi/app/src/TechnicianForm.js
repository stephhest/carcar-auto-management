import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const TechnicianForm = () => {

    const [name, setName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTechnician = {
            "name": name,
            "employee_number": employeeNumber,
        };
        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newTechnician),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const response = await fetch(technicianUrl, fetchConfig);
            const body = await response.json();
            if (!response.ok) {
                setMessage(body.message);
                setShowError(true);
            } else {
                setName('');
                setEmployeeNumber('');
                setMessage("Technician created successfully!");
                setShowSuccess(true);
            }
        } catch(e) {
            console.error('Fetch error: ', e)
        }
    }

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleChangeEmployeeNumber = (event) => {
        const value = event.target.value;
        setEmployeeNumber(value);
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <Alert show={showSuccess} variant='success' onClose={() => {setShowSuccess(false); setMessage('')}} dismissible>
                        {message}
                        <br/>
                        {/* <Alert.Link href="/manufacturers">Back to list</Alert.Link> */}
                    </Alert>
                    <Alert show={showError} variant='danger' onClose={() => {setShowError(false); setMessage('')}} dismissible>
                        {message}
                    </Alert>
                    <h1>Create a Technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={name} placeholder="" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Enter Technician Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeEmployeeNumber} value={employeeNumber} placeholder="" required type="number" name="employee_number" id="employee_number" className="form-control" />
                            <label htmlFor="employeeNumber">Enter Employee Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TechnicianForm;
