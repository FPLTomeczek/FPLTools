from .getters import getPlayers
from .models import Player
from django.core.exceptions import ObjectDoesNotExist

def setTeamCode(value):
    switcher = {
        1 : "Man United",
        3 : "Arsenal",
        7 : "Aston Villa",
        8 : "Chelsea",
        91 : "Bournemouth",
        94 : "Brentford",
        36 : "Brighton",
        31 : "Crystal Palace",
        11 : "Everton",
        54 : "Fulham",
        2 : "Leeds",
        13 : "Leicester",
        14 : "Liverpool",
        43 : "Man City",
        4 : "Newcastle",
        17 : "Nottingham Forest",
        20 : "Southampton",
        6 : "Spurs",
        21 : "West Ham",
        39 : "Wolverhampton"
    }
    return switcher.get(value, 'No Club')

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
            team_code = setTeamCode(player['team_code'])
            points = player['total_points']
            p = Player(id=id, web_name = name, goals_scored = goals, assists = assists, team_code = team_code, total_points = points)
            p.save()