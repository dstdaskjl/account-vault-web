from rest_framework import serializers

class VaultSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    website = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.CharField()
    pass_hint = serializers.CharField()
