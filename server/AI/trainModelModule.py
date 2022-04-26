import cv2
import numpy as np
from AI.imagesDBModule import Database

def trainModel():
	recognizer = cv2.face.LBPHFaceRecognizer_create()

	y_labels = []
	x_train = []
	db = Database()
	data = db.getAll()

	for record in data:
		shape = record['shape']
		image_aray = np.frombuffer(record['data'], np.uint8).reshape(shape['height'],shape['width'])
		bbox = record['bbox']
		label = record['label']
		# print (bbox, label)
		roi = image_aray[
			bbox['ymin'] : bbox['ymin'] + bbox['height'],
			bbox['xmin'] : bbox['xmin'] + bbox['width'] ]
		x_train.append(roi)
		y_labels.append(label)


	recognizer.train(x_train, np.array(y_labels))
	recognizer.save("./AI/trainner.yml")