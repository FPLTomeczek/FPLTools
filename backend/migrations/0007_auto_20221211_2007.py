# Generated by Django 3.2.5 on 2022-12-11 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_alter_player_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfplpicks',
            name='bank_value',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='userfplpicks',
            name='team_value',
            field=models.FloatField(default=0),
        ),
    ]
