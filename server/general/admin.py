from django.contrib import admin
from .models import FAQ, Visitor, DailyVisit
# Register your models here.

admin.site.register(FAQ)
admin.site.register(Visitor)
admin.site.register(DailyVisit)
