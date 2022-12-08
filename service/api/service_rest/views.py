from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician
import json



class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "id",
        "import_href",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "owner_name",
        "date",
        "time",
        "reason",
        "purchased",
        "complete",
        "id",
        "vin",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_appointments(request, input_vin=None):
    if request.method == "GET":
        if input_vin is not None:
            appointments = Appointment.objects.filter(vin=input_vin)
        else:
            appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        content["complete"] = False
        try:
            try:
                purchase = AutomobileVO.objects.get(vin=content["vin"])
                content["purchased"] = True
            except AutomobileVO.DoesNotExist:
                content["purchased"] = False
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False,
            )
        except Exception as e:
            response = JsonResponse(
                {"message": "Could not create an Appointment"}
            )
            response.status_code = 400
            return response




@require_http_methods(["GET", "DELETE"])
def api_show_appointment_details(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "appointment does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment doesn't exist"})


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET"])
def api_service_history(request, vin):
    if request.method == "GET":

        try:
            service = Appointment.objects.filter(automobile__vin=vin)
            if len(service) == 0:
                raise ValueError('There are no past services associated with this VIN number')
            return JsonResponse(
                service,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            print("Hello Vin")
            return JsonResponse(
                {"message": "Invalid Appointment"},
                status=400,
            )



def api_list_auto_vos(request):
    if request.method == "GET":
        auto_vos = AutomobileVO.objects.all()
        return JsonResponse(
        {"autos": auto_vos},
        encoder=AutomobileVOEncoder,
        safe=False,
    )
