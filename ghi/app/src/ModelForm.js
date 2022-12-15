import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const ModelForm = () => {

    const [name, setName] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [manufacturer_id, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const manufacturerURL = 'http://localhost:8100/api/manufacturers/';
        fetch(manufacturerURL)
            .then(response => response.json())
            .then(data => setManufacturers(data.manufacturers))
            .catch(e => console.error('Fetch manufacturers error: ', e))
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newModel = {
            'name': name,
            'picture_url': picture_url,
            'manufacturer_id': manufacturer_id
        }
        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newModel),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const response = await fetch(modelUrl, fetchConfig);
            const body = await response.json();
            if (!response.ok) {
                setMessage(body.message);
                setShowError(true);
            } else {
                setName('');
                setPictureUrl('');
                setManufacturer('');
                setMessage("Vehicle model created successfully!");
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

    const handleChangePictureUrl = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleChangeManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <Alert show={showSuccess} variant='success' onClose={() => {setShowSuccess(false); setMessage('')}} dismissible>
                        {message}
                        <br/>
                        <Alert.Link href="/models">Return to list</Alert.Link> or add another.
                    </Alert>
                    <Alert show={showError} variant='danger' onClose={() => {setShowError(false); setMessage('')}} dismissible>
                        {message}
                    </Alert>
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleChangeName} required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={picture_url} onChange={handleChangePictureUrl} required type="url" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChangeManufacturer} value={manufacturer_id} required name="manufacturer" id="manufacturer" className="form-select">
                                <option value="">Choose a manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModelForm;
