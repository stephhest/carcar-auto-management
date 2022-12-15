import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const SaleRecordForm = () => {

  const [automobile, setAutomobile] = useState('');
  const [autoVOs, setAutoVOs] = useState([]);
  const [sales_person, setSalesPerson] = useState('');
  const [salespeople, setSalespeople] = useState([]);
  const [customer, setCustomer] = useState('');
  const [customers, setCustomers] = useState([]);
  const [sale_price, setSalePrice] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const autoUrl = 'http://localhost:8090/api/automobiles/available'
    fetch(autoUrl)
      .then(response => response.json())
      .then(data => setAutoVOs(data.autos))
      .catch(e => console.error('Fetch auto VOs error: ', e))
  }, [])

  useEffect(() => {
    const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
    fetch(salespeopleUrl)
      .then(response => response.json())
      .then(data => setSalespeople(data.salespeople))
      .catch(e => console.error('Fetch salespeople error: ', e))
  }, [])

  useEffect(() => {
    const customerUrl = 'http://localhost:8090/api/customers/'
    fetch(customerUrl)
      .then(response => response.json())
      .then(data => setCustomers(data.customers))
      .catch(e => console.error('Fetch customers error: ', e))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newSale = {
      'automobile': automobile,
      'sales_person': sales_person,
      'customer': customer,
      'sale_price': sale_price,
    }
    const saleUrl = 'http://localhost:8090/api/sales/'
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(newSale),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch(saleUrl, fetchConfig);
      const body = await response.json();
      if (!response.ok) {
        setMessage(body.message);
        setShowError(true);
      } else {
        setAutomobile('');
        setSalesPerson('');
        setCustomer('');
        setSalePrice('');
        setMessage("Sales record created successfully!");
        setShowSuccess(true);
      }
    } catch(e) {
        console.error('Fetch error: ', e)
    }
  }

    const handleChangeAuto = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleChangeSalesPerson = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }

    const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleChangeSalePrice = (event) => {
        const value = event.target.value;
        setSalePrice(value);
    }

    return (
      <div className="my-5 container">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <Alert show={showSuccess} variant='success' onClose={() => {setShowSuccess(false); setMessage('')}} dismissible>
                {message}
                <br/>
              <Alert.Link href="/sales">Return to sales list</Alert.Link> or add another.
            </Alert>
            <Alert show={showError} variant='danger' onClose={() => {setShowError(false); setMessage('')}} dismissible>
                {message}
            </Alert>
            <h1>Record a new sale</h1>
            <br/>
            <form onSubmit={handleSubmit} id="create-salerecord-form">
              <div className="mb-3">
                <select onChange={handleChangeAuto} value={automobile} required name="automobile" id="automobile" className="form-select">
                  <option value="">--Select Automobile from Inventory--</option>
                  {autoVOs.map(autoVO => {
                    return (
                      <option key={autoVO.vin} value={autoVO.vin}>{autoVO.vin} - {autoVO.year} {autoVO.manufacturer_name} {autoVO.model_name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleChangeSalesPerson} value={sales_person} required name="sales_person" id="sales_person" className="form-select">
                  <option value="">--Select Sales Person--</option>
                  {salespeople.map(sales_person => {
                    return (
                      <option key={sales_person.employee_number} value={sales_person.employee_number}> #{sales_person.employee_number} - {sales_person.name} </option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleChangeCustomer} value={customer} required name="customer" id="customer" className="form-select">
                  <option value="">--Select Customer--</option>
                  {customers.map(customer => {
                    return (
                      <option key={customer.id} value={customer.id}> {customer.name} </option>
                    )
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChangeSalePrice} value={sale_price}  placeholder="" required type="number" name="sale_price" id="sale_price" className="form-control" />
                <label htmlFor="sale_price">Enter Sales Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default SaleRecordForm;
