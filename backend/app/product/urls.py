from product import views
from django.urls import path

app_name = 'product'

urlpatterns = [
    path('', views.ProductListView.as_view(), name='product-list'),
    path('<int:id>/', views.ProductDetailAPIView.as_view(), name='product-detail'),
    path('bestsellers/', views.ProductBestSellersView.as_view(), name='best-sellers'),
    path('categories/', views.CategoryListView.as_view(), name='categories'),
    path('categories/<int:id>/', views.CategoryRetriveView.as_view(), name='category-detail'),
    path('recommendations/<int:product_id>/', views.ProductRecommendationsView.as_view(), name='product-recommendations'),
]
