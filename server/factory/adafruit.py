from Adafruit_IO import Client
from adafruit.key import getKey
class ADA:
    def __init__(self) -> None:
        self.__ADAFRUIT_IO_USERNAME = "Ailasoi"
        self.__ADAFRUIT_IO_KEY = getKey()
        self.__aio = Client(self.__ADAFRUIT_IO_USERNAME, self.__ADAFRUIT_IO_KEY)
        self.__temperature_feed = self.__aio.feeds('heat-sensor')
        self.__humidity_feed = self.__aio.feeds('humidity-sensor')
        self.__fan_1_feed = self.__aio.feeds('fan-1')
        self.__light_1_feed = self.__aio.feeds('light-1')
        self.__fan_2_feed = self.__aio.feeds('fan-2')
        self.__light_2_feed = self.__aio.feeds('light-2')
    def update(self, name, value):
        if name == "fan":
            key = self.__fan_1_feed.key
        elif name == "light":
            key = self.__light_1_feed.key
        self.__aio.send_data(key, value)
        return