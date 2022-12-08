from django.shortcuts import render
from common.json import ModelEncoder
from django.http import JsonResponse
import json
from django.db import IntegrityError
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
        # "sales_person",
        # "automobile",
        # "customer"
    ]
    encoders = {
        # "sales_person": SalesPersonEncoder(),
        # "automobile": AutomobileVOEncoder(),
        # "customer": CustomerEncoder(),
    }

    def get_extra_data(self, o):
        return {
            "automobile": o.automobile.vin,
            "customer": o.customer.name,
            "sales_person": o.sales_person.name,
            "employee_number": o.sales_person.employee_number
        }



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
        # Handle integrity error / exception handling for when an employee id already exists
        try:
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                {"sales_person": sales_person},
                encoder=SalesPersonEncoder,
            )
        except IntegrityError:
            return JsonResponse(
                {"message": "Employee number already used.  Please try again."},
                status=400
            )


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
            sales_person_id = SalesPerson.objects.values_list('id', flat=True).get(employee_number=employee_number)
            # print("Employee Number: ", employee_number)
            # print("Sales Person ID: ", sales_person_id)
            sales = Sale.objects.filter(sales_person_id=sales_person_id)
        else:
            sales = Sale.objects.all()
            # print(sales)
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )
    else: #POST
        content = json.loads(request.body)
        automobile_vin = content["automobile"]
        customer_id = content["customer"]
        employee_number = content["sales_person"]
        try: #handle auto vin
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
        try: #handle customer
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid or missing customer id"},
                status=400
            )
        try: #handle sales person
            sales_person = SalesPerson.objects.get(employee_number= employee_number)
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid or missing sales person employee number"},
                status=400
            )
        sale = Sale.objects.create(**content)
        AutomobileVO.objects.filter(vin=automobile_vin).update(sold=True)
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
