  
import json
  
# Data to be written
dictionary ={
    "mode" : "train"
}
  
# Serializing json 
json_object = json.dumps(dictionary, indent = 4)
  
# Writing to sample.json
with open("ai_config.json", "w") as outfile:
    outfile.write(json_object)