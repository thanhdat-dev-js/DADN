from factory.validation import Validator
from factory.database import Database


class historyModel(object):
    def __init__(self):
        self.validator = Validator()
        self.db = Database()

        self.collection_name = 'history'  # collection name

        self.fields = {
            "time": "datetime",
            "Light_1": "string",
            "Light_2": "string",
            "Door": "string",
            "Fan_1": "string",
            "Fan_2": "string",
            "temp": "string",
            "humid": "string",
            "light_sensor": "string"
        }

        self.create_required_fields = ["name"]

        # Fields optional for CREATE
        self.create_optional_fields = []

        # Fields required for UPDATE
        self.update_required_fields = ["name"]

        # Fields optional for UPDATE
        self.update_optional_fields = []
        
    def find(self, history):  # find all
        return self.db.find(history, self.collection_name)
