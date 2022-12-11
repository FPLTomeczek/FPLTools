# Generated by Django 3.2.5 on 2022-12-06 09:52

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_alter_player_team_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='position',
            field=models.FloatField(null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(4)]),
        ),
        migrations.AddField(
            model_name='player',
            name='price',
            field=models.FloatField(null=True, validators=[django.core.validators.MaxValueValidator(200)]),
        ),
    ]