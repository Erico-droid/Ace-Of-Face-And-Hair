from django.shortcuts import render, get_object_or_404
from .models import Service, SubServiceImage, Sub_Service, Orders, Customers
from django.http import HttpResponse, JsonResponse, Http404
import json
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.core.serializers import serialize
import random
# Create your views here.

# CRUD OPERATIONS FOR SERVICES: GET, POST, DELETE, UPDATE

def chain_all_services():
    services = Service.objects.all()
    all_services = []
    for service in services:
        sub_services = []
        for sub_service in service.sub_services.all():
            sub_service_object = {
                "name": sub_service.name,
                "sub_service_description": sub_service.sub_service_description,
                "created": sub_service.created,
                "slug": sub_service.slug,
                "image": sub_service.image.image.url
            }
            sub_services.append(sub_service_object)
        service_object = {
            "name": service.name,
            "service_description": service.service_description,
            "created": service.created,
            "slug": service.slug,
            "sub_services": sub_services
        }
        all_services.append(service_object)
    return all_services


def get_services_and_sub_services(request):
    if request.method == "GET":
        data = chain_all_services()
        return JsonResponse({"data":data, "success":True}, status = 200)
    return JsonResponse({"message":"request method not accepted in this server"}, status = 403)
# C
@csrf_exempt
def create_service(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            service = Service.objects.create(
                name = data["categoryName"],
                service_description = data["categoryDescription"]            
            )
            service.save()
            data = chain_all_services()
            return JsonResponse({"data": data, "sucess": True, "message":"Your category was created successfuly"})
        except:
            return JsonResponse({"message": "There was an unexpected error", "success": False}, status = 500)
    return JsonResponse({"message":"request method not accepted in this server"}, status = 403)

# E
@csrf_exempt
def edit_service(request, service_slug):
    try:
        service = get_object_or_404(Service, slug = service_slug)
    except Service.DoesNotExist:
        return JsonResponse({"success":False, "message": "That service does not exist in your server"}, status = 404)
    
    if request.method == "GET":
        all_sub_services = []
        for sub_service in service.sub_services.all():
            sub_service_dict = {
                "name": sub_service.name,
                "sub_service_description": sub_service.sub_service_description,
                "created": sub_service.created,
                "slug": sub_service.slug,
                "id": sub_service.pk,
                "image": sub_service.image.image.url
            }
            all_sub_services.append(sub_service_dict)

        service_dict = {
            "name": service.name,
            "service_description": service.service_description,
            "slug": service.slug,
            "created": service.created,
            "sub_services": all_sub_services
        }


        return JsonResponse({"data": service_dict, "success":True},status = 200)
    
    if request.method == "POST":
        data = json.loads(request.body)
        if data:
            service.name = data["categoryName"]
            service.service_description = data["categoryDescription"]
            service.save()
            data = chain_all_services()
            return JsonResponse({"data": data, "sucess": True, "message":"Your category was updated successfuly"})
        
# D
@csrf_exempt
def delete_service(request, service_slug):
    try:
        service = get_object_or_404(Service, slug = service_slug)
    except Service.DoesNotExist:
        return JsonResponse({"success":False, "message": "That service does not exist in your server"}, status = 404)
    if request.method == "DELETE":
        service.delete()
        data = chain_all_services()
        return JsonResponse({'success':True, 'data':data, 'message':f'The service {(service.name)} has been deleted successfuly'}, status = 200)
    return JsonResponse({"message":"request method not accepted in this server"}, status = 403)



# CRUD OPERATIONS FOR SUB_SERVICES: GET, POST, DELETE, UPDATE

def chain_sub_services():
    sub_services = Sub_Service.objects.all()
    all_sub_services = []
    for sub_service in sub_services:
        services = []
        for service in sub_service.services.all():
            service_dict = {
                "name": service.name,
                "created": service.created,
                "service_description": service.service_description,
                "slug": service.slug   
            }
            services.append(service_dict)
        sub_service_dict = {
            "name": sub_service.name,
            "sub_service_description": sub_service.sub_service_description,
            "created": sub_service.created,
            "slug": sub_service.slug,
            "image": sub_service.image.image.url,
            "services": services
        }
        all_sub_services.append(sub_service_dict)
    return all_sub_services

# R
def get_sub_services(request):
    if request.method == "GET":
        data = chain_sub_services()
        return JsonResponse({"success":True, "data":data}, status = 200)
    else:
        return JsonResponse({"message":"request method not accepted in this server"}, status = 403)

# C
@csrf_exempt
def create_sub_service(request):
    if request.method == "POST":
        data = request.POST

        try:
            image = SubServiceImage.objects.create()
            image_file = request.FILES.getlist('image')[0]
            image.image.save(str(image_file), image_file ,save = True)
            
            sub_service = Sub_Service.objects.create(
                name = data.get("name"),
                sub_service_description = data.get("sub_service_description"),
                image = image
            )
            
            services = json.loads(data.get("services"))
            for i in range(len(services)):
                try:
                    service = get_object_or_404(Service, slug = services[i])
                    sub_service.services.add(service)
                except Service.DoesNotExist:
                    return JsonResponse({"success":False, "message": "That service does not exist in your server"}, status = 404)
            
            return JsonResponse({"success":True, "data": chain_sub_services(), "message": "The service has been created successfuly"}, status = 200)
        except:
            return JsonResponse({"success":False, "message": "There was an unexpected error in your server"}, status = 500)
    else:
        return JsonResponse({"success":False, "message": "That request is not accepted in this server"}, status = 404)
            # subservice.objects.add service or services

# D
@csrf_exempt
def delete_sub_service(request, sub_service_slug):
    try:
        sub_service = get_object_or_404(Sub_Service, slug = sub_service_slug)
    except Sub_Service.DoesNotExist:
        return JsonResponse({"success":False, "message": "That service does not exist in your server"}, status = 404)
    
    if request.method == "DELETE":
        sub_service.delete()
        return JsonResponse({"success":True, "data": chain_sub_services(), "message":"The service has been deleted"}, status = 200)
    else:
        return JsonResponse({"success":False, "message": "That request is not accepted in this server"}, status = 403)

# U
@csrf_exempt
def edit_sub_service(request, sub_service_slug):
    try:
        sub_service = get_object_or_404(Sub_Service, slug = sub_service_slug)
    except Sub_Service.DoesNotExist:
        return JsonResponse({"success":False, "message": "That service does not exist in your server"}, status = 404)
    
    if request.method == "GET":
        services_arr = []
        for service in sub_service.services.all():
            services_arr.append(serialize('json', [service]))
            
        sub_service_data = {
            "name": sub_service.name,
            "sub_service_description": sub_service.sub_service_description,
            "created": sub_service.created,
            "slug": sub_service.slug,
            "id": sub_service.pk,
            "image": sub_service.image.image.url,
            "services": services_arr
        }
        
        return JsonResponse({"data": sub_service_data, "success": True}, status = 200)
    
    if request.method == "POST":
        data = request.POST
        if not request.FILES.get('image') == None:

            # handle image here
            new_customImage = SubServiceImage.objects.create(
                image = request.FILES.get('image')
            )
            new_customImage.save()

            sub_service.image = new_customImage
        

        # Extract values from QueryDict
        name = data.get('name')
        sub_service_description = data.get('sub_service_description')
        services_list = json.loads(data.get('services'))
        
        for service in Service.objects.all():
            for service_slug in services_list:
                if service.slug == service_slug:
                    curr_service = get_object_or_404(Service, slug = service.slug)
                    sub_service.services.add(curr_service)
        sub_service.name = name
        sub_service.sub_service_description = sub_service_description
         
        # handle removed subservices
        removed_services = json.loads(data.get("removed_services"))
        for service in sub_service.services.all():
            for service2 in removed_services:
                if (service.slug == service2):
                    curr_service = get_object_or_404(Service, slug = service.slug)
                    sub_service.services.remove(curr_service)
        
        
        sub_service.save()
        return JsonResponse({"success":True, "data": chain_sub_services(), "message": "The service has been updated successfuly"}, status = 200)
        

# orders, carts and customers CRUD Operations

def chain_orders():
    orders = Orders.objects.all()
    all_orders = []
    customerX = []
    for order in orders:
        services = []
        for service in order.services.all():
            services.append(serialize('json', [service]))
        for customer in Customers.objects.all():
            if customer.order == order:
                customerX = serialize('json', [customer])

        order_dict = {
            "code": order.code,
            "created": order.created,
            "slug": order.slug,
            "sub_services": services,
            "extra_notes": order.extra_notes,
            "location": order.location,
            'customer': customerX
        }
        all_orders.append(order_dict)
    return all_orders

def get_orders(request):
    if request.method == "GET":
        data = chain_orders()
        return JsonResponse({"success":True, "data":data}, status = 200)
    else:
        return JsonResponse({"message":"request method not accepted in this server"}, status = 403)

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        payload = request.body
        data = json.loads(payload)
        characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                      'm','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2'
                      ,'3','4','5','6','7','8','9','0','#','@','$']
        threshold = 28
        order_code = []
        for i in range(threshold - 1):
            rand = random.randint(0, len(characters) - 1)
            order_code.append(characters[rand])
        order_code = ''.join(order_code)
        new_order = Orders.objects.create(
            code = order_code,
            extra_notes = data["additionalNotes"],
            location = data["location"],
            date = data["date"]
        )
        services_slug = data["selectedServices"]
        services = Sub_Service.objects.all()
        for service in services:
            for slug in services_slug:
                if (slug == service.slug):
                    new_order.services.add(service)
        new_order.save()

        # create the customer
        new_customer = Customers.objects.create(
            order = new_order,
            first_name = data["firstName"],
            last_name = data["lastName"],
            email = data["email"],
            phone_number = data["phoneNumber"]
        )
        new_customer.save()

    return JsonResponse({"message":"Your appointment has been received on our side. Our team shall call you in a moment."}, status = 200, safe = False)
