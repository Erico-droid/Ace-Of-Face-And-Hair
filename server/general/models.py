from django.db import models

# Create your models here.
class FAQ(models.Model):
    question = models.CharField(max_length = 200)
    answer = models.CharField(max_length = 500)

    def __str__(self):
        return self.question

# Keep Record of guys visiting the site.

