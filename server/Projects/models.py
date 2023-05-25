from django.db import models
from django.utils.text import slugify

# Create your models here.

class Image(models.Model):
    image = models.ImageField(upload_to='images/')


    
class Project (models.Model):
    name = models.CharField(max_length=200)
    brief_description = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=255, unique=True)
    images = models.ManyToManyField(Image)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
