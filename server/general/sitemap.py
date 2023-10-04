# myapp/sitemaps.py

from django.contrib import sitemaps
from django.urls import reverse
from django.conf import settings
from Projects.models import Project

class AFHSitemap(sitemaps.Sitemap):
    priority = 1

    def items(self):
        # Define the list of URLs you want to include in the sitemap
        return Project.objects.all()
    
    def location(self, item):
        # Use the model's get_absolute_url method to generate the URL
        return item.get_absolute_url()
