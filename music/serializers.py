from rest_framework import serializers
from .models import User, Musician, Song


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'surname', 'created_at', 'number', 'love_song')

class MusicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musician
        fields = ('id', 'nickname', 'photo', 'bio')


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'title', 'musician', 'audio', 'cover')
