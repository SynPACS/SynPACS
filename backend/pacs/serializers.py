from rest_framework import serializers
from .models import Client, Machine, ServicePrice, DICOMStudy
from django.contrib.auth.models import User

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = "__all__"

class ServicePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicePrice
        fields = "__all__"

class ClientSerializer(serializers.ModelSerializer):
    machines = MachineSerializer(many=True, read_only=True)
    services = ServicePriceSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Client
        fields = ["id", "user", "mail_id", "gst_number", "machines", "services"]

# class DICOMStudySerializer(serializers.ModelSerializer):
#     dicom_url = serializers.SerializerMethodField()

#     class Meta:
#         model = DICOMStudy
#         fields = [
#             "id", "client", "dicom_file", "dicom_url", "patient_id",
#             "patient_name", "study_date", "modality", "description",
#             "assigned_doctor", "status", "created_at",
#         ]
#         read_only_fields = ["status", "created_at"]

#     def get_dicom_url(self, obj):
#         request = self.context.get("request")
#         if obj.dicom_file and request:
#             return request.build_absolute_uri(obj.dicom_file.url)
#         return None


class DICOMStudySerializer(serializers.ModelSerializer):
    dicom_url = serializers.SerializerMethodField()
    assigned_doctor_name = serializers.SerializerMethodField()

    class Meta:
        model = DICOMStudy
        fields = "__all__"  # include assigned_doctor_name
        # fields = [
        #     "id", "client", "dicom_file", "dicom_url", "patient_id",
        #     "patient_name", "study_date", "modality", "description",
        #     "assigned_doctor", "status", "created_at",
        # ]
        read_only_fields = ["status", "created_at"]
        extra_kwargs = {
            "client": {"required": False},  # <-- make client optional
        }

    def get_dicom_url(self, obj):
        request = self.context.get("request")
        if obj.dicom_file and request:
            return request.build_absolute_uri(obj.dicom_file.url)
        return None
    
    def get_assigned_doctor_name(self, obj):
        if obj.assigned_doctor:
            return obj.assigned_doctor.get_full_name() or obj.assigned_doctor.username
        return None

