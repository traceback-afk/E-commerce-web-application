from rest_framework import serializers
from core.models import (
    Product,
    Category,
    ProductImage,
)


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for categories.
    """
    class Meta:
        model = Category
        fields = ['id', 'name']
        read_only_fields = ['id', 'name']


class ProductImageSerializer(serializers.ModelSerializer):
    """
    Serializer for uploading images for products.
    """
    class Meta:
        model = ProductImage
        fields = ['id', 'image']
        read_only_fields = ['id',]
        extra_kwargs = {'image': {'required': 'True'}}


class ProductSerializer(serializers.ModelSerializer):
    """
    Product list serializer.
    """
    category = serializers.CharField()
    images = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'created_at',
                  'category', 'old_price', 'new_price', 'images',
                  'description', 'is_in_stock', 'score']

