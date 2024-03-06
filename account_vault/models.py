from django.contrib.auth.models import User
from django.db import models


class Vault(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    website = models.CharField(max_length=63, unique=False, blank=False, null=False)
    username = models.CharField(max_length=63, unique=False, blank=False, null=False)
    password = models.CharField(max_length=63, unique=False, blank=False, null=False)
