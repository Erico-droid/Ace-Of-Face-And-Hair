from django.db import models
from django.utils.text import slugify
from general.models import Visitor

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
    

class Cart(models.Model):
    code = models.CharField(max_length=508, null=True)
    created = models.DateTimeField(auto_now_add=True)
    services = models.ManyToManyField(Sub_Service, blank=True, related_name="sub_services_orders")
    visitor = models.OneToOneField(Visitor, on_delete=models.CASCADE, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.code)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = "Cart"
        verbose_name_plural = "Carts"

class Orders(models.Model):
    code = models.CharField(max_length=508, null=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    extra_notes = models.TextField(null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.code)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

class Customers(models.Model):
    order = models.ForeignKey(Orders, on_delete=models.CASCADE, blank=True, null=True)
    first_name = models.CharField(max_length=254)
    last_name = models.CharField(max_length=254)
    phone_number = models.CharField(max_length=254)
    email = models.EmailField()

    def __str__(self):
        return self.first_name + "" + self.last_name

    class Meta:
        verbose_name = "Customer"
        verbose_name_plural = "Customers"