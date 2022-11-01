from django.urls import path, include
from .views import DeletePlayersView, PlayerDetailView, ListPlayersView
urlpatterns = [
    path('players', ListPlayersView.as_view()),
    path('delete-players', DeletePlayersView.as_view({'delete':'delete_all'})),
    path('player/<int:pk>', PlayerDetailView.as_view())
]