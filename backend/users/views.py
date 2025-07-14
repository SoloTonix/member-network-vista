from django.shortcuts import render
from rest_framework import generics, status, response
from .models import *
from django.contrib.auth import get_user_model
from .serialisers import *
from rest_framework.permissions import *
from django.db.models import Sum

# Create your views here.
User = get_user_model()
class RegisterView(generics.CreateAPIView):
    queryset =User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerialiser
    
class UserDetailView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerialiser
    
    def get_object(self):
        return self.request.user
    
class AdminDashboardStatsView(generics.GenericAPIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_members = Member.objects.count()
        top_performers = Member.objects.order_by('no_referrals')[:3]
        total_referrals = Member.objects.all().aggregate(total=Sum('no_referrals'))['total']
        serialiser = MemberSerialiser(top_performers, many=True)
        stage_distribution = [
            { 'stage': 1, 'count':Member.objects.filter(stage=1).count()},
            { 'stage': 2, 'count':Member.objects.filter(stage=2).count()},
            { 'stage': 3, 'count':Member.objects.filter(stage=3).count()},
            { 'stage': 4, 'count':Member.objects.filter(stage=4).count()},
            { 'stage': 5, 'count':Member.objects.filter(stage=5).count()},
        ]
        # Add more stats as needed
        return response.Response({
            'total_members': total_members,
            'total_referrals': total_referrals,  # Implement your referral logic
            'top_performers':serialiser.data,
            'stage_distribution':stage_distribution,
            'total_stages': 0,     # Implement your stage logic
            'recent_registrations': User.objects.order_by('-date_joined')[:10].count(),
        })

    
class MemberListCreateView(generics.ListCreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerialiser
    
    def create(self, request, *args, **kwargs):
        serialiser = self.get_serializer(data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return response.Response(serialiser.data, status=status.HTTP_201_CREATED)
        return response.Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerialiser
    lookup_field = 'code_id'
    
    
    
