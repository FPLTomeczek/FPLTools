from django.test import TestCase
from getters import getPlayer
from models import Player
# Create your tests here.
def create_player():
    player = getPlayer()
    name = player['web_name']
    goals = player['goals_scored']
    assists = player['assists']
    team_code = player['team_code']
    points = player['total_points']
    p = Player(web_name = name, goals_scored = goals, assists = assists, team_code = team_code, total_points = points)
    p.save()
    print(name)
    
def create_player(player):
    name = player['web_name']
    goals = player['goals_scored']
    assists = player['assists']
    team_code = player['team_code']
    points = player['total_points']
    p = Player(web_name = name, goals_scored = goals, assists = assists, team_code = team_code, total_points = points)
    p.save()
    print(name)

create_player()