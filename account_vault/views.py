import json
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Vault
from .serializers import VaultSerializer


def encrypt(text: str, key: str) -> str:
    fernet = Fernet(key.encode("utf8")[-44:])
    token = fernet.encrypt(text.encode("utf8"))
    return token.decode("utf8")


def decrypt(token: str, key: str) -> str:
    fernet = Fernet(key.encode("utf8")[-44:])
    text = fernet.decrypt(token.encode("utf8"))
    return text.decode("utf8")


class UserView(APIView):
    def post(self, request, *args, **kwargs):
        return Response(request.user.first_name)


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
        # website = encrypt(data["website"], request.user.password)
        # username = encrypt(data["username"], request.user.password)
        # password = encrypt(data["password"], request.user.password)
        for record in Vault.objects.filter(user=request.user):
            if (
                decrypt(record.website, request.user.password) == website
                and decrypt(record.username, request.user.password) == username
                and decrypt(record.password, request.user.password) == password
            ):
                record.delete()
                break

        return Response()
