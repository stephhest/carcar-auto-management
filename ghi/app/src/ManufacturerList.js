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
        .catch(e => console.log('Manufacturer fetch error: ', e));
    }, [])

    return (
        <>
            < br/>
            <h1>Manufacturer List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {

                        return (
                            <tr key={manufacturer.href}>
                                <td>{manufacturer.name}</td>
                                {/* <td>
                                    <button onClick={() => onDeleteAutoClick(auto)}>X</button>
                                    <span>{auto.style}</span>
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Link to="/manufactures/new">
                <button className="btn btn-success">Add Manufacturer</button>
            </Link>
        </>
    );
};

export default ManufacturerList;
