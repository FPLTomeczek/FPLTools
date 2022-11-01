from .getters import getPlayers
from .models import Player
from django.core.exceptions import ObjectDoesNotExist

def savePlayers():
    queryset = getPlayers()
    for player in queryset:
        try:
            p = Player.objects.get(id = player['id'])
        except ObjectDoesNotExist:
            id = player['id']
            name = player['web_name']
            goals = player['goals_scored']
            assists = player['assists']
            team_code = player['team_code']
            points = player['total_points']
            p = Player(id=id, web_name = name, goals_scored = goals, assists = assists, team_code = team_code, total_points = points)
            p.save()