
import cv2
import mediapipe as mp
import time

class FaceDetector():
    def __init__(self, minDetectionConf = 0.75) -> None:
        self.minDetectionConf = minDetectionConf
        self.mpFaceDetection = mp.solutions.face_detection
        self.mpDraw = mp.solutions.drawing_utils
        self.faceDetection = self.mpFaceDetection.FaceDetection(minDetectionConf)

    def findFaces(self, frame, draw = True):
        fh, fw, fc = frame.shape
        frameRGB = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
        self.results = self.faceDetection.process(frameRGB)
        bboxs = []
        if self.results.detections:
            for id,detection in enumerate(self.results.detections):
                # mpDraw.draw_detection(frame, detection)
                # print(detection.location_data.relative_bounding_box)
                # print(id, detection)
                bboxC = detection.location_data.relative_bounding_box
                bbox =  int(bboxC.xmin * fw), int(bboxC.ymin * fh),\
                        int(bboxC.width * fw), int(bboxC.height * fh)
                
                bboxs.append([bbox, detection.score])
                color = (255, 0, 0)
                stroke = 1
                cv2.rectangle(frame, bbox, color, stroke)
                cv2.putText(
                    frame,
                    f'FPS: {int(detection.score[0]*100)}%', 
                    (bbox[0], bbox[1]-20), 
                    cv2.FONT_HERSHEY_PLAIN,
                    1,color,2)
        return frame, bboxs


def main():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1000)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1000)
    pTime = 0
    detector = FaceDetector(0.75)
    while True:
        success, frame = cap.read()
        frame, bboxs = detector.findFaces(frame)
        print(bboxs)
        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(
            frame,
            f'FPS: {int(fps)}', 
            (10,20), 
            cv2.FONT_HERSHEY_PLAIN,
            1,(0,255,0),2) 
        cv2.imshow("frame", frame)
        if cv2.waitKey(20) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()