from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('', views.project_list, name='project_list'),
    path('<slug:project_slug>/', views.project_detail, name='project_detail'),
    path('create_project', views.create_project, name='create_project'),
    # Add more URL patterns as needed
]
