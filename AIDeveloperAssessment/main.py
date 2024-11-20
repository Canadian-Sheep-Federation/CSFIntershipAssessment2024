import cv2
import time

# Dummy carrot detection function (replace with actual model inference)
def detect_carrots(image):
    # Replace with actual ML model
    import random
    return random.choice([True, False])

def process_video(video_path):
    # Open the video file
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error: Could not open video.")
        return

    # Initializing a list to store records
    carrot_detections = []

    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            break

        frame_count += 1

        # Process the current frame for carrot detection
        if detect_carrots(frame):
            timestamp = time.time()
            carrot_detections.append({
                'frame': frame_count,
                'timestamp': timestamp,
                'detection': True
            })
            print(f"Carrot detected at frame {frame_count}, timestamp {timestamp}")

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    # Print the detections
    for detection in carrot_detections:
        print(detection)

# Path to the video file
video_path = 'path_to_your_video.mp4'
process_video(video_path)
