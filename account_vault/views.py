import datetime
import json
from cryptography.fernet import Fernet
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AccountRequest, AccountRequestStatus, Vault
from .serializers import VaultSerializer


def encrypt(text: str, key: str) -> str:
    fernet = Fernet(key.encode("utf8")[-44:])
    token = fernet.encrypt(text.encode("utf8"))
    return token.decode("utf8")


def decrypt(token: str, key: str) -> str:
    fernet = Fernet(key.encode("utf8")[-44:])
    text = fernet.decrypt(token.encode("utf8"))
    return text.decode("utf8")


class SignUpView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode("utf8"))
        firstName = data["firstName"]
        lastName = data["lastName"]
        username = data["username"]
        email = data["email"]
        password = data["password"]

        try:
          user = User.objects.create_user(
              first_name=firstName,
              last_name=lastName,
              username=username,
              email=email,
              password=password,
              is_superuser=False,
              is_staff=False,
              is_active=False,
              date_joined=datetime.datetime.now()
          )
          AccountRequest.objects.create(
            user=user,
            status=AccountRequestStatus.objects.get(name='Pending'),
            created=datetime.datetime.now()
          )
          return Response({'isAccountCreated': True})
        except IntegrityError:
          return Response({'isAccountCreated': False})


class UserApprovalView(APIView):
    def get(self, request, *args, **kwargs):
        account_request = AccountRequest.objects.filter(user__username=request.GET.get('username'))
        if account_request.exists() and account_request[0].status.name == "Accepted":
            return Response(True)
        return Response(False)


class UsernameView(APIView):
    def get(self, request, *args, **kwargs):
        usernames = User.objects.values('username')
        usernames = [qs['username'] for qs in usernames]
        return Response(usernames)


class VaultView(APIView):
    def post(self, request, *args, **kwargs):
        vault = Vault.objects.filter(user=request.user)
        serialized_vault = [VaultSerializer(each).data for each in vault]
        grouped_vault = {}
        for item in serialized_vault:
            website = decrypt(item["website"], request.user.password)
            user_info = {
                "username": decrypt(item["username"], request.user.password),
                "password": decrypt(item["password"], request.user.password),
            }
            if website in grouped_vault:
                grouped_vault[website].append(user_info)
            else:
                grouped_vault[website] = [user_info]
        return Response(grouped_vault)


class VaultCreateView(APIView):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode("utf8"))
        website = encrypt(data["website"], request.user.password)
        username = encrypt(data["username"], request.user.password)
        password = encrypt(data["password"], request.user.password)
        Vault.objects.create(
            user=request.user, website=website, username=username, password=password
        )
        return Response()


class VaultDeleteView(APIView):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode("utf8"))
        website = data["website"]
        username = data["username"]
        password = data["password"]
        for record in Vault.objects.filter(user=request.user):
            if (
                decrypt(record.website, request.user.password) == website
                and decrypt(record.username, request.user.password) == username
                and decrypt(record.password, request.user.password) == password
            ):
                record.delete()
                break

        return Response()
