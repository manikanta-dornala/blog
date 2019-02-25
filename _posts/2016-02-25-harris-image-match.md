---
layout: post
title: "Harris Point Detection and Image Matching"
date: 2016-02-25
excerpt: "How well can we compare two images?"
comments: true
tags: image-processing interest-points feature-descriptors
feature: "/images/2016-02-25-harris-image-match/feature.jpg"
---

<!-- # Harris Point Detection and Image Matching -->

<!-- ## Overview -->

Image matching is an intersting problem. One of the many ways to do so is to pick some interest points in the images and compare them. If such interest points 
match its probable that the images match. By match we don't mean an exact match, just that the images are speaking of the same scene or the same subject from 
a different view point.

### Interest Point Detection
Interest point detection is done by creating a gradient matrix and choose a window around every pixel and generate the Harris matrix for this window.

Then we apply a threshold on the eigen values to obtaing harris responses, which are then checked for local maxima and noted as a corner.

Instead of solving for eigen values we use the Harris operator to threshold. By the end of this process we have the interest points in images of interest

### Feature Descriptor
We’ll now charaterise every Harris Point with a feature descriptor.

The feature in this case is a Histogram Vector, whose bins denote the direction of gradients.

We’ll use the histogram values as feature coordinates of every point. (Bin size * Patch size)

### Image Matching
We’ll now compute distance between every Interest point in template with Interest points in the second and find the one whose distance is the lowest and second lowest.

We now take a ratio of second smallest to first smallest and threshold it obtain only those matches which aren’t ambiguos.  

### Results
Here, the above matching has been performed on various images and the results vary widely over thresholds.

The first threshold on Harris Response seems to have an asymptotic decay on the number of matches obtained.

The threshold on ratio affects the matches exponentially too.

<img src="https://github.com/manikantareddyd/Harris_Corner_Image_Matcher/raw/master/res/1.png">

<img src="https://github.com/manikantareddyd/Harris_Corner_Image_Matcher/raw/master/res/2.PNG">

<img src="https://github.com/manikantareddyd/Harris_Corner_Image_Matcher/raw/master/res/3.PNG">


### Tests
These are some of the images the tests were run on. The blue lines correspond to two interest points in different pictures that are probably very much the same. 
In other words the two ends of a blue line are interest points in different images that are same.

#### SET 1
<img src="https://github.com/manikantareddyd/Harris_Corner_Image_Matcher/raw/master/res/11.PNG">

+ Threshold: 1000000
+ Ratio: 1.15  
+ Matches: 13
+ Corners in 1: 4081     
+ Corners in 2: 4090

#### SET 2
<img src="https://github.com/manikantareddyd/Harris_Corner_Image_Matcher/raw/master/res/12.PNG">

+ Threshold: 1000000  
+ Ratio: 1.2   
+ Matches: 44
+ Corners in 1: 6206  
+ Corners in 2: 3895

#### SET 3
<img src="https://github.com/manikantareddyd/Harris_Corner_Image_Matcher/raw/master/res/13.PNG">

+ Threshold: 10000000  
+ Ratio: 1.15   
+ Matches: 12
+ Corners in 1: 2854  
+ Corners in 2: 33  


As can be seen the results are very good set 2, as could be estimated because the images are very familiar orthographically.  

But in set 3 although locational similarity is good, the bluring of image has caused too much loss of information for the SIFT feature descriptor to encode.

The first one has too many ambiguos matches to choose from, hence it goes hay wire in correctly pairing up the interest points, although it does some very good matches

<h2> Fork the code </h2>

<a href="https://github.com/ManikantaReddyD/Harris_Corner_Image_Matcher" target="_blank"><i class="fa fa-3x fa-github"></i></a>