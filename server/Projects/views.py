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

# Create your views here.


def project_list(request):
    if request.method == "GET":
        projects = Project.objects.all()
        all_projects = []
        for project in projects:
            serialized_project = {
                'name': project.name,
                'brief_description': project.brief_description,
                'created_at': project.created_at.isoformat(),
                'slug': project.slug,
            }
            
            # Get a random image for the project
            project_images = project.images.all()
            if project_images:
                random_image = random.choice(project_images)
                serialized_project['random_image_url'] = random_image.image.url
            else:
                serialized_project['random_image_url'] = None
            
            all_projects.append(serialized_project)
        
        return JsonResponse(all_projects, safe=False)
    

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
            print(projects)

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