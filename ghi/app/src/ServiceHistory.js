import React, { useEffect, useState } from 'react';
import './index.css';

const ServiceHistory = () => {

    const [vin, setVin] = useState('');
    const [apptVins, setApptVins] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const apptsUrl = 'http://localhost:8080/api/appointments/'
        fetch(apptsUrl)
            .then(response => response.json())
            .then(data => setApptVins(data.appointments))
            .catch(e => console.error('Appointment fetch error: ', e))
    }, [])

    const vinOptions = new Map([
        ...apptVins.map(appointment => [appointment.vin])
    ]);

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);

        const filterApptUrl = `http://localhost:8080/api/appointments/automobiles/${value}`

        fetch(filterApptUrl)
            .then(response => response.json())
            .then(data => setAppointments(data.appointments))
            .catch(e => console.error('Filtered appointments fetch error: ', e))
    }

    return (
        <>
        < br/>
        <div id="heading">
            <form id="service-history">
                <div className="mb-3">
                    <select className="form_select" onChange={handleVinChange} value={vin} name="vin" id="vin">
                    <option value=''>--Select Automobile VIN--</option>
                    {[...vinOptions].map(([vin]) => (
                    <option key={vin} value={vin}>{vin}</option>
                    ))}
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
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.owner_name}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.technician.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    )

}

export default ServiceHistory;
