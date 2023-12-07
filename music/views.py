from rest_framework import viewsets
from .serializers import MusicianSerializer, SongSerializer, MyTokenObtainPairSerializer, RegisterSerializer, \
    PostSerializer
from .models import Musician, Song, User, Post
from django.shortcuts import get_object_or_404

# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        'api/musician/',
        'api/song/',
        'api/post/',
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


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


from rest_framework import generics
from .models import Post
from .serializers import PostSerializer

class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        qs = Post.objects.all()
        title = self.request.query_params.get('title')
        if title is not None:
            qs = qs.filter(title__icontains=title)

        # Получение параметров offset и limit из запроса
        offset = self.request.query_params.get('offset')
        limit = self.request.query_params.get('limit')

        # Применение параметров offset и limit для пагинации
        if offset is not None and limit is not None:
            offset = int(offset)
            limit = int(limit)
            qs = qs[offset:offset + limit]

        return qs
