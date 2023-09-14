from django.shortcuts import render
from Projects.models import Project, CustomImage
from django.http import HttpResponse, JsonResponse
from general.models import DailyVisit, Visitor
import datetime

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

# yyyy-mm-dd
def provideAnalysis(request):
    todays_visitors = 0
    this_months_visitors = 0
    this_years_visitors = 0
    last_years_visitors = 0
    last_months_visitors = 0
    yesterday_visits = 0
    this_weeks_visits = 0
    last_weeks_visits = 0
    if request.method == "GET":
        visitors = DailyVisit.objects.all()
        for visitor in visitors:
            lastyear = datetime.date.today().year - 1
            today_year = datetime.date.today().year
            today_month = datetime.date.today().month
            today_day = datetime.date.today().day
            visitor_year = visitor.visit_date.year
            visitor_month = visitor.visit_date.month
            visitor_day = visitor.visit_date.day
            last_month = datetime.date.today().month - 1
            yesterday = datetime.date.today().day - 1            
            today_week = datetime.date.today().isocalendar().week
            last_week = datetime.date.today().isocalendar().week - 1
            if (visitor_day == today_day and visitor_month == today_month and visitor_year == today_year):
                todays_visitors += 1
            if (visitor_month == today_month and visitor_year == today_year):
                this_months_visitors += 1            
            if (visitor_year == today_year):
                this_years_visitors += 1
            if (visitor_year == lastyear):
                last_years_visitors += 1
            if (visitor_month == last_month and visitor_year == today_year):
                last_months_visitors += 1
            if (visitor_day == yesterday and visitor_month == today_month and visitor_year == today_year):
                yesterday_visits += 1
            if (visitor.visit_date.isocalendar().week == today_week and visitor.visit_date.year == today_year):
                this_weeks_visits += 1
            if (visitor.visit_date.isocalendar().week == last_week and visitor.visit_date.year == today_week):
                last_weeks_visits += 1


        return JsonResponse({"todays_visits": 
                             todays_visitors, 
                             "thismonths_visits":
                            this_months_visitors,
                              "thisyears_visits": 
                              this_years_visitors, 
                              "lastyears_visits": 
                              last_years_visitors, 
                              "last_months_visits": 
                              last_months_visitors,
                              "yesterday_visits":
                              yesterday_visits,
                              "thisweeks_visits": 
                              this_weeks_visits,
                              "lastweek_visits":
                              last_weeks_visits
                              }, safe=False)











# services