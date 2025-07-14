from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('detail/', UserDetailView.as_view(), name='UserDetailView'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('admin-stats/', AdminDashboardStatsView.as_view(), name='admin_stats'),
    
    path('members/', MemberListCreateView.as_view(), name='MemberListCreateView'),
    path('member/<str:code_id>/', MemberDetailView.as_view(), name='MemberDetailView'),
]
