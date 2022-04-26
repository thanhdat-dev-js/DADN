import cv2
import mediapipe as mp
import time
from PIL import Image
import numpy as np
import json
from AI.readConfig import readConfig
from AI.faceDetectorModule import FaceDetector
from AI.imagesCaptureModule import frameCapture
from AI.trainModelModule import trainModel
from models.userModel import userModel

class AI():
    def __init__(self) -> None:
        self.cap = cv2.VideoCapture(0)
        self.config = readConfig()
        self.recognizer = cv2.face.LBPHFaceRecognizer_create()
        self.recognizer.read("trainner.yml")
        self.users = userModel().find({})
        self.img_count = 0
        self.label = 0
    def updateVariable(self):
        self.config = readConfig()
        self.recognizer.read("trainner.yml")
        self.users = userModel().find({})

    def findLabel(self, username):
        for i in range(len(self.users)):
            if self.users[i]['username'] == username:
                return i

    def updateMode(self,mode):
        dictionary ={
                "mode" : mode,
            }
            
            # Serializing json 
        json_object = json.dumps(dictionary, indent = 4)
        
        # Writing to sample.json
        with open("ai_config.json", "w") as outfile:
            outfile.write(json_object)

    def run(self):
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1000)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1000)
        pTime = 0
        detector = FaceDetector(0.75)
        while True:
            self.config = readConfig()
            success, image = self.cap.read()
            # time.sleep(0.1)
            frame, bboxs = detector.findFaces(image)
            cv2.putText(
                frame,
                "Mode: " +self.config['mode'], 
                (10,20), 
                cv2.FONT_HERSHEY_PLAIN,
                1,(0,255,0),2) 
            cv2.imshow("frame", frame)
            if cv2.waitKey(20) & 0xFF == ord('q'):
                break
            if self.config['mode'] == "recognize":
                if len(bboxs) < 1:
                    pass
                else:
                    for bbox in bboxs:
                        x,y,w,h = bbox[0]
                        if w <= 0 or h <= 0 or y <= 0 or x <= 0:
                            break
                        roi = frame[ y: y + h, x : x + w]
                        # print(roi)
                        if roi.size == 0:
                            break
                        else:
                            id_, conf = self.recognizer.predict(roi)
                            if id_ >= len(self.users):
                                pass
                            print(id_)
                            font = cv2.FONT_HERSHEY_COMPLEX
                            name = self.users[id_]['username'] if conf <= 65 else "?"
                            color = (255,255,255)
                            stroke = 2
                            cv2.putText(frame,name + " "+ str(int(conf)), (x,y), font, 1, color, stroke, cv2.LINE_AA)
                cv2.imshow("frame", frame)
                if cv2.waitKey(20) & 0xFF == ord('q'):
                    break
            elif self.config['mode'] == "capture":
                self.label = self.findLabel(self.config['username'])
                if (self.img_count == 30):
                    self.updateMode("recognize")
                    self.img_count = 0
                else:
                    cv2.putText(
                        frame,
                        "Capturing " +self.config['username'] + " images", 
                        (30,20), 
                        cv2.FONT_HERSHEY_PLAIN,
                        1,(0,255,0),2)
                    cv2.imshow("frame", frame)
                    if cv2.waitKey(20) & 0xFF == ord('q'):
                        break
                    self.img_count += 1
                    frameCapture(image,self.label)
            elif self.config['mode'] == "train":
                trainModel()
                print("Retrained model")
                self.updateVariable()
                self.updateMode("recognize")
            else:
                cv2.putText(
                    frame,
                    self.config['mode'], 
                    (10,20), 
                    cv2.FONT_HERSHEY_PLAIN,
                    1,(0,255,0),2) 
                cv2.imshow("frame", frame)
                if cv2.waitKey(20) & 0xFF == ord('q'):
                    break
        self.cap.release()
        cv2.destroyAllWindows()


def main():
    ai = AI()
    ai.run()

if __name__ == "__main__":
    main()