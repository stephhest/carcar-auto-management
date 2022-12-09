import React, { useEffect, useState } from 'react';

const SalesHistoryList = () => {

    const [sales_person, setSalesPerson] = useState('');
    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);


    useEffect(() => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        fetch(salespeopleUrl)
            .then(response => response.json())
            .then(data => setSalespeople(data.salespeople))
            .catch(e => console.error('Fetch salespeople error: ', e))
    }, [])

    const handleChangeSalesPerson = (event) => {
        const value = event.target.value;
        setSalesPerson(value);

        const filterSalesUrl = `http://localhost:8090/api/salespeople/${value}/sales`

        fetch(filterSalesUrl)
            .then(response => response.json())
            .then(data => setSales(data.sales))
            .catch(e => console.log('Filtered sales fetch error: ', e))
    }

    return (
        <>
        < br/>
        <h1>Sales Person History</h1>
        <form id="sales-person-history">
            <div className="mb-3">
                <select onChange={handleChangeSalesPerson} value={sales_person} required name="sales_person" id="sales_person" className="form-select">
                <option value="">Select a Sales Person</option>
                {salespeople.map(sales_person => {
                    return (
                    <option key={sales_person.employee_number} value={sales_person.employee_number}> #{sales_person.employee_number} - {sales_person.name} </option>
                    )
                })}
                </select>
            </div>
        </form>
        < br/>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Employee Number</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Sale Price</th>
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

export default SalesHistoryList;
