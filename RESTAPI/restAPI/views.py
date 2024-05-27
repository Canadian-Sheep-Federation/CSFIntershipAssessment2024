from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny


from .serializers import MovieSerializer
from .models import MovieReviews

# Create your views here.
def main(request):
    return HttpResponse("Hello")


class MovieReviewsView(viewsets.ModelViewSet):
    serializer_class = MovieSerializer
    queryset = MovieReviews.objects.all()
    permission_classes = [AllowAny]

