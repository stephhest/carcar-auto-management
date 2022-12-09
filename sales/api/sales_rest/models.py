from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    picture_url = models.URLField(null=True)
    manufacturer_name = models.CharField(max_length=100, null=True)
    model_name = models.CharField(max_length=100, null=True)

    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_show_auto_vo", kwargs={"vin": self.vin})

    def __str__(self):
        return self.vin


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True, null=True)

    def get_api_url(self):
        return reverse("api_show_sales_person", kwargs={"employee_number": self.employee_number})

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=10)

    def get_api_url(self):
        return reverse("api_show_customer", kwargs={"pk": self.id})

    def __str__(self):
        return self.name


class Sale(models.Model):
    sale_price = models.PositiveIntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE,
    )

    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.CASCADE,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"pk": self.id})

    def __str__(self):
        return f"{self.sales_person} - ${self.sale_price}"
