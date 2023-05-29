from django.shortcuts import render, get_object_or_404
from .models import Project
from django.http import HttpResponse, JsonResponse
import json
from django.http import Http404
from django.core import serializers
import random


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