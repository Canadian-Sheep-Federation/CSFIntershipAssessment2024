# Background

As an AI Development Intern at the CSF, you will be tasked with
developing pipelines.

# Assessment

Please answer the following questions in a jupyter notebook. You should
only spend about two hours on these questions. If you want to spend more
you can. If you\'ve run out of time, please describe thoroughly what
remains to be done and how you would accomplish it.

## Processing Video Pipeline

Assume you have a working ML model that can process individual images and identify carrots, how would you adapt that model such that you could feed it live video inside a grocery store and have it create a record of any carrots it sees.

Would would use R-CNN model to train carrot classification:
    - Compute and flatten CNN feature maps -> pass into fully connected NN for classification. Since we are classifying either carrot or no carrot we can use sigmoid activation function here.
    - You would also need to pass the flattened CNN feature maps into another neural network to train the boundary boxes
      - This would require you to use a selective search algorithm to compute potential boundary regions
    - You can measure performance for classification by calculating accuracy
    - As for measuring performance of the boundary boxes, you will need to calculate the mean average precision at a certain thresholds

- Once is the model is trained and ready, I would capture frames of the video feed, preprocess those frames (resizing, normalizing, etc), then feed the frame into the model

- In all likelihood, I would just use sota model (like YOLOv5) for carrot detection instead

## Demo

Write a toy implementation of whatever machine learning concept you
would like in order to demonstrate your skills. This doesn\'t need to be
in the notebook if you want to use something other than python.

The problems we work on are wholly related to classfication, so your toy implementation should show knowledge of the fundamentals of classification problems.

# Submission

Fork this repository and once you\'ve completed the above questions,
create a pull request to merge your fork with the original repository.
