# Generated by Django 3.2.5 on 2022-12-11 19:04

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20221206_2334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='price',
            field=models.FloatField(null=True, validators=[django.core.validators.MaxValueValidator(200)]),
        ),
    ]
