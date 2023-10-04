from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.sessions.models import Session
from django.middleware.csrf import get_token
import json
from Projects.models import CustomImage
import random
from .models import FAQ, Visitor, ReachOut, DailyVisit
from django.contrib.auth import authenticate, login,logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.serializers import serialize
from .models import Testimonial
import datetime
import jwt
from django.conf import settings
import uuid
from importlib import import_module
from django.utils import timezone
from django.contrib.auth.hashers import make_password
import string
from django.http import HttpResponse
from django.views.generic import View
from django.contrib.sitemaps import Sitemap

# from django.views.decorators.csrf import ensure_csrf_token

def check_session_exists(session_key):
    session_exists = Session.objects.filter(session_key=session_key).exists()
    return session_exists

def get_csrf_token(request):
    csrf_token = get_token(request)
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
        comparison_string = data['user_session'] + " - " + str(datetime.date.today()) 
        checkBool = False
        for dv in DailyVisit.objects.all():
            dailyvisit_string = str(dv)
            if (dailyvisit_string == comparison_string):
                checkBool = True
        
        if checkBool == False:            
                DailyVisit.objects.create(
                    user = visitor
                )
                
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

@csrf_exempt
def handle_login(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username = username, password = password) 
        if user is not None:
            login(request, user)
            request.session['user_uuid'] = str(uuid.uuid4())
            return JsonResponse({'message':'Login successful', "afh_uu_rierf": request.session.session_key}, status = 200)
        else:
            return JsonResponse({"message": 'Invalid Credentials'}, status = 200)
    else:
        return JsonResponse({"message":"Invalid request method"}, status = 405)
    


@csrf_exempt
def logout_view(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)['token']
        try:
            session = Session.objects.get(session_key=data)
        except Session.DoesNotExist:            
            return JsonResponse({'authenticated': False})
        
        # Log the user out
        logout(request)
        
        # Delete the session from the database
        session.delete()
        
        response_data = {'redirect': '/'}
        return JsonResponse(response_data, safe=False, status=200)


# FAQS, GET: CREATE: DELETE: UPDATE
@csrf_exempt
def check_if_authenticated(request):
    if request.method == "POST":
        token = json.loads(request.body)['token']
        if token == 'user_not_authenticated':
            return JsonResponse({'authenticated': False})
        else:
            session_key = token

        engine = import_module(settings.SESSION_ENGINE)
        try:
            session = Session.objects.get(session_key=session_key)
        except Session.DoesNotExist:            
            return JsonResponse({'authenticated': False})
        if session:
            if timezone.now() > session.expire_date:
                session.delete()
                return JsonResponse({'authenticated': False})
            else:
                request.session = engine.SessionStore(session_key)
                if '_auth_user_id' in request.session:
                    return JsonResponse({'authenticated': True})
                else:
                    return JsonResponse({'authenticated': False})

def chain_faqs():
    faqs = FAQ.objects.all()
    response_data = []  # This initializes an empty list
    for i in range(0, len(faqs)):
        question = faqs[i].question
        answer = faqs[i].answer
        pk = faqs[i].pk
        new_object = {"id":pk,"question": question, "answer": answer}
        response_data.append(new_object)  # Here, the new_object is appended to the list
    return response_data

@csrf_exempt
def create_faq (request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        new_faq = FAQ.objects.create(
            question = data["question"],
            answer = data["answer"]
        )
        new_faq.save()
        response_data = chain_faqs()
    return JsonResponse(response_data, safe=False, status = 200)



def frequently_asked_questions(request):
    return JsonResponse(chain_faqs(), safe = False)



@csrf_exempt
def delete_faq(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        try:
            instance = FAQ.objects.get(pk=data["pk"])
            instance.delete()            
            response_data = chain_faqs()
            return JsonResponse(response_data, safe=False, status = 200)
        except FAQ.DoesNotExist:
            return JsonResponse({"message": "That FAQ does not exist in our system."}, safe=False, status = 404)
        
@csrf_exempt
def get_particular_faq(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body);
        try:
            faq = FAQ.objects.get(pk=data["pk"])
            return JsonResponse({"id": faq.pk, "question":faq.question, "answer":faq.answer}, safe=False, status = 200)
        except FAQ.DoesNotExist:
            return JsonResponse({"message": "That FAQ does not exist in our system."}, safe=False, status = 404)


@csrf_exempt
def edit_faq(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        faq = get_object_or_404(FAQ, id=data["id"])
        if faq:
            faq.question = data["question"]
            faq.answer = data["answer"]
            faq.save()
        response_data = chain_faqs()
        return JsonResponse(response_data, safe=False, status = 200)



# TESTIMONIALS, GET: CREATE: DELETE: UPDATE

def chain_testimonials():
    testimonials = Testimonial.objects.all()
    response_data = []  # This initializes an empty list
    for i in range(0, len(testimonials)):
        testimonial = testimonials[i].testimonial
        testimonial_by = testimonials[i].testimonial_by
        pk = testimonials[i].pk
        new_object = {"id":pk,"testimonial": testimonial, "testimonial_by": testimonial_by}
        response_data.append(new_object)  # Here, the new_object is appended to the list
    return response_data

@csrf_exempt
def create_testimonial (request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        new_testimonial = Testimonial.objects.create(
            testimonial = data["question"],
            testimonial_by = data["answer"]
        )
        new_testimonial.save()
        response_data = chain_testimonials()
    return JsonResponse(response_data, safe=False, status = 200)



def testimonials(request):
    return JsonResponse(chain_testimonials(), safe = False)



@csrf_exempt
def delete_testimonial(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        try:
            instance = Testimonial.objects.get(pk=data["pk"])
            instance.delete()            
            response_data = chain_testimonials()
            return JsonResponse(response_data, safe=False, status = 200)
        except Testimonial.DoesNotExist:
            return JsonResponse({"message": "That Testimonial does not exist in our system."}, safe=False, status = 404)
        
@csrf_exempt
def get_particular_testimonial(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body);
        try:
            testimonial = Testimonial.objects.get(pk=data["pk"])
            return JsonResponse({"id": testimonial.pk, "testimonial":testimonial.testimonial, "testimonial_by":testimonial.testimonial_by}, safe=False, status = 200)
        except Testimonial.DoesNotExist:
            return JsonResponse({"message": "ThatTtestimonial does not exist in your system."}, safe=False, status = 404)


@csrf_exempt
def edit_testimonial(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        testimonial = get_object_or_404(Testimonial, id=data["id"])
        if testimonial:
            testimonial.testimonial = data["question"]
            testimonial.testimonial_by = data["answer"]
            testimonial.save()
        response_data = chain_testimonials()
        return JsonResponse(response_data, safe=False, status = 200)

# CRD REACH OUTS: GET, DELETE, CREATE

def chain_reach_outs():
    reach_outs = ReachOut.objects.all()
    all_reach_outs = []
    for reach_out in reach_outs:
        name = reach_out.first_name + ' ' + reach_out.last_name
        reach_outs_dict = {
            "id": reach_out.pk,
            "name": name,
            "email": reach_out.email,
            "phone": reach_out.phone,
            "message": reach_out.message,
            "date": reach_out.created
        } 
        all_reach_outs.append(reach_outs_dict)
    return all_reach_outs


def reach_outs(request):
    data = chain_reach_outs();
    return JsonResponse({"success": True, "data": data}, status = 200)


@csrf_exempt
def delete_reach_out(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            instance = ReachOut.objects.get(pk=data)
            instance.delete()            
            response_data = chain_reach_outs()
            return JsonResponse(response_data, safe=False, status = 200)
        except Testimonial.DoesNotExist:
            return JsonResponse({"message": "That Reach Out does not exist in our system."}, safe=False, status = 404)
        
@csrf_exempt
def create_reach_out(request):
    if request.method == "POST" or request.POST:
        data = json.loads(request.body)
        new_reach_out = ReachOut.objects.create (
            first_name = data["first_name"],
            last_name = data["last_name"],
            email = data["email"],
            phone = data["phone"],
            message = data["message"]
        )
        new_reach_out.save()
        response_data = chain_reach_outs()
    return JsonResponse(response_data, safe=False, status = 200)



class SitemapView(View):
    def get(self, request):
        response = HttpResponse(content_type='application/xml')
        sitemap_content = Sitemap.get_urls()
        response.write(sitemap_content)
        return response