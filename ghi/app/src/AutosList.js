import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './index.css';

const AutosList = () => {
    const [autos, setAutos] = useState([]);

    useEffect(() => {
        const autosURL = 'http://localhost:8100/api/automobiles/';
        fetch(autosURL)
            .then(response => response.json())
            .then(data => {setAutos(data.autos);})
            .catch(e => console.log('Auto fetch error: ', e));
    }, [])

    return (
        <>
            < br/>
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
                        // {console.log(auto)}
                        return (
                            <tr key={auto.href}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>
                                    <img className="auto-image" src={auto.picture_url} />
                                </td>
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
