from factory.validation import Validator
from factory.database import Database


class deviceModel(object):
    def __init__(self):
        self.validator = Validator()
        self.db = Database()

        self.collection_name = 'device'  # collection name

        self.fields = {
            "name": "string",
            "feed": "string",
            "time": "datetime",
            "updated": "datetime",
        }

        self.create_required_fields = ["name"]

        # Fields optional for CREATE
        self.create_optional_fields = []

        # Fields required for UPDATE
        self.update_required_fields = ["name"]

        # Fields optional for UPDATE
        self.update_optional_fields = []

    def create(self, device):
        # Validator will throw error if invalid
        self.validator.validate(device, self.fields, self.create_required_fields, self.create_optional_fields)
        res = self.db.insert(device, self.collection_name)
        return "Inserted Id " + res

    def find(self, device):  # find all
        return self.db.find(device, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, device):
        self.validator.validate(device, self.fields, self.update_required_fields, self.update_optional_fields)
        return self.db.update(id, device,self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)