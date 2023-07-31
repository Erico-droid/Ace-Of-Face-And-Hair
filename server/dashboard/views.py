from django.shortcuts import render
from Projects.models import Project, CustomImage
from django.http import HttpResponse, JsonResponse

# Create your views here.
# main dashboard
def provideProjects(request):
    if request.method == "GET":
        projects = Project.objects.all()
        all_projects = []
        images = []
        for project in projects:
            serialized_project = {
                'name': project.name,
                'brief_description': project.brief_description,
                'created_at': project.created_at.isoformat(),
                'slug': project.slug,
            }
            all_projects.append(serialized_project)
    
    return JsonResponse(all_projects, safe=False)










# services