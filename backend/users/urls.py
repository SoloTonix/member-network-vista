from django.urls import path
from .views import *

urlpatterns = [
    path('members/', MemberListCreateView.as_view(), name='MemberListCreateView'),
    path('member/<str:code_id>/', MemberDetailView.as_view(), name='MemberDetailView'),
]
