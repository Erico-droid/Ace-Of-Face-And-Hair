# Generated by Django 4.2.3 on 2023-09-13 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0006_remove_orders_order_code_remove_orders_services_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
