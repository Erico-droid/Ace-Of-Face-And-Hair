from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'services'

urlpatterns = [
    path('', views.get_services_and_sub_services, name='get_services_and_sub_services'),
    path('create_service/', views.create_service, name='create_service'),
    path('edit_service/<slug:service_slug>', views.edit_service, name='edit_service'),
    path('delete_service/<slug:service_slug>', views.delete_service, name='delete_service'),
    path('get_sub_services/', views.get_sub_services, name='get_sub_services'),
    path('create_sub_service/', views.create_sub_service, name='create_sub_service'),
    path('delete_sub_service/<slug:sub_service_slug>/', views.delete_sub_service, name='delete_sub_service'),
    path('edit_sub_service/<slug:sub_service_slug>/', views.edit_sub_service, name='edit_sub_service')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
