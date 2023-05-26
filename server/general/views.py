from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
# def general_settings(request):
#     if request.method == "GET" or request.GET:
#         request.session['my_variable'] = 'Hello, Session!'
#         session_id = request.session.session_key
#         return HttpResponse({"hold on":"be strong"})


def general_settings(request):
    if request.method == "GET" or request.GET:
        dark_mode_enabled = request.GET.get('dark_mode_enabled', False)
        request.session['dark_mode'] = dark_mode_enabled
        session_id = request.session.session_key
        return JsonResponse({"message": session_id})
    
    if request.method == "POST" or request.POST:
        dark_mode_enabled = request.POST.get('dark_mode_enabled', False)
        return JsonResponse({"message": "Darkmode enabled"})