from rest_framework import viewsets
from .serializers import UserSerializer, MusicianSerializer, SongSerializer
from .models import User, Musician, Song

from rest_framework import generics

# Create your views here.


class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MusicianListCreate(generics.ListCreateAPIView):
    queryset = Musician.objects.all()
    serializer_class = MusicianSerializer


class SongListCreate(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer