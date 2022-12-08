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
            .catch(e => console.log('Models fetch error: ', e))
    }, [])

    return (
        <>
            < br/>
            <h1>Vehicle Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr key={model.href}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td>
                                    <img className="img-thumbnail" src={model.picture_url} width="300" height="236"/>
                                </td>
                                {/* <td>
                                    <button onClick={() => onDeleteAutoClick(auto)}>X</button>
                                    <span>{auto.style}</span>
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Link to="/models/new">
                <button className="btn btn-success">Add A Vehicle Model</button>
            </Link>
        </>
    );
};

export default ModelList;
