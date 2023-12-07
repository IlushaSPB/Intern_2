from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def profile(self):
        profile = Profile.objects.get(user=self)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


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


class Post(models.Model):
    title = models.CharField(max_length=228)

    def __str__(self):
        return str(self.title)