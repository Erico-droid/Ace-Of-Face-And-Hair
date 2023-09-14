# Generated by Django 4.2.3 on 2023-09-13 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0006_reachout'),
        ('Projects', '0004_project_views'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='views',
        ),
        migrations.AddField(
            model_name='project',
            name='viewers',
            field=models.ManyToManyField(blank=True, related_name='project_viewers', to='general.visitor'),
        ),
    ]
