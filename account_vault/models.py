from django.contrib.auth.models import User
from django.db import models

class AccountRequestStatus(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(max_length=63, unique=True, blank=False, null=False)

class AccountRequest(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    status = models.ForeignKey(AccountRequestStatus, on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now=True)

class Vault(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    website = models.CharField(max_length=63, unique=False, blank=False, null=False)
    username = models.CharField(max_length=63, unique=False, blank=False, null=False)
    password = models.CharField(max_length=63, unique=False, blank=False, null=False)
