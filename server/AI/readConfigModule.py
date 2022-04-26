import json
def readConfig():
    with open('ai_config.json', 'r') as openfile:
        json_object = json.load(openfile)
    
        # Reading from json file
    return json_object
    