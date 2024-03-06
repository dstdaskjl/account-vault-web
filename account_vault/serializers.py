from rest_framework import serializers


class VaultSerializer(serializers.Serializer):
    website = serializers.CharField()
    username = serializers.CharField()
    password = serializers.CharField()
