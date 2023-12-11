from django.conf.urls.static import static
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from deepra_2 import settings
from . import views
from .views import SongListByMusician

urlpatterns = [
    path('', views.getRoutes),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.dashboard, name='test'),
    path('api/musician/', views.MusicianListCreate.as_view()),
    path('api/song/', views.SongListCreate.as_view()),
    path('api/song/musician/<int:musician_id>/', SongListByMusician.as_view(), name='song-list-by-musician'),
    path('api/posts/', views.PostListCreate.as_view()),
    path('api/musician/create', views.MusicianCreate.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)