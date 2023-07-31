from django.contrib import admin
from .models import Service,Sub_Service, SubServiceImage
# Register your models here.

admin.site.register(Service)
admin.site.register(Sub_Service)
admin.site.register(SubServiceImage)