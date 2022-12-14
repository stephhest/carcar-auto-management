from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    picture_url = models.URLField(null=True)
    manufacturer_name = models.CharField(max_length=100, null=True)
    model_name = models.CharField(max_length=100, null=True)

    def get_api_url(self):
        return reverse("api_show_auto_vo", kwargs={"vin": self.vin})

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True, null=True)

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"employee_number": self.employee_number})

    def __str__(self):
        return self.name


class Appointment(models.Model):
    vin = models.CharField(max_length=17, unique=False)
    owner_name = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(max_length=200)

    vip = models.BooleanField(default=False)
    complete = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.id})


# class TechnicianSchedule(models.Model):
# Props:
# on_days(dictionary),
# time_slots(dictionary),
# holidays(list of date objects),
# PTO(list of date objects)
