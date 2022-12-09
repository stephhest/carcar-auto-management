import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './index.css';

const ManufacturerList = () => {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        const manufacturersURL = 'http://localhost:8100/api/manufacturers/';
        fetch(manufacturersURL)
        .then(response => response.json())
        .then(data => {setManufacturers(data.manufacturers);})
        .catch(e => console.error('Manufacturer fetch error: ', e));
    }, [])

    return (
        <>
            < br/>
            <div id="heading">
                <h1>Manufacturer List</h1>
                <Link to="/manufacturers/new">
                    <button id="addbutton" className="btn btn-success">Add Manufacturer</button>
                </Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {

                        return (
                            <tr key={manufacturer.href}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </>
    );
};

export default ManufacturerList;
