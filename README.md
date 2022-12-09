# CarCar

Team:
* Stephanie - Sales
* Kayre - Service

## Design
![CarCar Design](/images/CarCarDiagram.png "
CarCar Design")

## Service microservice

- The Services microservice includes:


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
