from django.http import Http404
from venv import create
from django.shortcuts import render
from rest_framework import generics, status, viewsets
from .serializers import PlayerSerializer, UserFplPicksSerializer
from .models import Player, UserFplPicks
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from .updates import savePlayers, saveUserFPLPicks

from backend import serializers

# Create your views here.
class PlayerView(generics.ListAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()


class ListPlayersView(APIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
    savePlayers()
    
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

class ListUserFPLPicksView(APIView):
    serializer_class = UserFplPicksSerializer
    queryset = UserFplPicks.objects.all()


    def get(self, request, format=None):
        picks = UserFplPicks.objects.all()
        serializer = UserFplPicksSerializer(picks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        print(data)
        print(data['id'])
        if data:
            saveUserFPLPicks(data['id'])
            return Response(data, status=status.HTTP_201_CREATED)
        return Response("fail", status=status.HTTP_400_BAD_REQUEST)

class UserFPLPicksDetailView(APIView):

    def get_object(self, pk):
        try:
            return UserFplPicks.objects.get(pk=pk)
        except UserFplPicks.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user_pick = self.get_object(pk)
        serializer = UserFplPicksSerializer(user_pick)
        return Response(serializer.data)
    
    def delete(self, request, pk, format=None):
        user_pick = self.get_object(pk)
        user_pick.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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

class DeleteUserFPLPicksView(viewsets.ModelViewSet):
    queryset = UserFplPicks.objects.all()
    serializer_class = UserFplPicksSerializer

    @action(detail=False, methods=['post'])
    def delete_all(self, request):
        UserFplPicks.objects.all().delete()
        return Response('success')
