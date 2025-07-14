from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_active']  # Explicitly list fields
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'is_staff': {'read_only': True}  # Prevent this from being set via API
        }
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class MemberSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'
        extra_kwargs = {
            'code_id': {'required': True},
            'email': {'required': True},
            'phone': {'required': True},
        }
        
        def validate_code_id(self, value):
            if Member.objects.filter(code_id=value).exists():
                raise serializers.ValidationError('a member with this code id already exists')
            return value