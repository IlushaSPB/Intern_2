from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from .serializers import MusicianSerializer, SongSerializer, MyTokenObtainPairSerializer, RegisterSerializer, \
    PostSerializer
from .models import Musician, Song, User, Post
from django.shortcuts import get_object_or_404

# Create your views here.
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .serializers import PostSerializer


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

class MusicianCreate(generics.ListCreateAPIView):
    queryset = Musician.objects.all()
    serializer_class = MusicianSerializer

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 100


class MusicianListCreate(generics.ListCreateAPIView):
    queryset = Musician.objects.all()
    serializer_class = MusicianSerializer
    pagination_class = CustomPageNumberPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



class SongListCreate(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class SongListByMusician(generics.ListAPIView):
    serializer_class = SongSerializer

    def get_queryset(self):
        musician_id = self.kwargs['musician_id']
        musician = get_object_or_404(Musician, pk=musician_id)
        return Song.objects.filter(musician=musician)




class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        qs = Post.objects.all()
        title = self.request.query_params.get('title')
        musician = self.request.query_params.get('musician')

        if title is not None:
            qs = qs.filter(title__icontains=title)
        if musician is not None:
            qs = qs.filter(musician__icontains=musician)

        offset = self.request.query_params.get('offset')
        limit = self.request.query_params.get('limit')

        if offset is not None and limit is not None:
            offset = int(offset)
            limit = int(limit)
            qs = qs[offset:offset + limit]

        return qs

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        title_count = queryset.count()  # Получаем общее количество записей

        response_data = {
            'count': title_count,
            'results': serializer.data,
        }

        return Response(response_data)

