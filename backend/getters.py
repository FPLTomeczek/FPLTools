import requests

def getPlayer():
    base_url = 'https://fantasy.premierleague.com/api/'
    r = requests.get(base_url+'bootstrap-static/').json()
    player = r['elements'][0]
    print(player['web_name'], player['goals_scored'], player['assists'], player['team_code'], player['total_points'])     
    return player  

def getPlayers():
    base_url = 'https://fantasy.premierleague.com/api/'
    r = requests.get(base_url+'bootstrap-static/').json()
    players = r['elements']
    return players

def getFPLTeamByID(id, curr_week):
        team_id = id
        current_week = curr_week
        url = "https://fantasy.premierleague.com/api/entry/"+str(team_id)+"/event/"+str(current_week)+"/picks/"
        my_team_data = requests.get(url).json() 
        my_team_data = my_team_data['picks']
        return my_team_data   

def getTeamBankValue(id, curr_week):
    team_id = id
    current_week = curr_week
    url = "https://fantasy.premierleague.com/api/entry/"+str(team_id)+"/event/"+str(current_week)+"/picks/"
    my_team_data = requests.get(url).json()
    my_team_data = my_team_data['entry_history']
    value = my_team_data['value']
    bank = my_team_data['bank']
    return value, bank

getTeamBankValue(7770, 16)