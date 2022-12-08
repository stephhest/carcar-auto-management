# CarCar

Team:

* Person 1 - Which microservice?
* Kayre - Service microservice?

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
5.Create data Insomnia using the routes and test data below (see CRUD ROUTE DOCUMENTATION and TEST DATA)
6. To see and engage with the app, open up google chrome and type http://localhost:3000

## Design

## Service microservice

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

Explain your models and integration with the inventory
microservice, here.
