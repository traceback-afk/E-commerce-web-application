"""
Database models.
"""

import uuid
import os

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission,
)
from django.contrib.auth import get_user_model


def product_image_file_path(instance, filename):
    """
    Generate file path for new ProductImage.
    """
    ext = os.path.splitext(filename)[1]
    filename = f'{uuid.uuid4()}{ext}'

    return os.path.join('uploads', 'product', filename)


class UserManager(BaseUserManager):
    """
    Manager for User.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Create, save and return a new user.
        """
        if not email:
            raise ValueError("User must have an Email Address.")

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Create, save and return a new superuser.
        """
        superuser = self.create_user(email, password)
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.save(using=self._db)
        return superuser


class User(AbstractBaseUser, PermissionsMixin):
    """
    User Object.
    """
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    profile_image = models.ImageField(upload_to='uploads/user/', null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    shipping_address = models.TextField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions_set",
        blank=True
    )

    objects = UserManager()


class Category(models.Model):
    """
    Category model.
    """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Product model.
    """
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category,
                                 on_delete=models.SET_NULL,
                                 related_name='products',
                                 null=True)
    description = models.TextField()
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    new_price = models.DecimalField(max_digits=10, decimal_places=2)
    sales_count = models.IntegerField(default=0)
    is_in_stock = models.BooleanField(default=True)
    score = models.IntegerField(default=0)

    @property
    def average_score(self):
        return self.reviews.aggregate(avg=models.Avg('score'))['avg'] or 0

    def __str__(self):
        return self.name



class ProductImage(models.Model):
    """
    Image object.
    """
    product = models.ForeignKey(Product,
                              on_delete=models.CASCADE,
                              related_name='images')
    image = models.ImageField(upload_to=product_image_file_path)


class Purchase(models.Model):
    """
    Purchase model.
    """
    user = models.ForeignKey(get_user_model(),
                             on_delete=models.CASCADE,
                             related_name='purchases')
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True)
    shipping_address = models.TextField(null=True)
    is_shipped = models.BooleanField(default=False)
    is_received = models.BooleanField(default=False)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True)


    def __str__(self):
        return f'{self.user.email} | {self.created_at}'


class PurchaseItem(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, related_name='purchase_items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    def __str__(self):
        return f'Purchase_id: {self.purchase.id} | Purchase_item_id: {self.id}'
