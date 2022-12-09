import React, { useState } from 'react';

const CustomerForm = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newCustomer = {
            "name": name,
            "address": address,
            "phone": phone,
        };
        // console.log(newCustomer);
        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newCustomer),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(customerUrl, fetchConfig)
            .then(response => response.json)
            .then(() => {
                setName('');
                setAddress('');
                setPhone('');
            })
            .catch(e => console.log('Customer fetch error: ', e))
        //add some success alert here
    }

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleChangeAddress = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handleChangePhone = (event) => {
        const value = event.target.value;
        setPhone(value);
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Potential Customer</h1>
                    <form onSubmit={handleSubmit} id="create-customer-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} value={name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeAddress} value={address} placeholder="employee number" required type="text" name="address" id="address" className="form-control" />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangePhone} value={phone} placeholder="phone" required type="text" name="phone" id="phone" className="form-control" />
                            <label htmlFor="phone">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CustomerForm;
