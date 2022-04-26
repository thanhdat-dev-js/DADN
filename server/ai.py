import cv2
import numpy as np
import json
from AI.readConfigModule import readConfig
from AI.faceDetectorModule import FaceDetector
from AI.imagesCaptureModule import frameCapture
from AI.trainModelModule import trainModel

from models.userModel import userModel
from factory.adafruit import ADA
class AI():
    def __init__(self, total_img_count, conf,  ) -> None:
        self.ada = ADA()
        self.cap = cv2.VideoCapture(0)
        self.config = readConfig()
        self.recognizer = cv2.face.LBPHFaceRecognizer_create()
        self.recognizer.read("./AI/trainner.yml")
        self.users = userModel().find({})
        self.img_count = 0
        self.conf = conf
        self.total_img_count = total_img_count
        self.label = 0
        self.opening = False
        self.conf_count = 0
        self.cur_user = ""
        self.total_conf_count = 50
        self.door_value = self.ada.getDoor()
        self.count_down = 0
        self.capturing = False
    def updateVariable(self):
        self.config = readConfig()
        self.recognizer = cv2.face.LBPHFaceRecognizer_create()
        self.recognizer.read("./AI/trainner.yml")
        self.users = userModel().find({})

    def updateDoorValue(self):
        self.door_value = self.ada.getDoor()
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
    def openDoor(self):
        self.ada.openDoor()
        self.door_value = '1'
        self.opening = False
        self.conf_count = 0
        return
    def run(self):
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 540)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 960)
        detector = FaceDetector(0.90)
        while True:
            self.config = readConfig()
            success, image = self.cap.read()
            # time.sleep(0.1)
            frame = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
            frame = np.array(frame, "uint8")
            grayframe, bboxs = detector.findFaces(image)
            cv2.putText(
                frame,
                "Mode: " +self.config['mode'], 
                (10,20), 
                cv2.FONT_HERSHEY_PLAIN,
                2,(250,0,0),2) 
            cv2.rectangle(
                frame,
                (150,100),
                (500,400),(255,0,0),3 )
            cv2.imshow("frame", frame)
            if cv2.waitKey(20) & 0xFF == ord('q'):
                break
            if self.config['mode'] == "recognize":
                if len(bboxs) < 1:
                    cv2.putText(
                        frame,
                        "No person in sight", 
                        (10,50), 
                        cv2.FONT_HERSHEY_PLAIN,
                        1,(255,0,0),2)
                elif len(bboxs) > 1:
                    cv2.putText(
                        frame,
                        "More than one person in sight", 
                        (10,50), 
                        cv2.FONT_HERSHEY_PLAIN,
                        2,(255,0,0),2)
                else:
                    bbox = bboxs[0]
                    x,y,w,h = bbox[0]
                    if w <= 0 or h <= 0 or y <= 0 or x <= 0:
                        continue
                    roi = grayframe[ y: y + h, x : x + w]
                    # print(roi)
                    if roi.size == 0:
                        break
                    else:
                        id_, dis = self.recognizer.predict(roi)
                        if id_ >= len(self.users):
                            print("Out of range")
                            continue

                        font = cv2.FONT_HERSHEY_COMPLEX
                        name = ""
                        if dis <= self.conf:
                            name = self.users[id_]['username']
                            self.cur_user = name
                            self.opening = True
                        else:
                            name = "?"    
                        if name == "?":
                            self.opening = False
                            self.conf_count = 0
                            self.cur_user = ""
                        if self.opening == True:
                            if self.door_value == '1':
                                print("Door opened")
                                self.opening == False
                        if self.opening == True and self.cur_user == name:
                            if self.conf_count == self.total_conf_count:
                                self.openDoor()
                            else:
                                self.conf_count += 1
                            cv2.putText(
                            frame,
                            "Checking identity " + str(self.conf_count*2) + "%", 
                            (10,50), 
                            cv2.FONT_HERSHEY_PLAIN,
                            2,(255,0,0),2)

                        color = (255,255,255)
                        stroke = 2
                        cv2.putText(frame,name + " "+ str(int(dis)), (x,y), font, 1, color, stroke, cv2.LINE_AA)
                cv2.imshow("frame", frame)
                if cv2.waitKey(20) & 0xFF == ord('q'):
                    break
            elif self.config['mode'] == "capture":
                if self.count_down < 50:
                    cv2.putText(
                        frame,
                        "Countdown" + str(50 - self.count_down), 
                        (10,100), 
                        cv2.FONT_HERSHEY_PLAIN,
                        2,(255,0,0),2)
                    cv2.imshow("frame", frame)
                    if cv2.waitKey(20) & 0xFF == ord('q'):
                        break
                    self.count_down += 1
                else:
                    self.label = self.findLabel(self.config['username'])
                    if (self.img_count == self.total_img_count):
                        self.updateMode("train")
                        self.img_count = 0
                        self.count_down = 0
                    else:
                        cv2.putText(
                            frame,
                            "Capturing " +self.config['username'] + " images, " + str(self.img_count) + "/" + str(self.total_img_count)  , 
                            (10,50), 
                            cv2.FONT_HERSHEY_PLAIN,
                            2,(255,0,0),2)
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
            elif self.config['mode'] == "update":
                self.updateDoorValue()
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
    ai = AI(100, 40)
    ai.run()

if __name__ == "__main__":
    main()