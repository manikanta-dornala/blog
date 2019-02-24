---
layout: post
title: 'Counting Steps: Building A Pedometer'
date: 2019-02-18
excerpt: "Lets build a step counter based on some of the sensors that your phone already has."
comments: true
mathjax: true
tags: pedometer smartphones sensors accelerometer
---

We'll look at what sensors we can use and how to utilize them to build a approximate pedometer. In doing so we have we will need to first collect data we want to analyze. The Google Science Journal app (You can find the apps for both [android](https://play.google.com/store/apps/details?id=com.google.android.apps.forscience.whistlepunk&hl=en) and [iPhone](https://itunes.apple.com/us/app/science-journal-by-google/id1251205555?mt=8)) is a one stop shop for all the data we need. For our purposes we'll be interested in the accelerometer data. Some tutorials on how to do this [youtube](https://www.youtube.com/watch?v=YI8XYdCrayc), [science journal](https://sciencejournal.withgoogle.com/experiments/getting-started-with-science-journal). Accelerometers in smartphones measure the acceleration in 3 directions. We'll need all three of them. 

In the end it looks something like this

```
relative_time,AccX,AccY,AccZ
0,0.05673202514648438,4.439168701171875,8.586444396972656
37,-0.22348526000976562,4.772226104736329,8.122559051513672
107,0.48978149414062505,4.684807891845703,8.330476684570312
170,1.248852996826172,4.301155700683594,8.025411071777345
237,0.6289920043945313,5.702242126464844,7.885452117919923
309,1.6706758117675782,4.119283905029297,7.433092803955079
370,3.0635293579101566,2.3848406982421877,8.871451721191407
437,6.83299072265625,5.955964508056641,4.270619201660156
507,1.0451266479492187,3.6732115173339848,9.447753295898439
```


We took two kinds of readings, since accelerometer measures 3 directions it matters the way how you hold your phone. Below are plots of acceleration in the three direction over time for the two sets.


<div class="row">
    <div class="col-md-5">
        <figure class="figure">
            <img src="/images/2019-02-18-counting-steps/walking_1_steps_original.svg" width="100%">
            <figcaption class="figure-caption ">Walking steps 1 - phone placed in pocket</figcaption>
        </figure>
    </div>
    <div class="col-md-5">
        <figure class="figure">
            <img src="/images/2019-02-18-counting-steps/walking_2_steps_original.svg" width="100%">
            <figcaption class="figure-caption ">Walking steps 2 - phone held in hand</figcaption>
        </figure>
    </div>
</div>

The first set of step data  was collected with the phone in a pocket with the camera facing up. Based on the frame of reference used by the phone accelerometer, this means gravity is mostly acting in the $y$ (orange) direction. As you can see the $y$ component of the acceleration centered approximately around $9.8 m/s^2 \approx 1g$. 

The second set of step data was collected with the phone in hand, with the camera facing parallel to the floor. Since the phone is more steady in this position, each component of the acceleration is more consistent and distinct. Gravity is also now acting almost entirely in the $x$ (blue) direction, so the $x$ component of the acceleration is centered around $1g$.



## Sampling Rate

These sensors have a sampling rate, as in the number of times they record the acceleration values in a second.

This figure shows the distribution in differences between the relative times of consecutive samples. 


<h4>Walking Steps 1</h4>
<div class="row">
    <div class="col-md-5">
        <figure class="figure">
            <img src="/images/2019-02-18-counting-steps/walking_1_steps_sampling_rate.svg" width="100%">
            <figcaption class="figure-caption ">Sampling Rate</figcaption>
        </figure>
    </div>
    <div class="col-md-5">
        <figure class="figure">
            <img src="/images/2019-02-18-counting-steps/walking_1_steps_sampling_rate_dist.svg" width="100%">
            <figcaption class="figure-caption ">Sampling Rate Distribution</figcaption>
        </figure>
    </div>
</div>

<h4>Walking Steps 2</h4>
<div class="row">
    <div class="col-md-5">
        <figure class="figure">
            <img src="/images/2019-02-18-counting-steps/walking_2_steps_sampling_rate.svg" width="100%">
            <figcaption class="figure-caption ">Sampling Rate</figcaption>
        </figure>
    </div>
    <div class="col-md-5">
        <figure class="figure">
            <img src="/images/2019-02-18-counting-steps/walking_2_steps_sampling_rate_dist.svg" width="100%">
            <figcaption class="figure-caption ">Sampling Rate Distribution</figcaption>
        </figure>
    </div>
</div>


The distribution is tight, indicating that the sampling rate has a small variance. This is confirmed by calculating the standard deviation to be 3.93 (around a mean of 66) implying a sampling rate of $15.08\pm 0.5 Hz$.
Examining the recorded data shows us that 1131 samples were recorded in 75 seconds. This gives us a sampling rate of $\frac{1131}{75} = 15.08\text{Hz}$

Our sampling rate in both the experiments is fairly constant as per the distributions. This allows us to assume the correctness of readings without any changes. Most people take fewer than 7 steps per second when walking normally, we are sampling at twice that rate, seems sufficient.


