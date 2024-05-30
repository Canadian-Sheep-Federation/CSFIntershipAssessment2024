import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from carrot_detection import CarrotClassifier

# Define transformations for training and validation
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# Load datasets
train_dataset = datasets.ImageFolder(root='Vegetable_Images/train/', transform=transform)
val_dataset = datasets.ImageFolder(root='Vegetable_Images/validation/', transform=transform)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

# Verify the labels
# Should output: {'broccoli': 0, 'carrots': 1} (depending on alphabetical order)
print(train_dataset.class_to_idx)  

# Initialize the model, loss function, and optimizer
model = CarrotClassifier()
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 10
for epoch in range(num_epochs):
    model.train()                                   # Set the model to training mode
    running_loss = 0.0
    for inputs, labels in train_loader:
        labels = labels.float().unsqueeze(1)        # Convert labels to float and add a dimension
        optimizer.zero_grad()                       # Zero the parameter gradients
        outputs = model(inputs)                     # Forward pass
        loss = criterion(outputs, labels)           # Compute the loss
        loss.backward()                             # Backward pass
        optimizer.step()                            # Optimize the model parameters
        running_loss += loss.item()                 # Accumulate the loss

    print(f'Epoch {epoch+1}/{num_epochs}, Loss: {running_loss/len(train_loader)}')

    # Validation step
    model.eval()                                    # Set the model to evaluation mode
    val_loss = 0.0
    with torch.no_grad():                           # Disable gradient calculation for validation
        for inputs, labels in val_loader:
            labels = labels.float().unsqueeze(1)    # Convert labels to float and add a dimension
            outputs = model(inputs)                 # Forward pass
            loss = criterion(outputs, labels)       # Compute the loss
            val_loss += loss.item()                 # Accumulate the loss

    print(f'Validation Loss: {val_loss/len(val_loader)}')

# Save the trained model parameters
torch.save(model.state_dict(), 'carrot_classifier.pth')
