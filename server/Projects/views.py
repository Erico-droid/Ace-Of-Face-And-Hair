from django.shortcuts import render, get_object_or_404
from .models import Project, CustomImage
from django.http import HttpResponse, JsonResponse
import json
from django.http import Http404
from django.core import serializers
import random
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .forms import ProjectForm
from django.db import transaction
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import io
from django.conf import settings
from django.core.files.base import ContentFile
from general.models import Visitor


# Create your views here.

# CRUD OPERATIONS FOR PROJECTS
def fetch_serialized_projects():
    all_projects = []
    projects = Project.objects.all()
    for project in projects:
        images = project.images.all()
        images_arr = []
        if images:
            for image in images:
                images_arr.append(image.image.url)
        serialized_project = {
            'id': project.pk,
            'name': project.name,
            'brief_description': project.brief_description,
            'images':images_arr,
            'created_at': project.created_at.isoformat(),
            'slug': project.slug,
            'view_count': project.viewers.count()
        }
        
        # Get a random image for the project
        project_images = project.images.all()
        if project_images:
            random_image = random.choice(project_images)
            serialized_project['random_image_url'] = random_image.image.url
        else:
            serialized_project['random_image_url'] = None
        all_projects.append(serialized_project)
    return all_projects



def project_list(request):
    if request.method == "GET":
        all_projects = fetch_serialized_projects()
        return JsonResponse(all_projects, safe=False)

@csrf_exempt
def set_project_viewer(request, project_slug):
    if request.method == "POST":
        try:
            project = get_object_or_404(Project, slug = project_slug)
        except Project.DoesNotExist:
            raise Http404("Project does not exist.")
        data = json.loads(request.body)
        try:
            visitor = Visitor.objects.get(visitorSessionName = data["userSession"])
            project.viewers.add(visitor)
        except Project.DoesNotExist:
            raise Http404("Visitor does not exist.")
        return JsonResponse({"success": True}, status=200, safe=False)


def project_detail(request, project_slug):
    if request.method == "GET" or request.GET:
        try:
            project = get_object_or_404(Project, slug = project_slug)
        except Project.DoesNotExist:
            raise Http404("Project does not exist.")
        
        serialized_data = {
            'name': project.name,
            'brief_description': project.brief_description,
            'created_at': project.created_at,
            'slug': project.slug,
            'images': [image.image.url for image in project.images.all()]
        }

        return JsonResponse(serialized_data, safe = True)

def apply_watermark(image_file, logo_file):
    # Open the image
    image = Image.open(image_file).convert('RGBA')

    # Open the logo image and resize it to a desired size
    logo = Image.open(logo_file).convert("RGBA")
    logo_width, logo_height = logo.size
    max_logo_size = min(image.width, image.height) // 2.5
    if logo_width > max_logo_size or logo_height > max_logo_size:
        logo.thumbnail((max_logo_size, max_logo_size))

    # Create a transparent overlay for the watermark
    overlay = Image.new('RGBA', image.size, (0, 0, 0, 0))

    # Calculate the position to place the logo watermark
    padding_bottom = 20  # Adjust the padding value as per your requirements
    x = (image.width - logo.width) // 2
    y = image.height - logo.height - padding_bottom

    # Paste the logo onto the overlay
    overlay.paste(logo, (x, y), logo)

    # Apply the watermark overlay to the image
    watermarked_image = Image.alpha_composite(image, overlay)

    # Enhance the watermark visibility (optional)
    enhancer = ImageEnhance.Brightness(watermarked_image)
    watermarked_image = enhancer.enhance(0.8)  # Adjust brightness level as desired

    # Create a byte stream to save the watermarked image
    watermarked_image_stream = io.BytesIO()
    watermarked_image.save(watermarked_image_stream, format='PNG')

    # Reset the stream position to the beginning
    watermarked_image_stream.seek(0)

    return watermarked_image_stream

@csrf_exempt
def create_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            project = form.save()
            projects = Project.objects.all()

            # Handle the uploaded images
            with transaction.atomic():
                project = form.save()  # Save the project model instance

                # Handle the uploaded images
                for image_file in request.FILES.getlist('images'):
                    watermarked_image_stream = apply_watermark(image_file, settings.LOGO_IMAGE_PATH)
                    image_name = image_file.name
                    image_content = ContentFile(watermarked_image_stream.getvalue())
                    image = CustomImage.objects.create()
                    image.image.save(image_name, image_content, save=True)
                    project.images.add(image)
            
            return JsonResponse({'success': True, 'message': 'Your project is now live!'})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = ProjectForm()
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})


def find_(string, char):
    index = 0
    for i in range(len(string)):
        if (char == string[i]):
            index = i
    arr = ''
    for i in range(len(string)):
        if i < index:
            arr += string[i]
    return arr

def find_png(string):
    index = 0
    for i in range(len(string)):
        if ('.' == string[i]):
            index = i
    arr = ''
    for i in range(len(string)):
        if i < index:
            arr += string[i]
    return arr

def find_slash(string):
    index = 0
    for i in range(len(string)):
        if ('/' == string[i]):
            index = i
    arr = ''
    for i in range(len(string)):
        if i > index:
            arr += string[i]
    return arr


def compare_strings(str1, str2):
    str1 = find_(str1, '_')
    str1 = find_slash(str1)
    str2 = find_png(str2)
    str2 = find_slash(str2)
    str2 = find_(str2, '_')
    print(str1 == str2)
    return str1 == str2


@csrf_exempt
def edit_project(request, project_slug):
    if request.method == "GET" or request.GET:
        try:
            project = get_object_or_404(Project, slug = project_slug)
        except Project.DoesNotExist:
            raise Http404("Project does not exist.")
        
        serialized_data = {
            'name': project.name,
            'brief_description': project.brief_description,
            'created_at': project.created_at,
            'slug': project.slug,
            'images': [image.image.url for image in project.images.all()]
        }
        return JsonResponse(serialized_data, safe = True)
    
    if request.method == "POST" or request.POST:
        form = ProjectForm(request.POST, request.FILES)
        data = dict(request.POST)
        try:
            project = get_object_or_404(Project, slug = project_slug)
        except Project.DoesNotExist:
            raise Http404("Project does not exist.")
       
        # todo: handle the changes in project name and description
        project.name = data["name"][0]
        project.brief_description = data["brief_description"][0]
        
        # todo: handle the files that are being deleted here
        print(data)
        
        try:
            deleted_images = data["deleted_images"]
            images = list(project.images.all())
            #str1 is for the image coming from the db while str2 is for images coming from the frontend
            for i in range(len(images)):
                image_path = str(images[i].image)
                image_path = find_png(image_path)
                image_path = find_slash(image_path)
                for j in range(len(deleted_images)):
                    delete_image = find_png(deleted_images[j])
                    delete_image = find_slash(delete_image)
                    if (delete_image == image_path):
                        images[i].delete()
        except KeyError:
            pass


        # handle the watermarking and linking of new images here
        for image_file in request.FILES.getlist('images'):
                    watermarked_image_stream = apply_watermark(image_file, settings.LOGO_IMAGE_PATH)
                    image_name = image_file.name
                    image_content = ContentFile(watermarked_image_stream.getvalue())
                    image = CustomImage.objects.create()
                    image.image.save(image_name, image_content, save=True)
                    project.images.add(image)

        # handle the save of the project that is being edited here
        project.save()
        serialized_data = {
            'name': project.name,
            'brief_description': project.brief_description,
            'created_at': project.created_at,
            'slug': project.slug,
            'images': [image.image.url for image in project.images.all()]
        }

        return JsonResponse({'success': True, 'message': 'Your project has been updated successfuly!', 'data': serialized_data})

@csrf_exempt
def delete_project(request, project_slug):
    if request.method == "DELETE":
        message = ""
        try:
            project = get_object_or_404(Project, slug = project_slug)
            project.delete()
            all_projects = fetch_serialized_projects()
            return JsonResponse({"success":True, "message":"The project has been deleted.", "data": all_projects})
        except:
            message = "Project doesn't exist"
        return JsonResponse({"success":False, "message":message})