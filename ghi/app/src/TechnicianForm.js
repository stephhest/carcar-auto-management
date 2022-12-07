import React, { useState, useEffect } from 'react';

const TechnicianForm = () => {
  // Use the useState hook to create local state variables
  // for the technician name, employee number, and any errors that occur
  const [name, setName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [errors, setErrors] = useState({});

  // Define a function to handle the form submission
  const handleSubmit = async event => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create the data object that will be sent to the API
    const newTechnician = { name, employeeNumber };

    try {
      // Send a POST request to the API to create the technician
      const response = await fetch('http://localhost:8080/api/technicians/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTechnician)
      });

      // If the response is not successful, throw an error
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      // Update the errors object with the error message
      setErrors({ ...errors, api: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* If there are any errors, display them */}
      {errors.api && <p>{errors.api}</p>}

      <label htmlFor="name">Technician Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label htmlFor="employeeNumber">Employee Number:</label>
      <input
        type="text"
        id="employeeNumber"
        value={employeeNumber}
        onChange={e => setEmployeeNumber(e.target.value)}
      />

      <button type="submit">Create Technician</button>
    </form>
  );
};
