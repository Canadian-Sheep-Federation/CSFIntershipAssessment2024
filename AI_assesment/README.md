# AI Assesment

## Implementation 

For demonstating the video classificaiton pipeline, I have implemented a simple carrot classifier using a CNN to detect if an image has a carrot within it or not. I extended this to a video input by simply applying the model to each frame and summing the outputs. 

## Limitations & Future Considerations

This current implementation has several drawbacks however, the same carrot in successive frames will be counted multiple times, the model currently does not have the capacity to count the number of carrots in each frame, and the model is only trained on images of carrots and broccoli. These problems can be solved in the future by, for example, using a more computer vision based tracking approach and broadening the pool of data (include images that are similar to carrots, e.g. oranges).

## Citations

For the model training I used a subset of the publically available dataset cited below.

@inproceedings{ahmed2021dcnn,
title={DCNN-based vegetable image classification using transfer learning: A comparative study},
author={Ahmed, M Israk and Mamun, Shahriyar Mahmud and Asif, Asif Uz Zaman},
booktitle={2021 5th International Conference on Computer, Communication and Signal Processing (ICCCSP)},
pages={235--243},
year={2021},
organization={IEEE}
}