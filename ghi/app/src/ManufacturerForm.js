import React, { useState } from 'react';

const ManufacturerForm = () => {

    const [name, setName] = useState('');

    const handleSubmit = (event) => {
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
        fetch(manufacturerUrl, fetchConfig)
            .then((response) => {
                if (!response.ok) {
                    alert('Submission Error: Manufacturer name must be unique');
                }
            })
            .then(() => {
                setName('');
            })
            .catch(e => console.error('Manufacturer fetch error: ', e))
    }

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a manufacturer</h1>
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
