from django.shortcuts import render, get_object_or_404
from .models import Service, SubServiceImage, Sub_Service
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
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

@csrf_exempt
def create_service(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            service = Service.objects.create(
                name = data["name"],
                service_description = data["service_description"]            
            )
            service.save()
            data = chain_all_services()
            return JsonResponse({"data": data, "sucess": True})
        except:
            return JsonResponse({"message": "There was an unexpected error", "success": False}, status = 500)
    return JsonResponse({"message":"request method not accepted in this server"}, status = 403)


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
                "image": sub_service.image
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
            service.name = data["name"]
            service.service_description = data["service_description"]
            sub_services = service.sub_services.all()
            try:
                deleted_sub_services = data["deleted_sub_services"]
                for sub_service in sub_services:
                    for deleted in deleted_sub_services:
                        if sub_service.name == deleted:
                            sub_service.delete()
            except KeyError:
                pass
            service.save()
            
            all_sub_services = []
            for sub_service in service.sub_services.all():
                sub_service_dict = {
                    "name": sub_service.name,
                    "sub_service_description": sub_service.sub_service_description,
                    "created": sub_service.created,
                    "slug": sub_service.slug,
                    "id": sub_service.pk,
                    "image": sub_service.image
                }
                all_sub_services.append(sub_service_dict)

            service_dict = {
                "name": service.name,
                "service_description": service.service_description,
                "slug": service.slug,
                "created": service.created,
                "sub_services": all_sub_services
            }

            return JsonResponse({"success": True, "data": service_dict}, status = 200)
        

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


def get_sub_services(request):
    if request.method == "GET":
        data = chain_sub_services()
        return JsonResponse({"success":True, "data":data}, status = 200)
    else:
        return JsonResponse({"message":"request method not accepted in this server"}, status = 403)
    
@csrf_exempt
def create_sub_service(request):
    if request.method == "POST":
        data = dict(request.POST)
        try:
            image = SubServiceImage.objects.create()
            image_file = request.FILES.getlist('image')[0]
            image.image.save(str(image_file), image_file ,save = True)

            sub_service = Sub_Service.objects.create(
                name = data["name"],
                sub_service_description = data["sub_service_description"],
                image = image
            )
            services = json.loads(str(data["services"][0]));
            for i in range(len(services)):
                try:
                    # send the service data in dict
                    service = get_object_or_404(Service, slug = services[i]["service_slug"])
                    sub_service.services.add(service)
                except Service.DoesNotExist:
                    return JsonResponse({"success":False, "message": "That sub service does not exist in your server"}, status = 404)
            
            return JsonResponse({"success":True, "data": chain_sub_services(), "message": "The sub service has been created successfuly"}, status = 404)
        except:
            return JsonResponse({"success":False, "message": "There was an unexpected error in your server"}, status = 500)
    else:
        return JsonResponse({"success":False, "message": "That request is not accepted in this server"}, status = 404)
            # subservice.objects.add service or services


def delete_sub_service(request, sub_service_slug):
    try:
        sub_service = get_object_or_404(Sub_Service, slug = sub_service_slug)
    except Sub_Service.DoesNotExist:
        return JsonResponse({"success":False, "message": "That service does not exist in your server"}, status = 404)
    
    if request.method == "DELETE":
        sub_service.delete()
        return JsonResponse({"success":True, "data": chain_sub_services(), "message":"The sub service has been deleted"}, status = 404)
    else:
        return JsonResponse({"success":False, "message": "That request is not accepted in this server"}, status = 404)


def edit_sub_service(request, sub_service_slug):
    try:
        sub_service = get_object_or_404(Sub_Service, slug = sub_service_slug)
    except Sub_Service.DoesNotExist:
        return JsonResponse({"success":False, "message": "That service does not exist in your server"}, status = 404)
    
    if request.method == "GET":
        sub_service_dict = {
            "name": sub_service.name,
            "sub_service_description": sub_service.sub_service_description,
            "created": sub_service.created,
            "slug": sub_service.slug,
            "id": sub_service.pk,
            "image": sub_service.image.image.url
        }

        return JsonResponse({"data": sub_service_dict, "success": True}, status = 200)
    
    # if request.method == "POST":
    #     data = json.loads(request.boy)
    #     sub_service.name = data["name"]
    #     sub_service.sub_service_description = data["sub_service_description"]
    #     sub_service.image

    # get on from here
