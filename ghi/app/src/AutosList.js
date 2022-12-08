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

    // const onDeleteAutoClick = (auto) => {
    //     const autoHref = auto.href;
    //     const hrefComponents = auto.href.split('/');
    //     const autoId = hrefComponents[hrefComponents.length - 2];
    //     const detailUrl = `http://localhost:8100/api/automobiles/${autoId}/`;
    //     const fetchConfig = {
    //         method: "delete",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     fetch(detailUrl, fetchConfig)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.deleted) {
    //                 const currentAutos = [...autos];
    //                 setAutos(currentAutos.filter(auto => auto.href !== autoHref));
    //             }
    //         })
    //         .catch(e => console.log('Fetch auto detail error: ', e));
    // }

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
                        {/* <th>Actions</th> */}
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
                                {/* <td>
                                    <button onClick={() => onDeleteAutoClick(auto)}>X</button>
                                    <span>{auto.style}</span>
                                </td> */}
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
