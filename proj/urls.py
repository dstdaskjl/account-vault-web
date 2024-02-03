from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from account_vault import views

router = routers.DefaultRouter()
# router.register(r'hints', views.HintsView.as_view(), basename='Hints')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("hints/", views.get_vault),
    path("is_authenticated/", views.is_authenticated),
    path("login/", views.login),
]
