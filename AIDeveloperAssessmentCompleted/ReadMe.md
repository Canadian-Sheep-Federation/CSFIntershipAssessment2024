# Carrot Detection Pipeline

## Overview

This notebook showcases how to adapt a pre-trained ML model to process live video input in a grocery store setting and create a record of any carrots detected. 

## Notebook Structure

### 1. Import Required Libraries
Import necessary libraries for video processing, model loading, and time tracking.

### 2. Load the Pre-trained Model
Load a pre-trained model (`carrot_model.h5`) for carrot detection and print its summary.

### 3. Define Helper Functions for Video Processing
Define helper functions to preprocess video frames and classify them using the loaded model.

### 4. Set Up Video Capture and Process Frames
Initialize video capture using OpenCV, set up variables to track carrot detections, and define a threshold for detection.

### 5. Process Live Video Stream
Capture frames from the video stream, classify each frame for carrot detection, and display results in real-time.

### 6. Save the Recorded Frames
Save frames with detected carrots for further analysis or verification.

## Future Work

- **Performance Optimization:** Improve frame processing speed and model inference time.
- **Robustness:** Enhance model accuracy in varying lighting and background conditions.
- **Scalability:** Develop a more scalable solution for deployment in real-world grocery store environments.

## Demo

For a demonstration of the toy implementation showcasing fundamental classification concepts, please refer to the accompanying notebook or code file.
