# pacs/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, MachineViewSet, ServicePriceViewSet, DICOMStudyViewSet, pacs_me, list_doctors
from .auth_views import get_csrf_token, login_view, logout_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register("clients", ClientViewSet)
router.register("machines", MachineViewSet)
router.register("services", ServicePriceViewSet)
router.register("studies", DICOMStudyViewSet, basename="studies")

urlpatterns = [
    path("", include(router.urls)),
    path("pacs/me/", pacs_me, name="pacs-me"),
    path("auth/csrf/", get_csrf_token, name="get-csrf"),
    path("auth/login/", login_view, name="login"),
    path("auth/logout/", logout_view, name="logout"),
    path("doctors/", list_doctors, name="list-doctors"),
    # JWT endpoints
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]