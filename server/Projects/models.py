from django.db import models
from django.utils.text import slugify
from general.models import Visitor
from django.urls import reverse

# Create your models here.

class CustomImage(models.Model):
    image = models.ImageField(upload_to='images/')



class Project (models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    brief_description = models.TextField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    images = models.ManyToManyField(CustomImage, blank=True, related_name="images")
    viewers = models.ManyToManyField(Visitor, blank=True, related_name='project_viewers')

    def get_absolute_url(self):
        return reverse('project_detail', args=[str(self.slug)])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
