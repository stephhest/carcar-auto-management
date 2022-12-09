import React from 'react';

class ServiceAppointmentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vin: '',
      ownerName: '',
      date: '',
      time: '',
      reason: '',
      technician: '',
      technicians: [],
    };
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleOwnerNameChange = this.handleOwnerNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      data.owner_name = data.ownerName;
      delete data.ownerName;
      delete data.technicians;

      const serviceUrl = 'http://localhost:8080/api/appointments/';
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(serviceUrl, fetchConfig);
      if (response.ok) {
        const newServiceAppointment = await response.json();

        const cleared = {
          vin: '',
          ownerName: '',
          date: '',
          time: '',
          reason: '',
          technician: '',
        };
        this.setState(cleared);
      }
    }

  handleVinChange(event) {
    const value = event.target.value;
    this.setState({ vin: value })
  }

  handleOwnerNameChange(event) {
    const value = event.target.value;
    this.setState({ ownerName: value })
  }

  handleDateChange(event) {
    const value = event.target.value;
    this.setState({ date: value })
  }

  handleTimeChange(event) {
    const value = event.target.value;
    this.setState({ time: value });
  }

  handleReasonChange(event) {
    const value = event.target.value;
    this.setState({ reason: value });
   }

  handleTechnicianChange(event) {
      const value = event.target.value;
      this.setState({technician: value });
    }

  async componentDidMount() {
      const url = 'http://localhost:8080/api/technicians/';

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        this.setState({technicians: data.technician});
      }
    }

    render() {
		return (
			<div className="row">
			  <div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
				  <h1>Create a new service appointment</h1>
				  <form onSubmit={this.handleSubmit} id="create-service-appointment-form" >
					<div className="form-floating mb-3">
					  <input value={this.state.vin} onChange={this.handleVinChange} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
					  <label htmlFor="vin">VIN #</label>
					</div>
					<div className="form-floating mb-3">
					  <input value={this.state.ownerName} onChange={this.handleOwnerNameChange} placeholder="ownerName" required type="text" name="ownerName" id="ownerName" className="form-control" />
					  <label htmlFor="ownerName">Customer Name</label>
					</div>
					<div className="form-floating mb-3">
					  <input value={this.state.date} onChange={this.handleDateChange} placeholder="date" required type="date" name="date" id="date" className="form-control" />
					  <label htmlFor="date">Date</label>
					</div>
					<div className="form-floating mb-3">
					  <input value={this.state.time} onChange={this.handleTimeChange} placeholder="time" required type="time" name="time" id="time" className="form-control" />
					  <label htmlFor="time">Time</label>
					</div>
					<div className="form-floating mb-3">
					  <textarea value={this.state.reason} onChange={this.handleReasonChange} placeholder="reason" name="reason" id="reason" className="form-control" rows="3"/>
					  <label htmlFor="reason" className="form-label">Reason</label>
					</div>
					<div className="mb-3">
					  <select value={this.state.technician} onChange={this.handleTechnicianChange} required name="technician" id="technician" className="form-select">
						<option value="">Choose a technician</option>
						{this.state.technicians.map(technician => {
						  return (
							<option key={technician.id} value={technician.id}>
							  {technician.name}
							</option>
						  );
						})}
					  </select>
					</div>
					<button className="btn btn-primary">Create</button>
				  </form>
				</div>
			</div>
		</div>
        )
	}
}

export default ServiceAppointmentForm;
