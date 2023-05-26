from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'projects'

urlpatterns = [
    path('', views.general_settings, name='general_setting'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
