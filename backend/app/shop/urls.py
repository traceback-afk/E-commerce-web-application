from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shop import views


app_name = 'shop'

router = DefaultRouter()
router.register('purchases', views.PurchaseViewSet)

urlpatterns = [
    path('', include(router.urls))
]