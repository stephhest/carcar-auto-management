from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    color = models.CharField(max_length=20)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveIntegerField(unique=True, null=True)
    def get_api_url(self):
        return reverse("show_tech", kwargs={"pk": self.id})
    def __str__(self):
        return self.name


class Appointment(models.Model):
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE
    )
    owner_name = models.CharField(max_length=50)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="appointments",
        on_delete=models.CASCADE
    )
    reason = models.TextField(max_length=200)
    finished = models.BooleanField()
    cancelled = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    def get_api_url(self):
        return reverse("show_appointment", kwargs={"pk": self.id})
    def __str__(self):
        return f"Appointment for {self.owner_name}, VIP {self.vip}"
