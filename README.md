# CarCar

Team:
* Stephanie Hestilow - Sales
* Kayre Santos - Service

## Instructions to run project
1. Fork and clone the project from: https://gitlab.com/kayresantos/project-beta
2. Copy the clone with the HTTPS link
3. Open up a command terminal and cd into your project directory
    In your command terminal type:

    - git clone <>
    - docker volume create beta-data (this command creates the data for docker)
    - docker-compose build (this command builds the containers for docker)
    - docker-compose up (this command runds the docker containers)
4. Open up Docker Desktop and ensure all containers are running without errors
5. Create data Insomnia using the routes and test data below (see CRUD ROUTE DOCUMENTATION and TEST DATA)
6. To see and engage with the app, open up google chrome and type http://localhost:3000

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
    - AutomobileVO -> value object, represents a copy of an existing automobile from Inventory
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



## API Documentation
| MICROSERVICE | ACTION                                         | METHOD | URL                                                             |   |
|--------------|------------------------------------------------|--------|-----------------------------------------------------------------|---|
| Inventory    | List all manufacturers                         | GET    | http://localhost:8100/api/manufacturers/                        |   |
| Inventory    | Create a manufacturer                          | POST   | http://localhost:8100/api/manufacturers/                        |   |
| Inventory    | List all vehicle models                        | GET    | http://localhost:8100/api/models/                               |   |
| Inventory    | Create a vehicle model                         | POST   | http://localhost:8100/api/models/                               |   |
| Inventory    | List all automobiles                           | GET    | http://localhost:8100/api/automobiles/                          |   |
| Inventory    | Create an automobile                           | POST   | http://localhost:8100/api/automobiles/                          |   |
| Service      | List appointments                              | GET    | http://localhost:8080/api/appointments/                         |   |
| Service      | Create appointment                             | POST   | http://localhost:8080/api/appointments/                         |   |
| Service      | List of Technicians                            | POST   | http://localhost:8080/api/technicians/                          |   |
| Service      | Create a Technician                            | GET    | http://localhost:8080/api/technicians/                          |   |
| Sales        | List all auto VOs                              | GET    | http://localhost:8090/api/automobiles/                          |   |
| Sales        | List auto VOs by status ("sold" / "available") | GET    | http://localhost:8090/api/automobiles/str:status                |   |
| Sales        | List all customers                             | GET    | http://localhost:8090/api/customers/                            |   |
| Sales        | Create a customer                              | POST   | http://localhost:8090/api/customers/                            |   |
| Sales        | List all salespeople                           | GET    | http://localhost:8090/api/salespeople/                          |   |
| Sales        | Create a sales person                          | POST   | http://localhost:8090/api/salespeople/                          |   |
| Sales        | List all sales                                 | GET    | http://localhost:8090/api/sales/                                |   |
| Sales        | Create a sale record                           | POST   | http://localhost:8090/api/sales/                                |   |
| Sales        | List sales by sales person                     | GET    | http://localhost:8090/api/sales/salespeople/int:employee_number |


## Sample JSON Body Data / Responses
- Inventory
- Service
- Sales
