from rest_framework import serializers
from core.models import (
    Purchase,
    PurchaseItem
)


class PurchaseItemSerializer(serializers.ModelSerializer):
    """
    Serializer for purchase item.
    """
    class Meta:
        model = PurchaseItem
        exclude = ['purchase']


class PurchaseSerializer(serializers.ModelSerializer):
    """
    Serializer for purchase.
    """
    purchase_items = PurchaseItemSerializer(many=True)

    class Meta:
        model = Purchase
        fields = ['id', 'user', 'created_at', 'is_completed',
                  'completed_at', 'shipping_address', 'is_shipped',
                  'is_received', 'total', 'purchase_items']
        read_only_fields = ['id', 'completed_at','is_shipped',
                            'is_received',]

    def create(self, validated_data):
        purchase_items_data = validated_data.pop('purchase_items')
        purchase = Purchase.objects.create(**validated_data)

        for item_data in purchase_items_data:
            PurchaseItem.objects.create(purchase=purchase, **item_data)

        return purchase


