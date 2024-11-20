# Carrot Detection in Live Video

This project demonstrates how to adapt a machine learning model that identifies carrots in individual images to process live video and record any instances of detected carrots.

## Prerequisites
- Python 3.x
- OpenCV
- A pre-trained machine learning model for carrot detection (not included in the dummy implementation)

## Installation
Clone the repository:

`git clone https://github.com/yourusername carrot-detection-video.git`

`cd carrot-detection-video`


# Install the required packages:

`pip install opencv-python`

## Usage

Replace the dummy detection function:
Replace the detect_carrots(image) function in process_video.py with your actual ML model inference code.

## Example using TensorFlow:

import tensorflow as tf

model = tf.keras.models.load_model('path_to_your_model.h5')`


def detect_carrots(image):
    
    input_image = preprocess_image(image)
    
    predictions = model.predict(input_image)
    
    return predictions[0] > 0.5


def preprocess_image(image):
    
    image_resized = cv2.resize(image, (224, 224))  # Example size
    
    image_normalized = image_resized / 255.0
    
    return np.expand_dims(image_normalized, axis=0)`
    
Run the script:

`python process_video.py`

## Explanation

1- Video Capture: Uses OpenCV to open and read frames from the video file or webcam.

2 - Frame Processing: Each frame is processed to detect carrots using the detect_carrots function.

3- Recording Detections: If a carrot is detected, the frame number and timestamp are recorded.

4- Displaying Results: Detected carrots are printed with their corresponding frame numbers and timestamps.
