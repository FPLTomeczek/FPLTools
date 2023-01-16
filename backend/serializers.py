from dataclasses import fields
from rest_framework import serializers
from .models import Player, UserFplPicks, Gameweek

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class UserFplPicksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFplPicks
        fields = '__all__'

class GameweekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameweek
        fields = "__all__"