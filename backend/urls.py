from django.urls import path, include
from .views import DeletePlayersView, DeleteUserFPLPicksView, PlayerDetailView, ListPlayersView, ListUserFPLPicksView, UserFPLPicksDetailView
urlpatterns = [
    path('players', ListPlayersView.as_view()),
    path('delete-players', DeletePlayersView.as_view({'delete':'delete_all'})),
    path('delete-user-picks', DeleteUserFPLPicksView.as_view({'delete':'delete_all'})),
    path('player/<int:pk>', PlayerDetailView.as_view()),
    path('users-picks', ListUserFPLPicksView.as_view()),
    path('user-picks/<int:pk>', UserFPLPicksDetailView.as_view()),
]