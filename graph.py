#!/usr/bin/env python3
import cnn, svm

# NOTE: I already pre-ran the graphs and stored the images in 100_iteration_results folder. But feel free to adjust the hyperparameters and run yourself 


# Graph results for CNN (three graphs saved as png images in the same directory)
"""
Set Hyperparameters for CNN
    - num_epochs -> number of epochs for each training set

    - learning_rate -> learning rate used for optimizer

    - batch_size -> number of samples used to update gradient descent (using mini-batch gradient descent method)

    - bootstrap_iteration -> Number of iterations used to perform bootstrap resampling to calculate average accuracy and confidence intervals
"""
# Hyperparameters
num_epochs = 10
learning_rate = 0.001
batch_size = 32
bootstrap_iterations = 10

print("\nRunning CNN model for fashion and low-res MNIST dataset\n")
cnn.run(num_epochs, learning_rate, batch_size, bootstrap_iterations)

# Graph results for SVM (one graph saved as a png image in the same directory)
"""
Set Hyperparameters for SVM
    - sample_size -> Takes a subset of the dataset

    - train_size -> Specifies percentage split between training samples and test samples

    - bootstrap_iterations -> Number of iterations used to perform bootstrap resampling to calculate average accuracy and confidence intervals
"""
# Hyperparameters
sample_size = 10000
train_size = 0.6
bootstrap_iterations = 10

print("\nRunning SVM model for original and low-res MNIST dataset\n")
svm.run(sample_size, train_size, bootstrap_iterations)