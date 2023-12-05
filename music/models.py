from django.db import models


# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    number = models.IntegerField(unique=True)
    love_song = models.CharField(max_length=100)

    def __str__(self):
        return self.surname


class Musician(models.Model):
    nickname = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='musicians/')
    bio = models.CharField(max_length=300)

    def __str__(self):
        return self.nickname


class Song(models.Model):
    title = models.CharField(max_length=100)
    musician = models.ForeignKey(Musician, on_delete=models.CASCADE)
    audio = models.FileField(upload_to='songs/')
    cover = models.ImageField(upload_to='songs/')

    def __str__(self):
        return self.title