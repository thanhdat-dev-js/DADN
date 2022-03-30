# import standard python modules.
import threading
import time
import concurrent.futures
#import pymongo
from sqlite3 import connect
from pymongo import MongoClient

# import adafruit dht library.

#import datetime
from datetime import datetime


# import Adafruit IO REST client.
from Adafruit_IO import Client, Feed

#connect mongodb
uri = "mongodb+srv://Ailasoi:taolasoi@cluster0.bh9dm.mongodb.net/TTNT?retryWrites=true&w=majority"
connection = MongoClient(uri)
device_collection = connection["TTNT"]["device"]
history_collection = connection["TTNT"]["history"]



class db:
    def __init__(self):
        
        self.__READ_TIMEOUT = 10
        self.__ADAFRUIT_IO_KEY = 'aio_XnPG278z51IYZplAYAoIfPFJF8SE'
        self.__ADAFRUIT_IO_USERNAME = 'Ailasoi'
        self.__aio = Client(self.__ADAFRUIT_IO_USERNAME, self.__ADAFRUIT_IO_KEY)
        self.__temperature_feed = self.__aio.feeds('heat-sensor')
        self.__humidity_feed = self.__aio.feeds('humidity-sensor')
        self.__fan_feed = self.__aio.feeds('fan-1')
        self.__light_feed = self.__aio.feeds('light-1')
        self.__temp_value = self.__aio.receive(self.__temperature_feed.key).value
        self.__humid_value = self.__aio.receive(self.__humidity_feed.key).value
        self.__fan_value = self.__aio.receive(self.__fan_feed.key).value
        self.__light_value = self.__aio.receive(self.__light_feed.key).value
        self._lock = threading.Lock()

    def interval(self):
        # Kiểm tra dữ liệu liên tục
        while True:
            print("Current")
            self.__temp_value = self.__aio.receive(self.__temperature_feed.key).value
            self.__humid_value = self.__aio.receive(self.__humidity_feed.key).value
            self.__fan_value = self.__aio.receive(self.__fan_feed.key).value
            self.__light_value = self.__aio.receive(self.__light_feed.key).value
            print (self.__temp_value)
            print (self.__humid_value)
            print (self.__fan_value)
            print (self.__light_value)
            # Đưa dữ liệu lên MongoDB
            now = datetime.now()
            data = {"time": now , "Light" : self.__light_value, "Fan" : self.__fan_value, "temp" : self.__temp_value, "humid" : self.__humid_value}
            history_collection.insert_one(data)
            
            #update
            now1 = datetime.now()
            device_collection.update_many({"name":"Light"}, {"$set": {"feed" : self.__light_value , "time" : now1}})
            device_collection.update_many({"name":"Fan"}, {"$set": {"feed" : self.__fan_value , "time" : now1}})
            
            
            
            time.sleep(self.__READ_TIMEOUT)

    def statusChanged(self):
        # Khi có thay đổi
        while True:
            new_fan = self.__aio.receive(self.__fan_feed.key).value
            new_light = self.__aio.receive(self.__light_feed.key).value
            if new_fan != self.__fan_value or new_light != self.__light_value:
                print("Changed in status")
                print(new_fan, new_light)
                self.__fan_value = new_fan
                self.__light_value = new_light
                now = datetime.now()
                device_collection.update_many({"name":"Light"}, {"$set": {"feed" : self.__light_value , "time" : now}})
                device_collection.update_many({"name":"Fan"}, {"$set": {"feed" : self.__fan_value , "time" : now}})
                # Đưa dữ liệu lên MongoDB

database = db()
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
    executor.submit(database.interval)
    executor.submit(database.statusChanged)