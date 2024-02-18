from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Vault
from .serializers import VaultSerializer


@api_view(("GET",))
def get_vault(request):
    user_id = request.GET.get("user_id")
    vault = Vault.objects.filter(user=user_id)
    vault = [VaultSerializer(each) for each in vault]
    print(vault)
    return Response(vault)


@api_view(("GET",))
def is_token_valid(request):
    key = request.GET.get("key")
    user_id = request.GET.get("user_id")
    tokens = Token.objects.filter(key=key)
    if tokens.exists():
        token = tokens[0]
        user_id_from_db = str(token.user_id)
        if user_id_from_db == user_id:
            return Response(True)
    return Response(False)


class AuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data["email"]
        password = request.data["password"]
        userQuerySet = User.objects.filter(email=email)
        if userQuerySet.exists():
            username = userQuerySet[0].username
            user = authenticate(request, username=username, password=password)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"key": token.key, "user_id": user.pk})
        return Response()
