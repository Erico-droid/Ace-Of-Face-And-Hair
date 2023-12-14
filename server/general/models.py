from django.db import models

# Create your models here.
class FAQ(models.Model):
    question = models.CharField(max_length = 200)
    answer = models.CharField(max_length = 500)

    def __str__(self):
        return self.question

# Keep Record of guys visiting the site.
class Visitor (models.Model):
    visitorSessionName = models.CharField(max_length=250)
    visit_date = models.DateField(auto_now_add=True)
    visit_darkmode_state = models.BooleanField(default=False)
    visitor_remote_add = models.CharField(null=True, blank=True)

    def __str__(self):
        return self.visitorSessionName
    
    
class DailyVisit(models.Model):
    user = models.ForeignKey(Visitor, on_delete = models.CASCADE)
    visit_date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.visitorSessionName} - {self.visit_date}"
    
class Testimonial(models.Model):
    testimonial = models.CharField(max_length=300)
    testimonial_by = models.CharField(max_length=20)
    def __str__(self):
        return self.testimonial

class ReachOut(models.Model):
    first_name = models.CharField(max_length=320)
    last_name = models.CharField(max_length=320)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
 