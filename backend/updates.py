from .getters import getPlayers, getFPLTeamByID
from .models import Player, UserFplPicks
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

def saveUserFPLPicks(id):
        queryset = getFPLTeamByID(id, 16)
        try:
            user_picks = UserFplPicks.objects.get(id = id)
        except ObjectDoesNotExist:
            p1 = Player.objects.get(id = queryset[0]['element'])
            p1_pos = queryset[0]['position']
            p1_cpt = queryset[0]['is_captain']
            p1_vcpt = queryset[0]['is_vice_captain']
            p2 = Player.objects.get(id = queryset[1]['element'])
            p2_pos = queryset[1]['position']
            p2_cpt = queryset[1]['is_captain']
            p2_vcpt = queryset[1]['is_vice_captain']
            p3 = Player.objects.get(id = queryset[2]['element'])
            p3_pos = queryset[2]['position']
            p3_cpt = queryset[2]['is_captain']
            p3_vcpt = queryset[2]['is_vice_captain']
            p4 = Player.objects.get(id = queryset[3]['element'])
            p4_pos = queryset[3]['position']
            p4_cpt = queryset[3]['is_captain']
            p4_vcpt = queryset[3]['is_vice_captain']
            p5 = Player.objects.get(id = queryset[4]['element'])
            p5_pos = queryset[4]['position']
            p5_cpt = queryset[4]['is_captain']
            p5_vcpt = queryset[4]['is_vice_captain']
            p6 = Player.objects.get(id = queryset[5]['element'])
            p6_pos = queryset[5]['position']
            p6_cpt = queryset[5]['is_captain']
            p6_vcpt = queryset[5]['is_vice_captain']
            p7 = Player.objects.get(id = queryset[6]['element'])
            p7_pos = queryset[6]['position']
            p7_cpt = queryset[6]['is_captain']
            p7_vcpt = queryset[6]['is_vice_captain']
            p8 = Player.objects.get(id = queryset[7]['element'])
            p8_pos = queryset[7]['position']
            p8_cpt = queryset[7]['is_captain']
            p8_vcpt = queryset[7]['is_vice_captain']
            p9 = Player.objects.get(id = queryset[8]['element'])
            p9_pos = queryset[8]['position']
            p9_cpt = queryset[8]['is_captain']
            p9_vcpt = queryset[8]['is_vice_captain']
            p10 = Player.objects.get(id = queryset[9]['element'])
            p10_pos = queryset[9]['position']
            p10_cpt = queryset[9]['is_captain']
            p10_vcpt = queryset[9]['is_vice_captain']
            p11 = Player.objects.get(id = queryset[10]['element'])
            p11_pos = queryset[10]['position']
            p11_cpt = queryset[10]['is_captain']
            p11_vcpt = queryset[10]['is_vice_captain']
            p12 = Player.objects.get(id = queryset[11]['element'])
            p12_pos = queryset[11]['position']
            p12_cpt = queryset[11]['is_captain']
            p12_vcpt = queryset[11]['is_vice_captain']
            p13 = Player.objects.get(id = queryset[12]['element'])
            p13_pos = queryset[12]['position']
            p13_cpt = queryset[12]['is_captain']
            p13_vcpt = queryset[12]['is_vice_captain']
            p14 = Player.objects.get(id = queryset[13]['element'])
            p14_pos = queryset[13]['position']
            p14_cpt = queryset[13]['is_captain']
            p14_vcpt = queryset[13]['is_vice_captain']
            p15 = Player.objects.get(id = queryset[14]['element'])
            p15_pos = queryset[14]['position']
            p15_cpt = queryset[14]['is_captain']
            p15_vcpt = queryset[14]['is_vice_captain']
            user_picks = UserFplPicks(id = id,
            p1 = p1, p1_pos = p1_pos, p1_cpt = p1_cpt, p1_vcpt = p1_vcpt,
            p2 = p2, p2_pos = p2_pos, p2_cpt = p2_cpt, p2_vcpt = p2_vcpt,
            p3 = p3, p3_pos = p3_pos, p3_cpt = p3_cpt, p3_vcpt = p3_vcpt,
            p4 = p4, p4_pos = p4_pos, p4_cpt = p4_cpt, p4_vcpt = p4_vcpt,
            p5 = p5, p5_pos = p5_pos, p5_cpt = p5_cpt, p5_vcpt = p5_vcpt,
            p6 = p6, p6_pos = p6_pos, p6_cpt = p6_cpt, p6_vcpt = p6_vcpt,
            p7 = p7, p7_pos = p7_pos, p7_cpt = p7_cpt, p7_vcpt = p7_vcpt,
            p8 = p8, p8_pos = p8_pos, p8_cpt = p8_cpt, p8_vcpt = p8_vcpt,
            p9 = p9, p9_pos = p9_pos, p9_cpt = p9_cpt, p9_vcpt = p9_vcpt,
            p10 = p10, p10_pos = p10_pos, p10_cpt = p10_cpt, p10_vcpt = p10_vcpt,
            p11 = p11, p11_pos = p11_pos, p11_cpt = p11_cpt, p11_vcpt = p11_vcpt,
            p12 = p12, p12_pos = p12_pos, p12_cpt = p12_cpt, p12_vcpt = p12_vcpt,
            p13 = p13, p13_pos = p13_pos, p13_cpt = p13_cpt, p13_vcpt = p13_vcpt,
            p14 = p14, p14_pos = p14_pos, p14_cpt = p14_cpt, p14_vcpt = p14_vcpt,
            p15 = p15, p15_pos = p15_pos, p15_cpt = p15_cpt, p15_vcpt = p15_vcpt
            )
            user_picks.save()
       