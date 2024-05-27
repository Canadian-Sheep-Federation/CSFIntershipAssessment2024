import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_openml
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn import metrics
from PIL import Image

def resize_images(images, new_size=(7,7)):
    transformed_img = []
    for image in images:
        im = Image.fromarray(image.reshape(28, 28).astype(np.uint8), mode='L')
        im_resized = im.resize(new_size)
        transformed_img.append(np.array(im_resized).flatten())
    return transformed_img

def load_mnist(downsample=False):
    data, target = fetch_openml('mnist_784', return_X_y=True)
    data, target = data.to_numpy(), target.to_numpy()
    if downsample:
        data = resize_images(data)
    return data, target

def train(data, target, train_size):
    X_train, X_test, Y_train, Y_test = train_test_split(data, target, train_size=train_size)

    clf = SVC(kernel='rbf', class_weight='balanced')
    clf.fit(X_train, Y_train)
    train_y_pred = clf.predict(X_train)
    test_y_pred = clf.predict(X_test)

    return (Y_train, train_y_pred), (Y_test, test_y_pred)

def bootstrap(data, target, sample_size, train_size, bootstrap_iterations):
    train_accuracies = []
    test_accuracies = []

    # Iterating N times
    for i in range(1, bootstrap_iterations + 1):
        # Taking a random sample of entire dataset
        train_sample, _, test_sample, _ = train_test_split(data, target, train_size=sample_size, stratify=target)
        
        # Test
        train_res, test_res = train(train_sample, test_sample, train_size)

        # Store accuracy per iteration
        train_accuracy = 100 * metrics.accuracy_score(train_res[0], train_res[1])
        train_accuracies.append(train_accuracy)

        test_accuracy = 100 * metrics.accuracy_score(test_res[0], test_res[1])
        test_accuracies.append(test_accuracy)
    # print(f"Accuracy {i}: {accuracy:.3f}")
    
    # Calculate 95% confidence interval and avg accuracy
    train_average_accuracy = np.mean(train_accuracies)
    train_lower_bound = np.percentile(train_accuracies, 2.5)
    train_upper_bound = np.percentile(train_accuracies, 97.5)

    test_average_accuracy = np.mean(test_accuracies)
    test_lower_bound = np.percentile(test_accuracies, 2.5)
    test_upper_bound = np.percentile(test_accuracies, 97.5)

    return (train_average_accuracy, train_lower_bound, train_upper_bound), (test_average_accuracy, test_lower_bound, test_upper_bound)

def graph_confidence_intervals(stats):
    plt.figure(figsize=(14, 10))
    categories = ["Original MNIST (train)", "Original MNIST (test)", "Low-res MNIST (train)", "Low-res MNIST (test)"]

    for i, (average_accuracy, lower_bound, upper_bound) in enumerate(stats):
        print(f"  - Statistics for {categories[i].split()[0].lower()} MNIST:")
        print(f"    - Average accuracy: {average_accuracy}")
        print(f"    - 95% CI: {lower_bound:.3f} - {upper_bound:.3f}")
        print()
        error = [[average_accuracy - lower_bound], [upper_bound - average_accuracy]]

        plt.bar(categories[i], average_accuracy, yerr=error, label=categories[i])

    plt.ylim(92.0, 98.0)
    plt.title('SVM Accuracy on MNIST Dataset with Estimated 95% Confidence Interval')
    plt.ylabel('Accuracy (%)')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.legend()
    plt.savefig(f"SVM_graph.png")
    # plt.show()

def run(sample_size, train_size, bootstrap_iterations):
    # Load dataset
    orig_data, orig_target = load_mnist()
    low_res_data, low_res_target = load_mnist(downsample=True)

    # Run bootstrap for both dataset to obtain average accuracy and CI
    print("Running bootstrap resampling on original MNIST")
    original_mnist_values_train, original_mnist_values_test = bootstrap(orig_data, orig_target, sample_size, train_size, bootstrap_iterations)

    print("\nRunning bootstrap resampling on low-res MNIST")
    low_res_mnist_values_train, low_res_mnist_values_test = bootstrap(low_res_data, low_res_target, sample_size, train_size, bootstrap_iterations)
    stats = [
        # Returns (avg, lower_bound, upper_bound) each
        original_mnist_values_train,
        original_mnist_values_test,
        low_res_mnist_values_train,
        low_res_mnist_values_test
    ]
    print("\nAverage and confidence intervals for both MNIST")
    graph_confidence_intervals(stats)

if __name__ == "__main__":
    # Hyperparameters
    sample_size = 10000
    train_size = 0.6
    bootstrap_iterations = 10

    run(sample_size, train_size, bootstrap_iterations)