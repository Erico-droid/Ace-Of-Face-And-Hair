from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.sessions.models import Session
from django.middleware.csrf import get_token
import json
from Projects.models import Image
import random
from .models import FAQ
from django.contrib.auth import authenticate, login

def check_session_exists(session_key):
    session_exists = Session.objects.filter(session_key=session_key).exists()
    return session_exists

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

def general_settings(request):
    if request.method == "GET" or request.GET:
        session_id = request.session.session_key
        if check_session_exists(session_id):
            return JsonResponse({"dark_mode": request.session['dark_mode']})
        else:
            request.session['dark_mode'] = False
            return JsonResponse({"dark_mode": request.session['dark_mode']})
        
    if request.method == "POST" or request.POST:
        try:
            json_data = json.loads(request.body)
            dark_mode_enabled = json_data.get('darkmode', False)
            request.session['dark_mode'] = dark_mode_enabled
            # print(request.session['dark_mode'])
            return JsonResponse({"dark_mode": request.session['dark_mode']})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})


def work_area_images(request):
    if request.method == "GET" or request.GET:
        images = Image.objects.all()
        random_images = []
        for i in range(0,6):
            rand = random.randint(0,len(images))
            random_images.append(images[i].image.url)
        return JsonResponse({'images':random_images})
    
def frequently_asked_questions(request):
    faqs = FAQ.objects.all()
    faqs_list = []
    for faq in faqs:
        faqs_object = {}
        faqs_object["question"] = faq.question
        faqs_object["answer"] = faq.answer
        faqs_list.append(faqs_object);
    return JsonResponse(faqs_list, safe = False)

def handle_login(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username = username, password = password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message':'Login successful', "redirect":"/dashboard/"}, status = 200)
        else:
            return JsonResponse({"message": 'Invalid Credentials'}, status = 400)
    else:
        return JsonResponse({"message":"Invalid request method"}, status = 405)