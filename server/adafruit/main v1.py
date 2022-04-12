# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import sys
import time
import random
import base64
import serial.tools.list_ports

from Adafruit_IO import MQTTClient

AIO_FEED_ID = "Fan_1"
AIO_USERNAME = "Ailasoi"
AIO_KEY = "aio_WEcd27gk7UJYd7IANkWs4AESAGkR"
def connected(client):
    print("Ket noi thanh cong...")
    client.subscribe(AIO_FEED_ID)
def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong...")

def disconnected(client):
        print("Ngat ket noi...")
        sys.exit(1)
def message(client, feed_id, payload):
    print(feed_id)
    if feed_id == AIO_FEED_ID:
        print("trang thai cua replay 1: " + payload)

client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    a = input()
    if a == "1":
        client.publish("Fan_1","1")
    else:
        client.publish("Fan_1","0")


# See PyCharm help at https://www.jetbrains.com/help/pycharm/
