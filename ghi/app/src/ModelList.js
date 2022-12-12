import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './index.css';

const ModelList = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const modelURL = 'http://localhost:8100/api/models/';
        fetch(modelURL)
            .then(response => response.json())
            .then(data => {setModels(data.models);})
            .catch(e => console.error('Models fetch error: ', e))
    }, [])

    return (
        <>
            < br/>
            <div id="heading">
                <h1>Vehicle Models</h1>
                <Link to="/models/new">
                    <button id="addbutton" className="btn btn-success">Add Vehicle Model</button>
                </Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr key={model.href}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td>
                                    <img className="img-thumbnail" alt="" src={model.picture_url} width="300" height="236"/>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ModelList;
