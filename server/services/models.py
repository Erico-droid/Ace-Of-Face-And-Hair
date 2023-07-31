from django.db import models
from django.utils.text import slugify

class Service(models.Model):
    name = models.CharField(max_length=254)
    service_description = models.TextField(max_length=508)
    created = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"


class SubServiceImage(models.Model):
    image = models.ImageField(upload_to='sub_service-images/')

class Sub_Service(models.Model):
    name = models.CharField(max_length=254)
    sub_service_description = models.TextField(max_length=508)
    created = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    image = models.OneToOneField(SubServiceImage, blank=True, related_name="sub_service_image", on_delete=models.CASCADE)
    services = models.ManyToManyField(Service, blank=True, related_name="sub_services", null = True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Sub Service"
        verbose_name_plural = "Sub Services"
