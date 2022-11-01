from dataclasses import fields
from rest_framework import serializers
from .models import Player, UserFplPicks

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'web_name', 'goals_scored', 'assists', 'team_code', 'total_points')

class UserFplPicksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFplPicks
        fields = '__all__'