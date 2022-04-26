import json
from time import sleep

while True:
    # Opening JSON file
    with open('ai_config.json', 'r') as openfile:
    
        # Reading from json file
        json_object = json.load(openfile)
    
    print(json_object)
    print(type(json_object))
    sleep(1)