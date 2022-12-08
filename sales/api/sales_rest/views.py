from django.shortcuts import render
from common.json import ModelEncoder
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods

from .models import AutomobileVO, SalesPerson, Customer, Sale


## ENCODERS ##

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "color",
        "year",
        "sold"
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone"
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "sale_price",
        "sales_person",
        # "automobile",
        # "customer"
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        # "automobile": AutomobileVOEncoder,
        # "customer": CustomerEncoder,
    }

    # def get_extra_data(self, o):
    #     return {
    #         "automobile": o.automobile.vin,
    #         "customer": o.customer.name,
    #     }



### VIEWS ###

# LIST AUTO VOS
# /api/automobiles/
@require_http_methods(["GET"])
def api_list_auto_vos(request):
    auto_vos = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": auto_vos},
        encoder=AutomobileVOEncoder
    )

# LIST AND CREATE SALESPEOPLE
# /api/salespeople/
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalesPersonEncoder,
        )
    else: #POST
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder,
        )
        # Handle integrity error / exception handling for when an employee id already exists


# LIST AND CREATE CUSTOMERS
# /api/customers/
@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else: #POST
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        print("customer", customer)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder
        )


# LIST AND CREATE SALES
# /api/sales
# /api/salespeople/<int:employee_number>/sales
@require_http_methods(["GET", "POST"])
def api_list_sales(request, employee_number=None):
    if request.method == "GET":
        if employee_number is not None:
            sales = Sale.objects.filter(employee_number=employee_number)
        else:
            sales = Sale.objects.all()
            print(sales)
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )
    else: #POST
        content = json.loads(request.body)
        try:
            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            if automobile.sold:
                return JsonResponse(
                    {"message": "This automobile has already been sold"},
                    status=400
                )
            else:
                content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid or missing auto vin"},
                status=400
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )

# SHOW SALE
# /api/sales/<int:pk>/
@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_sale(request, pk):
    pass
