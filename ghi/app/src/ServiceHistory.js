import React, { useEffect, useState } from 'react';
import './index.css';

const ServiceHistory = () => {

    const [vin, setVin] = useState('');
    const [apptVins, setApptVins] = useState([]);
    const [appointments, setAppointments] = useState([]);

    function removeDuplicates(arr) {
        return arr.filter((item, index) =>
            arr.indexOf(item === index));
    }

    useEffect(() => {
        const apptsUrl = 'http://localhost:8080/api/appointments/'
        fetch(apptsUrl)
            .then(response => response.json())
            .then(data => (data.appointments))
            .then(data => (removeDuplicates(data)))
            .then(data => setApptVins(data))
            .catch(e => console.error('Appointment fetch error: ', e))
    }, [])

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);

        const filterApptUrl = `http://localhost:8080/api/appointments/automobiles/${value}`

        fetch(filterApptUrl)
            .then(response => response.json())
            .then(data => setAppointments(data.appointments))
            .catch(e => console.error('Filterd appointments fetch error: ', e))
    }

    return (
        <>
        < br/>
        <div id="heading">
            <form id="sales-person-history">
                <div className="mb-3">
                    <select onChange={handleVinChange} value={vin} name="vin" id="vin" className="form-select">
                    <option value="">Select an Automobile</option>
                    {apptVins.map(apptVin => {
                        return (
                        <option key={apptVin.vin} value={apptVin.Vin}>{apptVin.vin}</option>
                        )
                    })}
                    </select>
                </div>
            </form>
        </div>
        <h1>Service History</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Owner Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Technician</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    return (
                        <tr key={appointment.href}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.owner_name}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.technician}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    )

}

export default ServiceHistory;
