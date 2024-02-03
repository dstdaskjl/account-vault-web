from django.contrib.auth.models import User
from django.db import models


class Website(models.Model):
    name = models.CharField(max_length=63, unique=True, blank=False, null=False)
    uri = models.CharField(max_length=255, unique=True, blank=False, null=False)


class Vault(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    website = models.ForeignKey(Website, on_delete=models.PROTECT)
    username = models.CharField(max_length=63, unique=False, blank=False, null=False)
    pass_hint = models.CharField(max_length=63, unique=False, blank=False, null=False)
