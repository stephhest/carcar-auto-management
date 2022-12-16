import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MainPage() {
  return (
    <>
    <div className="my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership management!
        </p>
      </div>
    </div>
    <div className="homepage-card-container">
      <Row className="homepage-card-row">
        <Col className="homepage-card-col">
          <Card className="homepage-card" bg="dark" text="white">
            <Card.Img variant="top" src="https://media.istockphoto.com/id/480652712/photo/dealer-new-cars-stock.jpg?s=612x612&w=0&k=20&c=Mzfb5oEeovQblEo160df-xFxfd6dGoLBkqjjDWQbd5E=" alt="" />
            <Card.Body className="homepage-card-body">
              <Card.Title className="homepage-card-title">Inventory</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/inventory/automobiles">Automobiles</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/inventory/manufacturers">Manufacturers</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/inventory/models">Vehicle Models</Card.Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col className="homepage-card-col">
          <Card className="homepage-card" bg="dark" text="white">
            <Card.Img variant="top" src="https://media.istockphoto.com/id/1165665234/photo/car-maintenance-and-repair-mechanic-writing-checklist-paper-on-clipboard.jpg?s=612x612&w=0&k=20&c=yjR4V79WTKf6rO00v0ZqCzAoM8AZTdIlA4lP7T_dctg=" alt="" />
            <Card.Body className="homepage-card-body">
              <Card.Title className="homepage-card-title">Service</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item className="list-group-item">
                <Card.Link className="homepage-card-link" href="/service/technicians/new">New Technician</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/service/appointments">View All Appointments</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/service/appointments/vin">Service History</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/service/appointments/calendar">Calendar</Card.Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col className="homepage-card-col">
          <Card className="homepage-card" bg="dark" text="white">
            <Card.Img variant="top" src="https://thumbs.dreamstime.com/b/close-up-car-dealer-shaking-buyer-s-hand-giving-keys-afte-close-up-car-dealer-shaking-buyer-s-hand-giving-keys-125436666.jpg" alt="" />
            <Card.Body className="homepage-card-body">
              <Card.Title className="homepage-card-title">Sales</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/sales/customers/new">New Customer</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/sales">View All Sales</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link className="homepage-card-link" href="/sales/salespeople">Sales Person History</Card.Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
    </>

  );
}

export default MainPage;
