
import React from "react";

class ServiceHistoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vin: '',
      appointments: []
    }


    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleVinChange(event) {
    const value = event.target.value;
    this.setState({ vin: value })
  }
  async handleSubmit(event) {
    event.preventDefault();

    const data = this.state.appointments.filter((appointment) => { return appointment.vin === this.state.vin })
    this.setState({ appointments: data })
  }

  async componentDidMount() {
    const servicesUrl = 'http://localhost:8080/api/appointments/'

    const response = await fetch(servicesUrl)
    if (response.ok) {
      const specificAutomobile = await response.json()
      this.setState({ appointments: specificAutomobile.appointments })
    }
  }

  render() {
    return (
      <>
        <h1>Service History</h1>
        <form className="form-inline" onSubmit={this.handleSubmit}
          id="specific-automobile-history">
          <div>
            <input onChange={this.handleVinChange} value={this.state.vin} type="search" placeholder="Automobile VIN"
              className="p-3 mb-2" name="vin" aria-label="Search" id="vin" />
            <button variant="outline-success" className="p-3 mb-2">Search</button>
          </div>
        </form>
        <table className="table table-striped border-warning">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Customer Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Technician</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {this.state.appointments.map(appointment => {
              return (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{appointment.owner_name}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.reason}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </>
    )
  }
}


export default ServiceHistoryList;
