import React from 'react';

class ServiceHistory extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            vin: "",
            appointments: [],
        };
        this.handleChangeVin = this.handleChangeVin.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    async onSearch(event) {
        event.preventDefault();
        const data = { ...this.state };

        const vinUrl = `http://localhost:8080/api/appointments/vin/${data.vin}`;
        const response = await fetch(vinUrl);
        if (response.ok) {
            const vins = await response.json();
            this.setState({appointments:vins.appointments})
            const cleared = {
                vin: '',
            };
            this.setState(cleared);
        }
    }

    handleChangeVin(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }

    render() {
        return (
            <>
            <p></p>
            <div>
            <div className= "input-group">
            <form onSubmit= {this.onSearch} id= "search-bar" className='search-bar'>
                <input onChange={this.handleChangeVin} value={this.state.vin} required placeholder="Enter VIN"
                type="search" id="search" name="vin" className="form-control rounded" /> <button> Search</button>
            </form>
            </div>
            </div>
            <p></p>
            <div className= "service list">
                <h2> Service History</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                    </thead>
                    <tbody>
                            {this.state.appointments.map((appointment) => {
                                return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>{appointment.owner_name}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.technician.name}</td>
                                        <td>{appointment.reason}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                </table>
            </div>
            </>
        );
    }
}
export default ServiceHistory;
