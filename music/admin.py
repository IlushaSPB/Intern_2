from django.contrib import admin
from .models import User, Musician, Song


class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'surname', 'created_at', 'number', 'love_song')

# Register your models here


admin.site.register(User, UserAdmin)
admin.site.register(Musician)
admin.site.register(Song)