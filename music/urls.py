from django.conf.urls.static import static
from django.urls import path

from deepra_2 import settings
from . import views
from .views import SongListByMusician

urlpatterns = [
    path('api/user/', views.UserView.as_view()),
    path('api/musician/', views.MusicianListCreate.as_view()),
    path('api/song/', views.SongListCreate.as_view()),
    path('api/song/musician/<int:musician_id>/', SongListByMusician.as_view(), name='song-list-by-musician'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)