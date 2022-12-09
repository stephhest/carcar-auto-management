from common.json import ModelEncoder

from .models import Automobile, Manufacturer, VehicleModel


class ManufacturerEncoder(ModelEncoder):
    model = Manufacturer
    properties = [
        "id",
        "name",
    ]


class VehicleModelEncoder(ModelEncoder):
    model = VehicleModel
    properties = [
        "id",
        "name",
        "picture_url",
        "manufacturer",
    ]
    encoders = {
        "manufacturer": ManufacturerEncoder(),
    }


class AutomobileEncoder(ModelEncoder):
    model = Automobile
    properties = [
        "id",
        "color",
        "year",
        "vin",
        "model",
    ]
    encoders = {
        "model": VehicleModelEncoder(),
    }
    def get_extra_data(self, o):
        return {
            "model_name": o.model.name,
            "picture_url": o.model.picture_url,
            "manufacturer_name": o.model.manufacturer.name,
        }
