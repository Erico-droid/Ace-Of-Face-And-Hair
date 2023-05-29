from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('', views.project_list, name='project_list'),
    path('<slug:project_slug>/', views.project_detail, name='project_detail'),
    # Add more URL patterns as needed
]
