from django.contrib import admin
from account_vault.models import AccountRequest, AccountRequestStatus, Vault

admin.site.register(AccountRequest)
admin.site.register(AccountRequestStatus)
admin.site.register(Vault)
