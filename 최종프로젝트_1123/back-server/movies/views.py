import random
from django.db.models import Q
from .models import Movie, Genre
from rest_framework import status
from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.shortcuts import get_list_or_404, get_object_or_404
from movies.serializers import MovieListSerializer, MovieSerializer
# Create your views here.


# 전체 영화 리스트
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def movies_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# 단일 영화 정보
@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data, status=status.HTTP_200_OK)


# 장르별 영화 리스트
@api_view(['GET'])
def movies_genre(request, genre_pk):
    genre = get_object_or_404(Genre, pk=genre_pk)
    movies = genre.movies.order_by('-popularity', '-release_date')[:100]
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# 개발자 추천 영화
@api_view(['GET'])
def recommend_by_developer(request):
    recommend_movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(recommend_movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
