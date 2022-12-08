from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician
import json
import random


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
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
        "automobile",
        "reason",
        "vip",
        "id",
        "technician",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "technician": TechnicianEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            vin_key = content["vin"]
            automobile = AutomobileVO.objects.get(vin=vin_key)
            content["automobile"] = automobile
            technician_key = content["technician"]
            print("content", content)
            print("technician_key", technician_key)
            technician_value = Technician.objects.get(id=technician_key)
            print(technician_value)
            content["technician"] = technician_value
            print("technician_value", technician_value)
            # content["id"] = random.randit(1,10000)
            # content.remove("vin")
            del content["vin"]
            print("content", content)
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin id"},
                status=400,
            )


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
            response = JsonResponse({"message": "Does not exist"})
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


# @require_http_methods(["DELETE", "GET", "PUT"])
# def api_show_technician(request, pk):
#     if request.method == "GET":
#         try:
#             technician = Technician.objects.get(id=pk)
#             return JsonResponse(
#                 technician,
#                 encoder=TechnicianEncoder,
#                 safe=False
#             )
#         except Technician.DoesNotExist:
#             response = JsonResponse({"message": "Technician does not exist"})
#             response.status_code = 404
#             return response
#     elif request.method == "DELETE":
#         try:
#             tech = Technician.objects.get(id=pk)
#             tech.delete()
#             return JsonResponse(
#                 tech,
#                 encoder=TechnicianEncoder,
#                 safe=False,
#             )
#         except Technician.DoesNotExist:
#             return JsonResponse({"message": "Technician does not exist"})
#     else: # PUT
#         try:
#             content = json.loads(request.body)
#             tech = Technician.objects.get(id=pk)

#             props = ["name", "employee_id"]
#             for prop in props:
#                 if prop in content:
#                     setattr(tech, prop, content[prop])
#             tech.save()
#             return JsonResponse(
#                 tech,
#                 encoder=TechnicianEncoder,
#                 safe=False,
#             )
#         except Technician.DoesNotExist:
#             response = JsonResponse({"message": "Technician does not exist"})
#             response.status_code = 404
#             return response



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


@require_http_methods(["GET"])
def api_list_auto_vos(request):
    auto_vos = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": auto_vos},
        encoder=AutomobileVOEncoder
    )
