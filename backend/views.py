from django.contrib import messages
from django.http import Http404
from venv import create
from django.shortcuts import render
from rest_framework import generics, status, viewsets
from .getters import getPlayers
from .serializers import PlayerSerializer
from .models import Player
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

from backend import serializers

# Create your views here.
class PlayerView(generics.ListAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()


class ListPlayersView(APIView):
    serializer_class = PlayerSerializer
    queryset = getPlayers()
    for player in queryset:
        name = player['web_name']
        goals = player['goals_scored']
        assists = player['assists']
        team_code = player['team_code']
        points = player['total_points']
        p = Player(web_name = name, goals_scored = goals, assists = assists, team_code = team_code, total_points = points)
        p.save()

    def get(self, request, format=None):
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     queryset = self.get_queryset()
    #     serializer = PlayerSerializer(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)


class PlayerDetailView(APIView):

    def get_object(self, pk):
        try:
            return Player.objects.get(pk=pk)
        except Player.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        player = self.get_object(pk)
        serializer = PlayerSerializer(player)
        return Response(serializer.data)
    
    def delete(self, request, pk, format=None):
        player = self.get_object(pk)
        player.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class DeletePlayersView(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @action(detail=False, methods=['post'])
    def delete_all(self, request):
        Player.objects.all().delete()
        return Response('success')
