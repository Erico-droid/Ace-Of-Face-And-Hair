# Generated by Django 4.2.3 on 2023-07-15 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0003_dailyvisit'),
    ]

    operations = [
        migrations.AddField(
            model_name='visitor',
            name='visit_darkmode_state',
            field=models.BooleanField(default=False),
        ),
    ]
