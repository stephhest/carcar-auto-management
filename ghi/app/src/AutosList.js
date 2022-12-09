import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const AutosList = () => {
    const [autos, setAutos] = useState([]);
    const [status, setStatus] = useState();

    const Options = [
        { label: "Sold", value: 'sold' },
        { label: "Available", value: 'available' },
      ];

    useEffect(() => {
        const autosURL = 'http://localhost:8100/api/automobiles/';
        fetch(autosURL)
            .then(response => response.json())
            .then(data => {setAutos(data.autos);})
            .catch(e => console.error('Auto fetch error: ', e));
    }, [])

    const handleChangeStatus = (event) => {
        const value = event.target.value;
        setStatus(value);

        const filterAutoUrl = `http://localhost:8090/api/automobiles/${value}`

        fetch(filterAutoUrl)
            .then(response => response.json())
            .then(data => setAutos(data.autos))
            .catch(e => console.error('Filtered auto fetch error: ', e))
    }

    return (
        <>
            < br/>
            <form id="auto-inventory">
                <div className="mb-3">
                    <label>Filter View</label>
                    <select onChange={handleChangeStatus} value={status} name="status" id="status" className="form-select">
                    <option value="">All</option>
                    {Options.map(option => {
                        return (
                        <option key={option.value} value={option.value}> {option.label} </option>
                        )
                    })}
                    </select>
                </div>
            </form>
            <h1>Automobile Inventory</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => {
                        return (
                            <tr key={auto.vin}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model_name}</td>
                                <td>{auto.manufacturer_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Link to="/automobiles/new">
                <button className="btn btn-success">Add Automobile</button>
            </Link>
        </>
    );
};

export default AutosList;
