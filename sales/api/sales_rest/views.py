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
        "sold",
        "manufacturer_name",
        "model_name",
        "picture_url"
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
    ]
    def get_extra_data(self, o):
        return {
            "automobile": o.automobile.vin,
            "customer": o.customer.name,
            "sales_person": o.sales_person.name,
            "employee_number": o.sales_person.employee_number
        }



### VIEWS ###


# LIST AUTO VOS
@require_http_methods(["GET"])
def api_list_auto_vos(request, status=None):
    if status is not None:
        if status == "sold":
            sold = True
        elif status == "available":
            sold = False
        auto_vos = AutomobileVO.objects.filter(sold=sold)
    else:
        auto_vos = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": auto_vos},
        encoder=AutomobileVOEncoder,
        safe=False
    )


# LIST AND CREATE SALESPEOPLE
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalesPersonEncoder,
            safe=False
        )
    else: #POST
        content = json.loads(request.body)
        try:
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except IntegrityError:
            return JsonResponse(
                {"message": "Employee number already used.  Please try again."},
                status=400
            )


# LIST AND CREATE CUSTOMERS
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
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )


# LIST AND CREATE SALES
@require_http_methods(["GET", "POST"])
def api_list_sales(request, employee_number=None):
    if request.method == "GET":
        if employee_number is not None:
            sales_person_id = SalesPerson.objects.values_list('id', flat=True).get(employee_number=employee_number)
            sales = Sale.objects.filter(sales_person_id=sales_person_id)
        else:
            sales = Sale.objects.all()
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
            sales_person = SalesPerson.objects.get(employee_number=employee_number)
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


# SHOW / DELETE SALE
@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            count, _ = Sale.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Sale does not exist"})
