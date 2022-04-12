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
import sys

# import Adafruit IO REST client.
from Adafruit_IO import MQTTClient, Client, Feed


#connect mongodb
uri = "mongodb+srv://Ailasoi:taolasoi@cluster0.bh9dm.mongodb.net/TTNT?retryWrites=true&w=majority"
connection = MongoClient(uri)
device_collection = connection["TTNT"]["device"]
history_collection = connection["TTNT"]["history"]


AIO_FEED_ID = ["heat-sensor", "light-sensor", "humidity-sensor", "fan-1", "light-1"]


AIO_USERNAME = "Ailasoi"
AIO_KEY = "aio_WEcd27gk7UJYd7IANkWs4AESAGkR"


def connected(client):
    print("Connected successfully ...")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)

def subscribe(client, userdata, mid, granted_qos):
    print("Subscribed successfully ...")


def disconnected(client):
    print("Disconnect ...")
    sys.exit(1)


__aio = Client(AIO_USERNAME, AIO_KEY)



def message(client, feed_id, payload):
    print(feed_id)
    now = datetime.now()
    if feed_id == "heat-sensor":
        ###temp_payload = __aio.receive((__aio.feeds('heat-sensor')).key).value
        device_collection.update_many({"name":"temp"}, {"$set": {"feed" : payload , "time" : now}})
        print("Updated " + payload + " to" + " temp")
    if feed_id == "light-sensor":
        ###light_sensor_payload = __aio.receive((__aio.feeds('light-sensor')).key).value
        device_collection.update_many({"name":"light_sensor"}, {"$set": {"feed" : payload , "time" : now}})
        print("Updated " + payload + " to" + " light_sensor")
    if feed_id == "humidity-sensor":
        ###humid_payload = __aio.receive((__aio.feeds('humidity-sensor')).key).value
        device_collection.update_many({"name":"humid"}, {"$set": {"feed" : payload , "time" : now}})
        print("Updated " + payload + " to" + " humid")
    if feed_id == "fan-1":
        ###Fan_payload = __aio.receive((__aio.feeds('fan-1')).key).value
        device_collection.update_many({"name":"Fan"}, {"$set": {"feed" : payload , "time" : now}})
        print("Updated " + payload + " to" + " Fan")
    if feed_id == "light-1":
        ###Light_payload = __aio.receive((__aio.feeds('light-1')).key).value
        device_collection.update_many({"name":"Light"}, {"$set": {"feed" : payload , "time" : now}})
        print("Updated " + payload + " to" + " Light")


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


while True:
    temp_payload = __aio.receive((__aio.feeds('heat-sensor')).key).value
    light_sensor_payload = __aio.receive((__aio.feeds('light-sensor')).key).value
    humid_payload = __aio.receive((__aio.feeds('humidity-sensor')).key).value
    Fan_payload = __aio.receive((__aio.feeds('fan-1')).key).value
    Light_payload = __aio.receive((__aio.feeds('light-1')).key).value
    now1 = datetime.now()
    data = {"time": now1 , "Light" : Light_payload, "Fan" : Fan_payload, "temp" : temp_payload, "humid" : humid_payload, "light_sensor" : light_sensor_payload}
    history_collection.insert_one(data)
    time.sleep(10)
