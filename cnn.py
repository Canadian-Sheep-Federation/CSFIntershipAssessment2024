import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from torch.utils.data import DataLoader, Subset
import torchvision.datasets as datasets
import torchvision.transforms as transforms
import matplotlib.pyplot as plt
import numpy as np

class CNN(nn.Module):
    def __init__(self, img_size = 28, in_channels = 1, num_classes = 10,):
        super(CNN, self).__init__()

        self.conv1 = nn.Conv2d(in_channels=in_channels, out_channels=16, kernel_size=(3,3), stride=(1,1), padding=(1,1)) # implemented 'Same padding'
        self.pool = nn.MaxPool2d(kernel_size=(2,2), stride=(2,2)) # half dim-size
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=(3,3), stride=(1,1), padding=(1,1))
        output_dim = (img_size // 2) // 2 
        self.fc1 = nn.Linear(32*output_dim*output_dim, num_classes)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = self.pool(x)
        x = F.relu(self.conv2(x))
        x = self.pool(x)
        x = x.reshape(x.shape[0], -1)
        x = self.fc1(x)
        return x


class Mnist_cnn():
    def __init__(self, img_size, train_dataset, test_dataset, num_epochs, learning_rate, batch_size):
        # Set device
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

        # Hyperparameters
        self.img_size = img_size # Not really a hyperparam
        self.batch_size = batch_size
        self.num_epochs = num_epochs

        # Load Data
        self.train_loader = DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)
        self.test_loader = DataLoader(dataset=test_dataset, batch_size=batch_size, shuffle=True)

        # Initialize network
        self.model = CNN(img_size=img_size, in_channels=1, num_classes=10).to(self.device)

        # Loss and optimizer
        self.criterion = nn.CrossEntropyLoss() # Implements softmax first
        self.optimizer = optim.Adam(self.model.parameters(), lr=learning_rate)

    def train(self):
        self.train_loss = []
        self.validation_loss = []

        # Train Network
        for epoch in range(1, self.num_epochs + 1):
            training_step_loss = []
            validation_step_loss = []

            # Train and calculate train loss
            self.model.train()
            for batch_idx, (data, target) in enumerate(self.train_loader):
                data = data.to(device=self.device)
                target = target.to(device=self.device)

                # Forward
                outputs = self.model(data)
                training_loss = self.criterion(outputs, target)

                # backward
                self.optimizer.zero_grad() # Set all gradients to zero (for each batch)
                training_loss.backward() # computes gradients

                # Gradient descent
                self.optimizer.step() # updates weights

                training_step_loss.append(training_loss.item())
            
            self.train_loss.append(np.mean(training_step_loss))

            # Calculate validation loss
            self.model.eval()
            with torch.no_grad():
                for batch_idx, (data, target) in enumerate(self.test_loader):
                    data = data.to(device=self.device)
                    target = target.to(device=self.device)

                    # Forward pass
                    outputs = self.model(data)
                    validation_loss = self.criterion(outputs, target)

                    validation_step_loss.append(validation_loss.item())

            self.validation_loss.append(np.mean(validation_step_loss))

            print(f'  Epoch {epoch}, training loss: {training_loss}')

    # Check accuracy on training & test
    def check_accuracy(self, test_loader = None):
        if test_loader is not None:
            loader = test_loader
        else:
            loader = self.test_loader

        num_correct = 0
        num_samples = 0
        self.model.eval() # sets model to eval mode

        with torch.no_grad(): # No need to compute gradients for accuracy calc
            for x, y in loader:
                x = x.to(device=self.device)
                y = y.to(device=self.device)
                
                output = self.model(x) # 64x10
                _, predictions = output.max(1) # taking max of cols (now 64x1)
                num_correct += (predictions == y).sum()
                num_samples += predictions.size(0) # num of rows

            accuracy = 100*float(num_correct/float(num_samples))
            # print(f"Got {num_correct} / {num_samples} with accuracy {accuracy:.2f}")

            return accuracy
    
    def graph_epoch_loss(self):
        epochs = range(1, len(self.train_loss) + 1)
        if self.img_size == 28:
            title = "Fashion (28x28)"
        else:
            title = "Low-res (7x7)"

        plt.figure(figsize=(10, 14))

        plt.plot(epochs, self.train_loss, label='Training Loss', marker='o')
        plt.plot(epochs, self.validation_loss, label='Validation Loss', marker='x')

        plt.title(f'{title} Training and Validation Loss')
        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.legend()
        plt.grid(True)
        # plt.show()
        plt.savefig(f"CNN_{title.split()[0]}_epochs.png")

def bootstrap(img_size, train_dataset, test_dataset, num_epochs, learning_rate, batch_size, bootstrap_iterations):
    accuracies = []
    num_samples = len(test_dataset)

    for i in range(1, bootstrap_iterations + 1):
        print(f"\nBootstrap sample {i} / {bootstrap_iterations}:")
        mnist_cnn = Mnist_cnn(img_size, train_dataset, test_dataset, num_epochs, learning_rate, batch_size)

        # Randomly sample indices with replacement
        indices = torch.randint(low=0, high=num_samples, size=(num_samples,))
        subset = Subset(test_dataset, indices)
        subset_loader = DataLoader(subset, batch_size=batch_size)

        mnist_cnn.train()
        accuracy = mnist_cnn.check_accuracy(subset_loader)
        accuracies.append(accuracy)

    # Calculate average & 95% confidence interval
    average_accuracy = np.mean(accuracies)
    average_accuracy = np.mean(accuracies)
    lower_bound = np.percentile(accuracies, 2.5)
    upper_bound = np.percentile(accuracies, 97.5)
    return average_accuracy, lower_bound, upper_bound

def graph_confidence_intervals(stats):
    plt.figure(figsize=(14, 10))
    categories = ["Fashion (28x28 pixels)", "Low-res (7x7 pixel)"]

    for i, (average_accuracy, lower_bound, upper_bound) in enumerate(stats):
        print(f"  - Statistics for {categories[i].split()[0].lower()} MNIST:")
        print(f"    - Average accuracy: {average_accuracy}")
        print(f"    - 95% CI: {lower_bound:.3f} - {upper_bound:.3f}")
        print()
        error = [[average_accuracy - lower_bound], [upper_bound - average_accuracy]]

        plt.bar(categories[i], average_accuracy, yerr=error, label=categories[i])

    plt.ylim(85.0, 100.0)
    plt.title('CNN Accuracy on MNIST Dataset with Estimated 95% Confidence Interval')
    plt.ylabel('Accuracy (%)')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.legend()
    # plt.show()
    plt.savefig('CNN_CI.png')

def run(num_epochs, learning_rate, batch_size, bootstrap_iterations):
    # fashion MNIST 
    train_dataset = datasets.FashionMNIST(root='dataset/', train=True, transform=transforms.ToTensor(), download=True)
    test_dataset = datasets.FashionMNIST(root='dataset/', train=False, transform=transforms.ToTensor(), download=True)

    # Low-res MNIST
    low_res_train_dataset = datasets.MNIST(root='dataset/', train=True, transform=transforms.ToTensor(), download=True)
    low_res_test_dataset = datasets.MNIST(root='dataset/', train=False, transform=transforms.ToTensor(), download=True)

    resize_transform = transforms.Resize((7, 7))
    low_res_train_dataset = [(resize_transform(image), label) for image, label in low_res_train_dataset]
    low_res_test_dataset = [(resize_transform(image), label) for image, label in low_res_test_dataset]

    # Graph the epoch loss for fashion and transformed img
    print("Generating epoch loss graph for fashion MNIST:")
    mnist_cnn_original = Mnist_cnn(28, train_dataset, test_dataset, num_epochs, learning_rate, batch_size)
    mnist_cnn_original.train()
    mnist_cnn_original.graph_epoch_loss()
    print("Graph created!")

    print("\nGenerating epoch loss graph for low-res MNIST:")
    mnist_cnn_resized = Mnist_cnn(7, low_res_train_dataset, low_res_test_dataset, num_epochs, learning_rate, batch_size)
    mnist_cnn_resized.train()
    mnist_cnn_resized.graph_epoch_loss()
    print("Graph created!")

    # Graph the confidence intervals for original and transformed img
    print("\nRunning bootstrap resampling on fashion MNIST")
    original_mnist_values = bootstrap(28, train_dataset, test_dataset, num_epochs, learning_rate, batch_size, bootstrap_iterations)

    print("\nRunning bootstrap resampling on low-res MNIST")
    low_res_mnist_values = bootstrap(7, low_res_train_dataset, low_res_test_dataset, num_epochs, learning_rate, batch_size, bootstrap_iterations)
    stats = [
        # Returns (avg, lower_bound, upper_bound) each
        original_mnist_values,
        low_res_mnist_values
    ]
    print("\nAverage and confidence intervals for both MNIST")
    graph_confidence_intervals(stats)
    print("Graph created!")

if __name__ == "__main__":
    # Hyperparameters
    num_epochs = 5
    learning_rate = 0.001
    batch_size = 32
    bootstrap_iterations = 5

    run(num_epochs, learning_rate, batch_size, bootstrap_iterations)