from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('get_projects/', views.provideProjects, name='provide_projects'),
    # Add more URL patterns as needed
]