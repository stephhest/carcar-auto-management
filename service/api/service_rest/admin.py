from django.contrib import admin
from .models import Appointment, AutomobileVO, Technician
# Register your models here.
admin.site.register(Appointment)
admin.site.register(AutomobileVO)
admin.site.register(Technician)
