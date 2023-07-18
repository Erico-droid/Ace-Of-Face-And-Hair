from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.sessions.models import Session
from django.middleware.csrf import get_token
import json
from Projects.models import CustomImage
import random
from .models import FAQ, Visitor
from django.contrib.auth import authenticate, login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# from django.views.decorators.csrf import ensure_csrf_token

def check_session_exists(session_key):
    session_exists = Session.objects.filter(session_key=session_key).exists()
    return session_exists

def get_csrf_token(request):
    csrf_token = get_token(request)
    print("sent")
    return JsonResponse({'csrfToken': csrf_token})

# @ensure_csrf_cookie
# def get_csrf_token(request):
#     print(request.COOKIES.get('csrftoken'))
#     return JsonResponse({'csrfToken': request.COOKIES.get('csrftoken')})

class YourView(APIView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs) -> Response:
        """Return an empty response with the CSRF token as a cookie."""
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@csrf_exempt
def handle_session(request):
    if request.method == "POST" or request.POST: 
        data = json.loads(request.body) 
        visitor, created = Visitor.objects.get_or_create(visitorSessionName=data['user_session'])
        visitor = Visitor.objects.get(visitorSessionName=data['user_session'])
        visitor_data = {
            'dark_mode': visitor.visit_darkmode_state
        }
        data = json.dumps(visitor_data)
        return JsonResponse(data, safe=False)


@csrf_exempt
def handleThemeState(request):        
    if request.method == "POST" or request.POST:
        data = request.body
        try:
            json_data = json.loads(data)
            visitor = Visitor.objects.get(visitorSessionName = json_data["user_session"])
            visitor.visit_darkmode_state = json_data["dark_mode"]
            visitor.save()
            return JsonResponse({"dark_mode": visitor.visit_darkmode_state})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})


def work_area_images(request):
    if request.method == "GET" or request.GET:
        images = CustomImage.objects.all()
        random_images = []
        if len(images) > 0 and not len(images) < 6:
            for i in range(0,6):
                rand = random.randint(0,len(images))
                random_images.append(images[i].image.url)
        else:
            for i in range(0,len(images)):
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
        faqs_list.append(faqs_object)
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