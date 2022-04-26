
import cv2
import time

from src.faceDetectorModule import FaceDetector
from src.imagesDBModule import Database

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 960)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 540)
pTime = 0
detector = FaceDetector(0.75)
db = Database()
img_count = 0
while img_count < 30:
    success, frame = cap.read()
    frame, bboxs = detector.findFaces(frame)
    if len(bboxs) != 1:
        break 
    # print(bboxs[0])
    bbox = bboxs[0]
    dicBbox = {
        'xmin': bbox[0][0],
        'ymin': bbox[0][1],
        'width': bbox[0][2],
        'height': bbox[0][3],
    }
    # bbox = {
    # }
    shape = {'height' : frame.shape[0], 'width' : frame.shape[1]}
    # # print(shape)
    # db.insert(frame.tobytes(), dicBbox,shape, 1)
    img_count += 1
    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime
    cv2.imshow("frame", frame)
    if cv2.waitKey(20) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()