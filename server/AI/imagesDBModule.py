
from pymongo import MongoClient
import cv2
import os
import numpy as np
from PIL import Image

class Database(object):
    def __init__(self):
        # self.client = MongoClient(config['db']['url'])  # configure db url
        try:
            self.client = MongoClient(
                'mongodb+srv://Ailasoi:taolasoi@cluster0.bh9dm.mongodb.net/TTNT?retryWrites=true&w=majority'
            )
            # db = mongo.company
            self.db = self.client['TTNT']  # configure db name
            self.client.server_info() # trigger exception
            self.collection_name = 'images'
        except Exception as ex:
            print("ERROR - Cannot connect to db because of: " + str(ex))


    def insert(self, frame, bbox, shape, label):
        element ={'data': frame, 'bbox' : bbox, 'shape':shape ,'label' : label}
        inserted = self.db[self.collection_name].insert_one(element)  # insert data to db
        return str(inserted.inserted_id)

    def getAll(self, criteria = {}):
        return self.db[self.collection_name].find(criteria)

    def deleteAll(self, criteria = {}):
        return self.db[self.collection_name].delete_many(criteria)

def main():
    a = 1
    if a == 1:
        DB = Database()
        data = DB.getAll()
        # print(data[80]['shape'])
        nparray = np.frombuffer(data[0]['data'], np.uint8).reshape(540,960,3)
        # print(nparray)
        cv2.imshow('image', nparray)
        cv2.waitKey(100)

    else:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        image_dir = os.path.join(BASE_DIR, "images")
        DB = Database()

        current_id = 0
        label_ids = {}
        for root, dirs, files in os.walk(image_dir):
            for file in files:
                if file.endswith("png") or file.endswith("jpg"):
                    path = os.path.join(root, file)
                    label = os.path.basename(root).replace(" ", "-").lower()
                    #print(label, path)
                    if not label in label_ids:
                        label_ids[label] = current_id
                        current_id += 1
                    id_ = label_ids[label]
                    #print(label_ids)
                    #y_labels.append(label) # some number
                    #x_train.append(path) # verify this image, turn into a NUMPY arrray, GRAY
                    pil_image = Image.open(path).convert("L") # grayscale
                    size = (550, 550)
                    final_image = pil_image.resize(size, Image.ANTIALIAS)
                    image_array = np.array(final_image, "uint8")
                    print(image_array, image_array.shape)
                    record = {'data': image_array.tobytes(), 'label': id_}
                    # DB.insert(record)
                    #print(image_array)

if __name__ == "__main__":
    main()