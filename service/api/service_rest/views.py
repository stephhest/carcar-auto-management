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
        "color",
        "year",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "owner_name",
        "date",
        "time",
        "technician",
        "automobile",
        "reason",
        "vip",
        "cancelled",
        "finished",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "technician": TechnicianEncoder(),
    }


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            vin_key = content["automobile"]
            vin_value = AutomobileVO.objects.get(vin=vin_key)
            content["automobile"] = vin_value
            technician_key = content["technician"]
            technician_value = Technician.objects.get(id=technician_key)
            content["technician"] = technician_value
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin id"},
                status=400,
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def show_appointments(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment doesn't exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=pk)

            props = ["owner_name", "vip", "date", "finished", "canceled"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment doesn't exist"})
            response.status_code = 404
            return response



@require_http_methods(["GET", "POST"])
def list_technicians(request):
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
                {"message": "Could not create the tech"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            tech = Technician.objects.get(id=pk)
            tech.delete()
            return JsonResponse(
                tech,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            tech = Technician.objects.get(id=pk)

            props = ["name", "id"]
            for prop in props:
                if prop in content:
                    setattr(tech, prop, content[prop])
            tech.save()
            return JsonResponse(
                tech,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response



@require_http_methods(["GET"])
def service_history(request, vin):
    if request.method == "GET":
        try:
            service = Appointment.objects.filter(banana__vin=vin)
            #service = Appointment.objects.all()
            return JsonResponse(
                service,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Appointment"},
                status=400,
            )
