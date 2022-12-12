from django.urls import path

from .views import api_list_sales, api_show_sale, api_list_auto_vos, api_list_salespeople, api_list_customers

urlpatterns = [
    path("automobiles/", api_list_auto_vos, name="api_list_auto_vos"),
    path("automobiles/<str:status>", api_list_auto_vos, name="api_list_auto_vos"),

    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),

    path("customers/", api_list_customers, name="api_list_customers"),

    path("sales/", api_list_sales, name="api_create_sales"),
    path("sales/salespeople/", api_list_sales, name="api_list_sales"),
    path("sales/salespeople/<int:employee_number>", api_list_sales, name="api_list_sales"),

    path("sales/<int:pk>/", api_show_sale, name="api_show_sale"),
]
