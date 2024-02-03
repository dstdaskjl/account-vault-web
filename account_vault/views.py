import json
from django.contrib.auth import authenticate, login as django_login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt

from .models import Vault


def get_vault(request, email):
  return Vault.objects.filter(user__email=email)

def is_authenticated(request):
  is_authenticated = request.user.is_authenticated
  return HttpResponse(json.dumps(is_authenticated))

@csrf_exempt
def login(request, *args, **kwargs):
  data = json.loads(request.body)
  email = data.get('email')
  password = data.get('password')
  userQuerySet = User.objects.filter(email=email)
  if userQuerySet.exists():
    user = authenticate(request, username=userQuerySet[0].username, password=password)
    if user:
      print(request.user.is_authenticated)
      django_login(request, user)
      print(request.user.is_authenticated)
      return HttpResponse(json.dumps(True))
  return HttpResponse(json.dumps(False))


