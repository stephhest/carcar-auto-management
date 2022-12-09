# CarCar

Team:
* Stephanie Hestilow - Sales
* Kayre Santos - Service

## Instructions to run project
1. Fork and clone the project from: https://gitlab.com/kayresantos/project-beta
2. Copy the clone with the HTTPS link
3. Open up a command terminal and cd into your project directory
In your command terminal type:

    - `git clone <HTTPS Link>`
    - `docker volume create beta-data` (this command creates the data for docker)
    - `docker-compose build` (this command builds the containers for docker)
    - `docker-compose up` (this command runds the docker containers)

4. Open up Docker Desktop and ensure all containers are running without errors
5. Create data Insomnia using the routes and test data below (see CRUD ROUTE DOCUMENTATION and TEST DATA)
6. To see and engage with the app, open up google chrome go to http://localhost:3000

## Design
![CarCar Design](/images/CarCarDiagram.png "
CarCar Design")

## Service microservice
- The Services microservice includes:
1. TechnicianForm
    - create a form that allows a person to enter a technician's name and employee number

2. ServiceAppointmentForm
    - create a form that allows a service concierge to enter
        -the VIN of the vehicle
        -the name of the person to whom the vehicle belongs
        -the date and time of the appointment
        -the assigned technician
        -a reason for the service appointment
            For example: "oil change" or "routine maintenance"
    -  When the form is submitted, the service appointment should be saved in the application
    -  create a link in the navbar to get to the Enter a service appointment form.

3. List of Appointments
    - get the list of service appointments
        -Vin
        -Customer Name/ Owner Name
        -date and time of the appointment
        -the assigned technician's name
        -the reason for the service
        - Cancel button if pressed will delete the appointment from the list
        - Finished button if pressed will delete the appointment from the list
        - VIP status(If vehicle was purchased from inventory)

4. ServiceHistoryForm
    - A page that has an input that allows someone to type in a VIN number
    - fetch all of the service appointments associated with a VIN number

## Sales microservice
- Models
    - AutomobileVO -> VALUE OBJECT, represents a copy of an existing automobile from Inventory
        - import_href: string
        - color: string
        - year: integer
        - vin: string (unique)
        - manufacturer_name: string
        - model_name: string
        - sold: bool (default set to False)
    - SalesPerson -> describes a specific sales person
        - name: string
        - employee_number: integer (unique)
    - Customer -> describes a specific potential customer
        - name: string
        - address: string
        - phone: string
    - Sale -> describes a specific sale record
        - sale_price: integer
        - automobile: FOREIGN KEY -> AutomobileVO
        - sales_person: FOREIGN KEY -> SalesPerson
        - customer: FOREIGN KEY -> Customer
- Poller
    - Consumer will poll Automobile data in the inventory api.  For each Automobile object in inventory, the Sales poller will either update or create a new "AutomobileVO" with the corresponding data, using "create_or_update()" method.
    - Poller will poll URL http://inventory-api:8000/api/automobiles/
- Forms
    - Create Customer -> Adds a new customer in the database
    - Create Sales Person -> Adds a new sales person in the database (must have unique employee number)
    - Create Sale Record -> Adds a new sale record in the database (associated autoVO must be NOT be sold)
- List Views
    - List All Sales -> Shows all existing sales in the database
    - List Sales Person History -> Shows all sales by a selected sales person



## API Route Documentation
GHI: localhost:3000 (React Front End)
| API       | PORT | METHOD | ACTION                                         | URL                                                             |
|-----------|------|--------|------------------------------------------------|-----------------------------------------------------------------|
| Inventory | 8100 | GET    | List all manufacturers                         | http://localhost:8100/api/manufacturers/                        |
| Inventory | 8100 | POST   | Create a manufacturer                          | http://localhost:8100/api/manufacturers/                        |
| Inventory | 8100 | GET    | List all vehicle models                        | http://localhost:8100/api/models/                               |
| Inventory | 8100 | POST   | Create a vehicle model                         | http://localhost:8100/api/models/                               |
| Inventory | 8100 | GET    | List all automobiles                           | http://localhost:8100/api/automobiles/                          |
| Inventory | 8100 | POST   | Create an automobile                           | http://localhost:8100/api/automobiles/                          |
| Service   | 8080 | GET    | List appointments                              | http://localhost:8080/api/appointments/                         |
| Service   | 8080 | POST   | Create appointment                             | http://localhost:8080/api/appointments/                         |
| Service   | 8080 | POST   | List of Technicians                            | http://localhost:8080/api/technicians/                          |
| Service   | 8080 | GET    | Create a Technician                            | http://localhost:8080/api/technicians/                          |
| Sales     | 8090 | GET    | List all auto VOs                              | http://localhost:8090/api/automobiles/                          |
| Sales     | 8090 | GET    | List auto VOs by status ("sold" / "available") | http://localhost:8090/api/automobiles/str:status                |
| Sales     | 8090 | GET    | List all customers                             | http://localhost:8090/api/customers/                            |
| Sales     | 8090 | POST   | Create a customer                              | http://localhost:8090/api/customers/                            |
| Sales     | 8090 | GET    | List all salespeople                           | http://localhost:8090/api/salespeople/                          |
| Sales     | 8090 | POST   | Create a sales person                          | http://localhost:8090/api/salespeople/                          |
| Sales     | 8090 | GET    | List all sales                                 | http://localhost:8090/api/sales/                                |
| Sales     | 8090 | POST   | Create a sale record                           | http://localhost:8090/api/sales/                                |
| Sales     | 8090 | GET    | List sales by sales person                     | http://localhost:8090/api/sales/salespeople/int:employee_number |


# Sample JSON Body Data

Create Manufacturer
```
{
    "name": "Chrysler"
}
```

Create Vehicle Model
```
{
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer_id": 1
}
```

Create Automobile
```
{
    "color": "red",
    "year": 2012,
    "vin": "1C3CC5FB2AN120174",
    "model_id": 1
}
```

Create Technician
```
{
    "name": "John Doe",
    "employee_number": 1,
}
```

Create Service Appointment
```
{
    "vin": "1C3CC5FB2AN120174",
    "owner_name": "Jane Doe",
    "date": "2022-12-16",
    "time": "10:00:00",
    "reason": "Tune up",
    "technician": 1
}
```

Create Sales Person
```
{
    "name": "Joe Donaldson",
    "employee_number": 1
}
```

Create Potential Customer
```
{
    "name": "Noor Sayid-Alexanderson",
    "address": "987 Strawberry Hill",
    "phone": "5556875309"
}
```

Create Sale Record
```
{
    "sale_price": 20000,
    "sales_person": 1,
    "automobile": "1C3CC5FB2AN120174",
    "customer": 1
}
```

