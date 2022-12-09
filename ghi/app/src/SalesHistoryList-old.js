import React from "react";

class SalesHistoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sales_person: '',
      salespeople: [],
      sales: [],
    }

    this.handleChangeSalesPerson = this.handleChangeSalesPerson.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  async componentDidMount() {
    const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
    const salesUrl = 'http://localhost:8090/api/sales/';

    const spResponse = await fetch(salespeopleUrl);
    const salesResponse = await fetch(salesUrl)

    if (spResponse.ok && salesResponse.ok) {
      const spData = await spResponse.json();
      const salesData = await salesResponse.json();
      this.setState({ salespeople: spData.salespeople });
      this.setState({ sales: salesData.sales})
    }
  }



  handleChangeSalesPerson(event) {
    const value = event.target.value;
    this.setState({ sales_person: value })
  }

  async handleSubmit(event) {
    event.preventDefault();

    const data = this.state.salespeople.filter((sales_person) => { return sales_person.sales_person === this.state.sales_person })
    this.setState({ salespeople: data })
  }


  render() {
    return (
      <>
      < br/>
        <h1>Sales Person History</h1>
        <div className="mb-3">
          <select onChange={this.handleChangeSalesPerson} value={this.state.sales_person} required name="sales_person" id="sales_person" className="form-select">
              <option value="">Select a Sales Person</option>
              {this.state.salespeople.map(sales_person => {
                return (
                  <option key={sales_person.employee_number} value={sales_person.employee_number}> #{sales_person.employee_number} - {sales_person.name} </option>
                )
              })}
            </select>
        </div>
        <table className="table table-striped border-warning">
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
            {this.state.sales.map(sale => {
              return (
                <tr key={sale.id}>
                  <td>{sale.sales_person}</td>
                  <td>{sale.employee_number}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.automobile}</td>
                  <td>{sale.sale_price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </>
    )
  }
}


export default SalesHistoryList;
