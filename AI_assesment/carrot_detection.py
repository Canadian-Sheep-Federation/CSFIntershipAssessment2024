import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.transforms as transforms
from PIL import Image
import cv2

# Define the CNN model
class CarrotClassifier(nn.Module):
    def __init__(self):
        """
        - Convolutional Layers: 
            Capture features from the images at different levels of abstraction.

        - Max Pooling Layers: 
            Reduce spatial dimensions, helping to reduce computation and control overfitting.

        - Fully Connected Layers: 
            Combine the features to make a final classification decision.

        - ReLU Activation: 
            Introduce non-linearity to help the network learn complex patterns.

        - Sigmoid Activation: 
            Suitable for binary classification, providing output as a probability between 0 and 1.
        """

        # Initialize the parent class (nn.Module) CarrotClassifier is inheriting from
        super().__init__()
        
        # 1st convolutional layer
        self.conv1 = nn.Conv2d(3, 16, 3, 1)
        
        # 2nd convolutional layer
        self.conv2 = nn.Conv2d(16, 32, 3, 1)
        
        # Max pooling layer
        self.pool = nn.MaxPool2d(2, 2)
        
        # 1st fully connected layer
        self.fc1 = nn.Linear(32 * 30 * 30, 32)
        
        # 2nd fully connected layer (output layer)
        self.fc2 = nn.Linear(32, 1)
        
        # Sigmoid activation for the final output
        self.sigmoid = nn.Sigmoid()


    def forward(self, x):
        # Apply 1st convolutional layer followed by ReLU activation and max pooling
        x = self.pool(torch.relu(self.conv1(x)))
        
        # Apply 2nd convolutional layer followed by ReLU activation and max pooling
        x = self.pool(torch.relu(self.conv2(x)))
        
        # Flatten the output from the conv layers
        x = x.view(-1, 32 * 30 * 30)
        
        # Apply 1st fully connected layer followed by ReLU activation
        x = torch.relu(self.fc1(x))
        
        # Apply 2nd fully connected layer followed by sigmoid activation
        x = self.sigmoid(self.fc2(x))
        
        return x


# Function to load the model
def load_model(model_path):
    model = CarrotClassifier()

    # Load model parameters (weights) from the state dictionary
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    
    # set model to evaluation mode for inference
    model.eval()
    return model


# Function to preprocess the image
def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((128, 128)),          # Resize the image to 128x128
        transforms.ToTensor(),                  # Convert the image to a PyTorch tensor
        transforms.Normalize((0.5,), (0.5,))    # Normalize the image with mean 0.5 and std 0.5
    ])
    
    # Convert the image from BGR (OpenCV format) to RGB (PIL format) and apply transformations
    image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
   
    return transform(image).unsqueeze(0) # Add a batch dimension and return


# Function to predict using the model
def predict(image, model):
    image = preprocess_image(image)

    # Disable gradient calculation for inference
    with torch.no_grad():               
        output = model(image)
    return output.item()        # Return the output as a float
