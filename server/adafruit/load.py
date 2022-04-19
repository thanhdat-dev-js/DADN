# import standard python modules.
import threading
import time
import concurrent.futures
#import pymongo
from sqlite3 import connect
from pymongo import MongoClient
from key import AdaKey
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
notification_collection = connection["TTNT"]["notification"]


AIO_FEED_ID = ["heat-sensor", "light-sensor", "humidity-sensor", "fan-1","fan-2","light-1", "light-2"]


AIO_USERNAME = "Ailasoi"
AIO_KEY = AdaKey.getKey()


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
        device_collection.update_many({"name":"temp"}, {"$set": {"feed" : payload , "time" : now}})
        noti = "the feed of temp was changed to " + str(payload) + " at " + str(now)
        data = {"name": "temp" ,"time": now ,"notification": noti}
        notification_collection.insert_one(data)
        print("Updated " + payload + " to" + " temp")
    if feed_id == "light-sensor":
        device_collection.update_many({"name":"light_sensor"}, {"$set": {"feed" : payload , "time" : now}})
        noti = "the feed of light_sensor was changed to " + str(payload) + " at " + str(now)
        data = {"name": "light_sensor" ,"time": now ,"notification": noti}
        notification_collection.insert_one(data)
        print("Updated " + payload + " to" + " light_sensor")
    if feed_id == "humidity-sensor":
        device_collection.update_many({"name":"humid"}, {"$set": {"feed" : payload , "time" : now}})
        noti = "the feed of humid was changed to " + str(payload) + " at " + str(now)
        data = {"name": "humid" ,"time": now ,"notification": noti}
        notification_collection.insert_one(data)
        print("Updated " + payload + " to" + " humid")
    if feed_id == "fan-1":
        device_collection.update_many({"name":"Fan_1"}, {"$set": {"feed" : payload , "time" : now}})
        noti = "the feed of Fan_1 was changed to " + str(payload) + " at " + str(now)
        data = {"name": "Fan_1" ,"time": now ,"notification": noti}
        notification_collection.insert_one(data)
        print("Updated " + payload + " to" + " Fan_1")
    if feed_id == "light-1":
        device_collection.update_many({"name":"Light_1"}, {"$set": {"feed" : payload , "time" : now}})
        noti = "the feed of Light_1 was changed to " + str(payload) + " at " + str(now)
        data = {"name": "Light_1" ,"time": now ,"notification": noti}
        notification_collection.insert_one(data)
        print("Updated " + payload + " to" + " Light_1")
    if feed_id == "fan-2":
        device_collection.update_many({"name":"Fan_2"}, {"$set": {"feed" : payload , "time" : now}})
        noti = "the feed of Fan_2 was changed to " + str(payload) + " at " + str(now)
        data = {"name": "Fan_2" ,"time": now ,"notification": noti}
        notification_collection.insert_one(data)
        print("Updated " + payload + " to" + " Fan_2")
    if feed_id == "light-2":
        device_collection.update_many({"name":"Light_2"}, {"$set": {"feed" : payload , "time" : now}})
        noti = "the feed of Light_2 was changed to " + str(payload) + " at " + str(now)
        data = {"name": "Light_2" ,"time": now ,"notification": noti}
        notification_collection.insert_one(data)
        print("Updated " + payload + " to" + " Light_2")


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
    Fan_1_payload = __aio.receive((__aio.feeds('fan-1')).key).value
    Light_1_payload = __aio.receive((__aio.feeds('light-1')).key).value
    Fan_2_payload = __aio.receive((__aio.feeds('fan-2')).key).value
    Light_2_payload = __aio.receive((__aio.feeds('light-2')).key).value
    now1 = datetime.now()
    data = {"time": now1 , "Light_1" : Light_1_payload, "Light_2" : Light_2_payload, "Fan_1" : Fan_1_payload, "Fan_2" : Fan_2_payload, "temp" : temp_payload, "humid" : humid_payload, "light_sensor" : light_sensor_payload}
    history_collection.insert_one(data)
    time.sleep(10)
