from django.contrib import admin
from .models import FAQ, Visitor, DailyVisit, Testimonial, ReachOut
# Register your models here.

admin.site.register(FAQ)
admin.site.register(Visitor)
admin.site.register(DailyVisit)
admin.site.register(Testimonial)
admin.site.register(ReachOut)
