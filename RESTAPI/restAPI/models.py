from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class MovieReviews(models.Model):
  movie_id = models.AutoField(primary_key=True)
  movie_name = models.CharField(max_length=300, default='Unknown')
  movie_review = models.CharField(max_length=300)
  movie_rating = models.PositiveIntegerField()
  movie_recommendation = models.CharField(max_length=5)

  def __str__(self):
    return self.title
