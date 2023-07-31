from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'general'

urlpatterns = [
    path('', views.handleThemeState, name='handleThemeState'),
    path('get_csrf_token/', views.get_csrf_token, name='csrf_token'),
    path('work_area_images/', views.work_area_images, name='work_area_images'),
    path('frequently_asked_questions/', views.frequently_asked_questions, name='faq'),
    path('login/', views.handle_login, name = "login"),
    path('fetch_csrf/', views.YourView.as_view(), name = "fetch_csrf"),
    path('handle_user_session/', views.handle_session, name = "handle_session"),
    path('create_faq/', views.create_faq, name = "create_faq"),
    path('delete_faq/', views.delete_faq, name = "delete_faq"),
    path('get_particular_faq/', views.get_particular_faq, name = "get_particular_faq"),
    path('edit_faq/', views.edit_faq, name = "edit_faq"),    
    path('testimonials/', views.testimonials, name='testimonials'),
    path('create_testimonial/', views.create_testimonial, name = "create_testimonial"),
    path('delete_testimonial/', views.delete_testimonial, name = "delete_testimonial"),
    path('get_particular_testimonial/', views.get_particular_testimonial, name = "get_particular_testimonial"),
    path('edit_testimonial/', views.edit_testimonial, name = "edit_testimonial"),
    path('reach-outs/', views.reach_outs, name='reach_outs'),
    path('create_reach_out/', views.create_reach_out, name = "create_reach_out"),
    path('delete_reach_out/', views.delete_reach_out, name = "delete_reach_out")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
