import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './index.css';


const SalesList = () => {
    const [sales, setSales] = useState([]);


    useEffect(() => {
        const salesUrl = 'http://localhost:8090/api/sales/';

        fetch(salesUrl)
            .then(response => response.json())
            .then(data => setSales(data.sales))
            .catch(e => console.error('Sales fetch error: ', e))
    }, [])


    return (
        <>
        < br/>
        <div id="heading">
            <h1>All Sales</h1>
            <Link to="/sales/new">
                    <button id="addbutton" className="btn btn-success">Create Sale Record</button>
            </Link>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Employee Number</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Sales Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                        <tr key={sale.href}>
                            <td>{sale.sales_person}</td>
                            <td>{sale.employee_number}</td>
                            <td>{sale.customer}</td>
                            <td>{sale.automobile}</td>
                            <td>${sale.sale_price}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    )
}

export default SalesList;
