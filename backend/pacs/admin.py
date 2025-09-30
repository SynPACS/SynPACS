from django.contrib import admin
from .models import Client, Machine, ServicePrice, DICOMStudy

admin.site.register(Client)
admin.site.register(Machine)
admin.site.register(ServicePrice)
admin.site.register(DICOMStudy)