from django.urls import path
from .views import api_list_appointments, api_show_appointment, api_list_technicians, api_list_auto_vos


urlpatterns = [
    path("automobiles/", api_list_auto_vos, name="api_list_auto_vos"),

    path("technicians/", api_list_technicians, name="api_list_technicians"),

    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/automobiles/", api_list_appointments, name="api_list_appointments"),
    path("appointments/automobiles/<str:vin>/", api_list_appointments, name="api_list_appointments"),

    path("appointments/<int:pk>/", api_show_appointment, name="api_show_appointment"),
]
