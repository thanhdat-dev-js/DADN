from factory.validation import Validator
from factory.database import Database


class notificationModel(object):
    def __init__(self):
        self.validator = Validator()
        self.db = Database()

        self.collection_name = 'notification'  # collection name

        self.fields = {
            "time": "datetime",
            "name": "string",
            "notification": "string"
        }

        self.create_required_fields = ["name"]

        # Fields optional for CREATE
        self.create_optional_fields = []

        # Fields required for UPDATE
        self.update_required_fields = ["name"]

        # Fields optional for UPDATE
        self.update_optional_fields = []
        
    def find(self, notification):  # find all
        return self.db.find(notification, self.collection_name)
