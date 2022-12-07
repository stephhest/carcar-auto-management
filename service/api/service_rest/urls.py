from django.urls import path
from .views import list_appointments, show_appointments, list_technicians,show_technician,service_history


urlpatterns = [
    path("appointments/", list_appointments, name="list_appointments"),

    path("appointments/<int:pk>/", show_appointments, name="show_appointment"),

    path("technicians/", list_technicians, name="list_technicians"),

    path("technicians/<int:pk>/", show_technician, name="show_technician"),

    path("vin/appointments/<str:vin>/", service_history, name="service_history"),
]
