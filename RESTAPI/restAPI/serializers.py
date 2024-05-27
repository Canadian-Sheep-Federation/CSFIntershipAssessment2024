from rest_framework import serializers
from .models import MovieReviews


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieReviews
        fields = '__all__'