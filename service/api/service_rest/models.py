from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, null=True)






class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveIntegerField(unique=True, null=True)
    def get_api_url(self):
        return reverse("show_tech", kwargs={"pk": self.id})
    def __str__(self):
        return self.name


class Appointment(models.Model):
    vin = models.CharField(max_length=17, null=True, unique=False)
    owner_name = models.CharField(max_length=50)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    reason = models.TextField(max_length=200)
    purchased = models.BooleanField(null=True)
    complete = models.BooleanField(null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE
    )
    def get_api_url(self):
        return reverse("show_appointment", kwargs={"pk": self.id})
