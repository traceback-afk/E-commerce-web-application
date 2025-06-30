from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from core import models


@admin.register(models.User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email',
                    'first_name',
                    'last_name',
                    'is_active',
                    'is_staff',
                    'is_superuser')

    search_fields = ('email', 'first_name', 'last_name')
    readonly_fields = ('date_joined', 'last_login')
    ordering = ['email']
    list_filter = ('is_active', 'is_superuser', 'is_staff')
    fieldsets = (
        (None,
            {'fields': ('email', 'password')}),
        ('Personal Info',
            {'fields': ('first_name', 'last_name', 'profile_image', 'shipping_address', 'phone_number')}),
        ('Permissions',
            {'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'first_name',
                'last_name',
                'is_active',
                'is_staff',
                'is_superuser',
            )
        }),
    )

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class ProductImageInline(admin.StackedInline):
    model = models.ProductImage
    fields = ('image',)

@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'new_price', 'sales_count', 'is_in_stock')
    list_filter = ('is_in_stock',)
    inlines = [ProductImageInline]
    search_fields = ('name',)


class PurchaseItemInline(admin.TabularInline):
    model = models.PurchaseItem
    fields = ('product', 'quantity', 'price_at_purchase')


@admin.register(models.Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'created_at', 'is_completed', 'completed_at', 'is_shipped', 'is_received')
    list_filter = ('is_completed', 'is_shipped', 'is_received')
    ordering = ['completed_at', 'user', 'is_completed', 'is_shipped', 'is_received']
    readonly_fields = ('id', 'created_at', 'completed_at')
    inlines = [PurchaseItemInline]



