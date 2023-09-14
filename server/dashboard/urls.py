from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('get_projects/', views.provideProjects, name='provide_projects'),
    path('provide_analysis/', views.provideAnalysis, name='provideAnalysis')
    # Add more URL patterns as needed
]