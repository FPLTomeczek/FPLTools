# Generated by Django 3.2.5 on 2023-01-03 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_gameweek'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='chance_of_playing_next_round',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='player',
            name='news',
            field=models.CharField(default='', max_length=300),
        ),
    ]
