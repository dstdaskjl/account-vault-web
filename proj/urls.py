from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView

from account_vault import views

router = routers.DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/vault/", views.VaultView.as_view(), name="vault"),
    path("api/vault/create", views.VaultCreateView.as_view(), name="vault_create"),
    path("api/vault/delete", views.VaultDeleteView.as_view(), name="vault_delete"),
]
