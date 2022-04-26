import cv2
import mediapipe as mp
import time
from PIL import Image
import numpy as np

from AI.readConfig import readConfig
from AI.faceDetectorModule import FaceDetector

from models.userModel import userModel

# import Module
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("trainner.yml")
users = userModel().find({})
# for i in range(len(users)):
#     if users[i]['username'] == 'TVP':
#         print(i)
#         break

print(users[0]['username'])

# cap = cv2.VideoCapture(0)
# # cap2 = cv2.VideoCapture(0)
# cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1000)
# cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1000)
# pTime = 0
# detector = FaceDetector(0.75)
# while True:
#     success, frame = cap.read()
#     mode = readConfig()['mode']
#     time.sleep(0.1)
#     frame, bboxs = detector.findFaces(frame)
#     if mode == "recognize":
#         if len(bboxs) < 1:
#             pass
#         else:
#             for bbox in bboxs:
#                 x,y,w,h = bbox[0]
#                 if w <= 0 or h <= 0 or y <= 0 or x <= 0:
#                     break
#                 roi = frame[ y: y + h, x : x + w]
#                 # print(roi)
#                 if roi.size == 0:
#                     break
#                 else:
#                     id_, conf = recognizer.predict(roi)
#                     font = cv2.FONT_HERSHEY_COMPLEX
#                     name = labels[id_] if conf <= 65 else "?"
#                     color = (255,255,255)
#                     stroke = 2
#                     cv2.putText(frame,name + " "+ str(int(conf)), (x,y), font, 1, color, stroke, cv2.LINE_AA)
        
            
#         cTime = time.time()
#         fps = 1 / (cTime - pTime)
#         pTime = cTime
#         cv2.putText(
#             frame,
#             f'FPS: {int(fps)}', 
#             (10,20), 
#             cv2.FONT_HERSHEY_PLAIN,
#             1,(0,255,0),2) 
#         cv2.imshow("frame", frame)
#         if cv2.waitKey(20) & 0xFF == ord('q'):
#             break
#     elif mode == "capture":
#         username
#     else:
#         cv2.putText(
#             frame,
#             mode, 
#             (10,20), 
#             cv2.FONT_HERSHEY_PLAIN,
#             1,(0,255,0),2) 
#         cv2.imshow("frame", frame)
#         if cv2.waitKey(20) & 0xFF == ord('q'):
#             break
# cap.release()
# cv2.destroyAllWindows()
