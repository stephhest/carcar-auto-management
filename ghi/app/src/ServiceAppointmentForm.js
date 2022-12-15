import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const ServiceAppointmentForm = () => {

  const [vinInput, setVinInput] = useState('');
  const [vinSelect, setVinSelect] = useState('');
  const [autoVOs, setAutoVOs] = useState([]);
  const [ownerName, setOwnerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [technician, setTechnician] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() =>  {
    const techUrl = 'http://localhost:8080/api/technicians/'
    fetch(techUrl)
      .then(response => response.json())
      .then(data => setTechnicians(data.technicians))
      .catch(e => console.error('Fetch techinicians error: ', e))
  }, [])

  useEffect(() => {
    const autoUrl = 'http://localhost:8080/api/automobiles/'
    fetch(autoUrl)
        .then(response => response.json())
        .then(data => setAutoVOs(data.autos))
        .catch(e => console.error('Fetch auto VOs error: ', e))
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    let vin = '';
    let vip = '';
    if (vinInput !== '') {
      vin = vinInput;
      vip = false;
    } else {
      vin = vinSelect;
      vip = true;
    }

    const newAppt = {
      'vin': vin,
      'owner_name': ownerName,
      'date': date,
      'time': time,
      'reason': reason,
      'vip': vip,
      'complete': false,
      'technician': technician
    }

    const apptUrl = 'http://localhost:8080/api/appointments/'
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(newAppt),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch(apptUrl, fetchConfig);
      const body = await response.json();
      if (!response.ok) {
          setMessage(body.message);
          setShowError(true);
      } else {
          setVinInput('');
          setVinSelect('');
          setOwnerName('');
          setDate('');
          setTime('');
          setReason('');
          setTechnician('');
          setMessage("Service appointment created successfully!");
          setShowSuccess(true);
      }
    } catch(e) {
        console.error('Fetch error: ', e)
    }
  }

  const handleVinInputChange = (event) => {
    const value = event.target.value;
    setVinInput(value);
  }

  const handleVinSelectChange = (event) => {
    const value = event.target.value;
    setVinSelect(value);
  }

  const handleOwnerNameChange = (event) => {
    const value = event.target.value;
    setOwnerName(value);
  }

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  }

  const handleTimeChange = (event) => {
    const value = event.target.value;
    setTime(value);
  }

  const handleReasonChange = (event) => {
    const value = event.target.value;
    setReason(value);
  }

  const handleTechnicianChange = (event) => {
    const value = event.target.value;
    setTechnician(value);
  }

  return (
    <div className="my-5 container">
      <div className="offset-3 col-6">
        <Alert show={showSuccess} variant='success' onClose={() => {setShowSuccess(false); setMessage('')}} dismissible>
            {message}
            <br/>
            <Alert.Link href="/appointments">Return to list</Alert.Link> or add another.
        </Alert>
        <Alert show={showError} variant='danger' onClose={() => {setShowError(false); setMessage('')}} dismissible>
            {message}
        </Alert>
        <div className="shadow p-4 mt-4">
          <h1>Create a New Service Appointment</h1>
          <br/>
          <form onSubmit={handleSubmit} id="create-service-appointment-form" >
          <div className="form-floating mb-3">
            <input value={vinInput} onChange={handleVinInputChange} placeholder=""  type="text" name="vinInput" id="vinInput" className="form-control" /> <label htmlFor="vin">Enter VIN #</label>
          </div>
          <div>OR, if applicable:</div>
          <div className="mb-3">
            <select onChange={handleVinSelectChange} value={vinSelect}  name="vinSelect" id="vinSelect" className="form-select">
              <option value="">--Select Automobile from Inventory--</option>
              {autoVOs.map(autoVO => {
                return (
                  <option key={autoVO.vin} value={autoVO.vin}>{autoVO.vin} - {autoVO.year} {autoVO.manufacturer_name} {autoVO.model_name}</option>
                )
              })}
            </select>
          </div> <br/>
          <div className="form-floating mb-3">
            <input value={ownerName} onChange={handleOwnerNameChange} placeholder="" required type="text" name="ownerName" id="ownerName" className="form-control" />
            <label htmlFor="ownerName">Enter Owner Name</label>
          </div>
          <div className="mb-3">
            <select value={technician} onChange={handleTechnicianChange} required name="technician" id="technician" className="form-select">
            <option value="">--Select Technician--</option>
            {technicians.map(technician => {
              return (
              <option key={technician.id} value={technician.id}>
                {technician.name}
              </option>
              );
            })}
            </select>
          </div>
          <div className="form-floating mb-3">
            <input value={date} onChange={handleDateChange} placeholder="date" required type="date" name="date" id="date" className="form-control" />
            <label htmlFor="date">Choose Date</label>
          </div>
          <div className="form-floating mb-3">
            <input value={time} onChange={handleTimeChange} placeholder="time" required type="time" name="time" id="time" className="form-control" />
            <label htmlFor="time">Choose Time</label>
          </div>
          <div className="form-floating mb-3">
            <textarea value={reason} onChange={handleReasonChange} placeholder="" name="reason" required id="reason" className="form-control" rows="3"/>
            <label htmlFor="reason" className="form-label">Description / Reason for Appointment</label>
          </div>
          <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )

}

export default ServiceAppointmentForm;
