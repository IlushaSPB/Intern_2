from rest_framework import viewsets
from .serializers import UserSerializer, MusicianSerializer, SongSerializer
from .models import User, Musician, Song
from django.shortcuts import get_object_or_404

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


class SongListByMusician(generics.ListAPIView):
    serializer_class = SongSerializer

    def get_queryset(self):
        musician_id = self.kwargs['musician_id']
        musician = get_object_or_404(Musician, pk=musician_id)
        return Song.objects.filter(musician=musician)