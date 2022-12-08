import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
<<<<<<< ghi/app/src/Nav.js
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/manufacturers">List of Manufacturers</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/models">List of Vehicle Models</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/technicians/new">Add Technician</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/service/appointment/new">New Service Appointment</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/service/all_appointments">See All Service Appointments</NavLink>
              // -------------------------------------------------------------------------------------------------
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles">Inventory</NavLink>
            </li>
     // -------------------------------------------------------------------------------------------------

=======
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles">Inventory</NavLink>
            </li>
>>>>>>> ghi/app/src/Nav.js
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
