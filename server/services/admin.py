from django.contrib import admin
from .models import Service,Sub_Service, SubServiceImage, Orders, Cart, Customers
# Register your models here.

admin.site.register(Service)
admin.site.register(Sub_Service)
admin.site.register(SubServiceImage)
admin.site.register(Orders)
admin.site.register(Customers)
admin.site.register(Cart)