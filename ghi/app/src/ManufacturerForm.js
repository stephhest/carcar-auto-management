import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const ManufacturerForm = () => {

    const [name, setName] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newManufacturer = { "name": name };
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newManufacturer),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const response = await fetch(manufacturerUrl, fetchConfig);
            const body = await response.json();
            if (!response.ok) {
                setMessage(body.message);
                setShowError(true);
            } else {
                setName('');
                setMessage("Manufacturer created successfully!")
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

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <Alert show={showSuccess} variant='success' onClose={() => {setShowSuccess(false); setMessage('')}} dismissible>
                        {message}
                        <br/>
                        <Alert.Link href="/manufacturers">Return to list</Alert.Link> or add another.
                    </Alert>
                    <Alert show={showError} variant='danger' onClose={() => {setShowError(false); setMessage('')}} dismissible>
                        {message}
                    </Alert>
                    <h1>Create a Manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManufacturerForm;
