import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment); // initialize moment localizer

const ServiceCalendar = () => {

    const [appointments, setAppointments] = useState([]);
    const [technician, setTechnician] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const apptsUrl = 'http://localhost:8080/api/appointments/'
        fetch(apptsUrl)
            .then(response => response.json())
            .then(data => setAppointments(data.appointments))
            .catch(e => console.error('Appointment fetch error: ', e))
    }, [])

    useEffect(() => {
        const techsUrl = 'http://localhost:8080/api/technicians/'
        fetch(techsUrl)
            .then(response => response.json())
            .then(data => setTechnicians(data.technicians))
            .catch(e => console.error('Technician fetch error: ', e))
    }, [])

    const handleChangeTechnician = (event) => {
        const value = event.target.value;
        setTechnician(value);

        const calEvents = appointments.map(appointment => {
            if (appointment.technician.name === value) {
                let startStr = `${appointment.date}T${appointment.time}`;
                let startDate = new Date(startStr);
                let endDate = new Date(startStr);
                endDate.setHours(startDate.getHours()+2)

                let calEvent = {
                    id: appointment.id,
                    title: appointment.reason,
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                    desc: appointment.technician.name,
                };
                return calEvent;
            }
        })

        setEvents(calEvents);
    }


    return (
        <>
        < br/>
        <div id="heading">
            <form id="sales-person-history">
                <div className="mb-3">
                    <select onChange={handleChangeTechnician} value={technician} name="technician" id="technician" className="form-select">
                    <option value="">Select a Technician</option>
                    {technicians.map(technician => {
                        return (
                        <option key={technician.id} value={technician.name}> {technician.name} </option>
                        )
                    })}
                    </select>
                </div>
            </form>
        </div>

        <div className='calendar-calEvent'>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                views={['month']}
                style={{height: 600}}
                events={events}
            />
        </div>
        </>

    );
}

export default ServiceCalendar;
