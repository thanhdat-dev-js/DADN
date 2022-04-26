

import cv2
from AI.faceDetectorModule import FaceDetector
from AI.imagesDBModule import Database

db = Database()
def frameCapture(frame, label):
    detector = FaceDetector(0.75)
    frame, bboxs = detector.findFaces(frame)
    if len(bboxs) != 1:
        return False
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
    db.insert(frame.tobytes(), dicBbox,shape, label)


def main():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 960)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 540)
    pTime = 0
    detector = FaceDetector(0.75)
    db = Database()
    img_count = 0
    frames = []
    while img_count < 30:
        success, frame = cap.read()
        frames.append(frame)
        frame, bboxs = detector.findFaces(frame)
        if len(bboxs) != 1:
            break 
        cv2.imshow("frame", frame)
        if cv2.waitKey(20) & 0xFF == ord('q'):
            break
        img_count += 1

    frameCapture(frames, db, 1)
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()