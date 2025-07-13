from rest_framework import serializers
from .models import *

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