from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician
import json


### ENCODERS ###

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "color",
        "year",
        "manufacturer_name",
        "model_name",
        "picture_url"
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "owner_name",
        "date",
        "time",
        "reason",
        "vip",
        "complete",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


class AppointmentVinEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
    ]



### VIEWS ###

# LIST AUTO VOS
@require_http_methods(["GET"])
def api_list_auto_vos(request):
    if request.method == "GET":
        auto_vos = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": auto_vos},
            encoder=AutomobileVOEncoder,
            safe=False
        )


# LIST AND CREATE TECHNICIANS
@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
        )
    else: # POST
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )

# LIST AND CREATE APPOINTMENTS
@require_http_methods(["GET", "POST"])
def api_list_appointments(request, vin=None, status=None):
    if request.method == "GET":
        if vin is not None:
            appointments = Appointment.objects.filter(vin=vin)
        elif status is not None:
            if status == "scheduled":
                complete = False
            elif status == "complete":
                complete = True
            appointments = Appointment.objects.filter(complete=complete)
        else:
            appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False
        )
    else: #POST
        content = json.loads(request.body)
        try: #handle auto vin
            AutomobileVO.objects.get(vin=content["vin"])
            content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False
        try: #handle technician
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid or missing technician id"},
                status=400
            )
        try: # handle an existing appointment
            Appointment.objects.get(technician=technician, date=content["date"], time=content["time"])
            return JsonResponse(
                {"message": "This time slot for the selected technician is not available"},
                status=400
            )
        except Appointment.DoesNotExist:
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )

# SHOW / UPDATE / DELETE APPOINTMENT
@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    else: # PUT
        content = json.loads(request.body)
        try:
            appointment = Appointment.objects.get(id=pk)
            if "vin" in content: #handle auto vin
                auto_vin = content["vin"]
                try:
                    AutomobileVO.objects.get(vin=auto_vin)
                    content["vip"] = True
                except AutomobileVO.DoesNotExist:
                    content["vip"] = False
            if "technician" in content: #handle technician
                tech_id = content["technician"]
                try:
                    technician = Technician.objects.get(id=tech_id)
                    content["technician"] = technician
                except Technician.DoesNotExist:
                    return JsonResponse(
                        {"message: ", "Technician does not exist"},
                        status=400
                    )
            props = ["owner_name", "date", "time", "reason", "complete"]
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
            return JsonResponse(
                {"message:", "Appointment does not exist"},
                status=404
            )
