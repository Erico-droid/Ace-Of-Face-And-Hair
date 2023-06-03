from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'projects'

urlpatterns = [
    path('', views.general_settings, name='general_setting'),
    path('get_csrf_token/', views.get_csrf_token, name='csrf_token'),
    path('work_area_images/', views.work_area_images, name='work_area_images'),
    path('frequently_asked_questions/', views.frequently_asked_questions, name='faq'),
    path('login/', views.handle_login, name = "login")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
