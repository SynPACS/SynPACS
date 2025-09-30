from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="client")
    mail_id = models.EmailField()
    gst_number = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.user.username

class Machine(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="machines")
    machine_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.machine_name} ({self.client.user.username})"

class ServicePrice(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="services")
    service_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.service_name} - {self.price} ({self.client.user.username})"

class DICOMStudy(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="studies")
    dicom_file = models.FileField(upload_to="dicom_files/")
    patient_id = models.CharField(max_length=100, blank=True, null=True)
    patient_name = models.CharField(max_length=255, blank=True, null=True)
    study_date = models.CharField(max_length=20, blank=True, null=True)
    modality = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    assigned_doctor = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_cases"
    )
    status = models.CharField(max_length=32, default="new")  # new, assigned, in_review, reported
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient_name} ({self.patient_id})"
