
from Adafruit_IO import Client
# from adafruit.key import getKey
class ADA:
    def __init__(self) -> None:
        self.__ADAFRUIT_IO_USERNAME = "Ailasoi"
        # self.__ADAFRUIT_IO_KEY = getKey()
        self.__ADAFRUIT_IO_KEY = "aio_xFYd84lrj1kEQn71XGpYcsHWDBPd"
        self.__aio = Client(self.__ADAFRUIT_IO_USERNAME, self.__ADAFRUIT_IO_KEY)
        
        
        self.temp_payload = self.__aio.feeds('heat-sensor')
        self.light_sensor_payload = self.__aio.feeds('light-sensor')
        self.humid_payload = self.__aio.feeds('humidity-sensor')
        self.Fan_1_payload = self.__aio.feeds('fan-1')
        self.Light_1_payload = self.__aio.feeds('light-1')
        self.Fan_2_payload = self.__aio.feeds('fan-2')
        self.Light_2_payload = self.__aio.feeds('light-2')
        self.Door_payload = self.__aio.feeds('door')
    
    def update(self, name, value):
        if name == "Light_1":
            key = self.Light_1_payload.key
        elif name == "Light_2":
            key = self.Light_2_payload.key
        elif name == "Door":
            key = self.Door_payload.key
        elif name == "Fan_1":
            key = self.Fan_1_payload.key
        elif name == "Fan_2":
            key = self.Fan_2_payload.key
        elif name == "temp":
            key = self.temp_payload.key
        elif name == "humid":
            key = self.humid_payload.key
        elif name == "light_sensor":
            key = self.light_sensor_payload.key
        self.__aio.send_data(key, value)
        return 
    def getDoor(self):
        return self.__aio.receive(self.Door_payload.key).value
    def openDoor(self):
        self.update("Door",1)

