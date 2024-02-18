from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from account_vault import views

router = routers.DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("get-vault/", views.get_vault),
    path("is-token-valid/", views.is_token_valid),
    path("api-token-auth/", views.AuthToken.as_view()),
]
