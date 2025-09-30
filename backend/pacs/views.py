from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import Client, Machine, ServicePrice, DICOMStudy
from .serializers import ClientSerializer, MachineSerializer, ServicePriceSerializer, DICOMStudySerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, Group
from rest_framework.parsers import MultiPartParser, FormParser
import pydicom
from pydicom import dcmread
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pacs_me(request):
    user = request.user
    groups = list(user.groups.values_list('name', flat=True))  # Extract group names

    # Default redirect path
    redirect_to = "/"

    if "client" in groups:
        redirect_to = "/client"
    elif "coordinator" in groups:
        redirect_to = "/coordinator"
    elif "doctor" in groups:
        redirect_to = "/doctor"

    return Response({
        "username": user.username,
        "email": user.email,
        "groups": groups,
        "redirect_to": redirect_to
    })

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permission_classes = [IsAuthenticated]

class ServicePriceViewSet(viewsets.ModelViewSet):
    queryset = ServicePrice.objects.all()
    serializer_class = ServicePriceSerializer
    permission_classes = [IsAuthenticated]

class DICOMStudyViewSet(viewsets.ModelViewSet):
    queryset = DICOMStudy.objects.all().order_by("-created_at")
    serializer_class = DICOMStudySerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="client").exists():
            # client sees their own studies
            try:
                client = user.client
                return self.queryset.filter(client=client)
            except Client.DoesNotExist:
                return DICOMStudy.objects.none()
        if user.groups.filter(name="doctor").exists():
            return self.queryset.filter(assigned_doctor=user)
        # coordinators see all
        return self.queryset

    def perform_create(self, serializer):
        # For client uploads: parse DICOM basic tags if possible
        uploaded = serializer.validated_data.get("dicom_file")
        patient_id = None
        patient_name = None
        study_date = None
        modality = None
        try:
            # read from file-like object
            uploaded.file.seek(0)
            ds = dcmread(uploaded.file, stop_before_pixels=True)
            patient_id = getattr(ds, "PatientID", None)
            patient_name = str(getattr(ds, "PatientName", "")) or None
            study_date = getattr(ds, "StudyDate", None)
            modality = getattr(ds, "Modality", None)
        except Exception as e:
            # not a DICOM or parsing failed; ignore
            pass

        # try tie to client if uploader has a client
        user = self.request.user
        client = None
        if hasattr(user, "client"):
            client = user.client

        serializer.save(
            patient_id=patient_id,
            patient_name=patient_name,
            study_date=study_date,
            modality=modality,
            client=client
        )

    @action(detail=True, methods=["post"], parser_classes=[JSONParser])
    def assign_doctor(self, request, pk=None):
        # Only coordinator should call this endpoint
        user = request.user
        if not user.groups.filter(name="coordinator").exists():
            return Response({"detail": "Only coordinator can assign"}, status=403)
        study = self.get_object()
        doctor_id = request.data.get("doctor_id")
        try:
            doctor = User.objects.get(id=doctor_id)
        except User.DoesNotExist:
            return Response({"detail": "Doctor not found"}, status=404)
        study.assigned_doctor = doctor
        study.status = "assigned"
        study.save(update_fields=["assigned_doctor", "status"])
        return Response(self.get_serializer(study, context={"request": request}).data)


@api_view(["GET"])
def list_doctors(request):
    try:
        doctor_group = Group.objects.get(name="doctor")
        doctors = doctor_group.user_set.all()
        data = [{"id": u.id, "name": u.get_full_name() or u.username} for u in doctors]
        return Response(data)
    except Group.DoesNotExist:
        return Response([])