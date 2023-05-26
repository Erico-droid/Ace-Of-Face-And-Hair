from django.shortcuts import render, get_object_or_404
from .models import Project
from django.http import HttpResponse, JsonResponse
import json
from django.http import Http404
from django.core import serializers


# Create your views here.


def project_list(request):
    if request.method == "GET":
        projects = Project.objects.all()
        projects = list(projects.values())
        all_projects = []
        for project in projects:
            project['created_at'] = project['created_at'].isoformat()
            all_projects.append(project)
        
        return JsonResponse(all_projects, safe = False)
    

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
        'images': [image.url for image in project.images.all()]
        }
        return JsonResponse(serialized_data, safe = True)