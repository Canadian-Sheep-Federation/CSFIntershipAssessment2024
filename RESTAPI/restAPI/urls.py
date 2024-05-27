from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from restAPI import views

from .views import MovieReviewsView

from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'moviereviews', MovieReviewsView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
    
]

