from rest_framework import (
    generics,
)
from django.db.models import Count
from django.db.models import Q
from core.models import (
    Product,
    Category,

)
from product import serializers
from .recommender import get_content_based_recommendation


class ProductListView(generics.ListAPIView):
    """
    Product list View.
    Takes an optional query params 'search' and 'category_id' to filter products.
    Example: /api/product?search=lego
    Example: /api/product?category_id=1
    """
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search = self.request.query_params.get('search')
        category_id = self.request.query_params.get('category_id')

        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))

        if category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset


class ProductDetailAPIView(generics.RetrieveAPIView):
    """
    Product detail view.
    """
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    lookup_field = 'id'


class ProductBestSellersView(generics.ListAPIView):
    """
    Best sellers list view.
    Lists 8 best seller products.
    """
    queryset = Product.objects.all().order_by('-sales_count')[:8]
    serializer_class = serializers.ProductSerializer


class CategoryListView(generics.ListAPIView):
    """
    Category list view.
    """
    queryset = Category.objects.annotate(product_count=Count('products')).filter(product_count__gt=0)
    serializer_class = serializers.CategorySerializer


class CategoryRetriveView(generics.RetrieveAPIView):
    """
    Retrieves a category by id.
    """
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    lookup_field = 'id'


class ProductRecommendationsView(generics.ListAPIView):
    """
    Returns 8 products similar to the given product (based on description).
    """
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        try:
            product_id = int(product_id)
        except (ValueError, TypeError):
            return Product.objects.none()

        return get_content_based_recommendation(product_id)