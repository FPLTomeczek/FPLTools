from django.contrib import admin
from .models import Player

# Register your models here.
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('web_name', 'goals_scored', 'assists', 'team_code', 'total_points')

admin.site.register(Player, PlayerAdmin)