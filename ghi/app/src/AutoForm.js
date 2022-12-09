import React, { useEffect, useState } from 'react';

const AutoForm = () => {

    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model_id, setModel] = useState('');
    const [models, setModels] = useState([]);

    useEffect(() => {
        const modelUrl = 'http://localhost:8100/api/models/';
        fetch(modelUrl)
            .then(response => response.json())
            .then(data => setModels(data.models))
            .catch(e => console.error("Fetch models error: ", e))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAuto = {
            'color': color,
            'year': year,
            'vin': vin,
            'model_id': model_id,
        }

        const carUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newAuto),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(carUrl, fetchConfig)
            .then((response) => {
              if (!response.ok) {
                  alert('Submission Error: VIN must be unique');
              } else {
                  alert('New automobile added!');
              }
            })
            .then(() => {
                setColor('');
                setYear('');
                setVin('');
                setModel('');
            })
            .catch(e => console.error('Error: ', e))
    }


    const handleChangeColor = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleChangeYear = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleChangeModel = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    return (
        <div className="my-5 container">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add an Automobile to Inventory</h1>
              <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                  <input onChange={handleChangeColor} value={color}  placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleChangeYear} value={year}  placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                  <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleChangeVin} value={vin}  placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleChangeModel} value={model_id} required name="model" id="model" className="form-select">
                    <option value="">Choose a model</option>
                    {models.map(model => {
                      return (
                        <option key={model.id} value={model.id}>{model.manufacturer.name} {model.name}</option>
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

export default AutoForm;
