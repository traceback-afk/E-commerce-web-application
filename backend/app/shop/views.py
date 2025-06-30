from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from shop import serializers
from core.models import (
    Purchase
)

class PurchaseViewSet(viewsets.ModelViewSet):
    """
    Purchase ViewSet.
    """
    serializer_class = serializers.PurchaseSerializer
    queryset = Purchase.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        if user.purchases.filter(is_completed=False).exists():
            raise ValueError('You have an incomplete purchase.')
        serializer.save(user=user)