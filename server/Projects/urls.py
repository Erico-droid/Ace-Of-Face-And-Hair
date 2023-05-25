from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'projects'

urlpatterns = [
    path('', views.project_list, name='project_list'),
    # path('<int:pk>/', views.project_detail, name='project_detail'),
    # Add more URL patterns as needed
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
