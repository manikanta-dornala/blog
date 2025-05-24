---
layout: post
title: "Cats or Dogs"
date: 2016-04-11
excerpt: "In this experiment we'll train a machine to distinguish between cats and dogs. We'll be using Support vector machines for the same."
comments: true
tags: ai machine-learning binary-classification random-forests
feature: "{{ site.url }}{{ site.baseurl }}/images/2016-04-11-cats-or-dogs/feature.jpg"
---

<!-- +++++ Post +++++ -->

<p>
A support vector machine find the best possible seperating hyperplane between two seperable classes.
In this case our two classes are dogs and cats. There are subclasses too, but lets just look at the global picture
</p>

<p>
The data set consists of Bag of visual words representation of a few animals. These representations can be considered for our purpose as feature vectors. We'll take about only 2000 animals out of all for all our training purposes and about 500 for testing. As solving the SVM optimization problem is a bit computationally expensive we are bringing down the number of data points. Of course this will affect the results but we hope that the overall trends remain the same.

</p>
<p>
Also we won't be using libSVM to do our bidding, instead we'll use sklearn. It does contain all the general purpose kernels except the intersection kernel which isn't hard to implement on our own.
</p>
<p>
But there is a catch here. The purpose of using intersection kernel is to speed up the process of computation by using a trick, this is not possible in my implementation :(. Please refer to <a href="https://web.stanford.edu/group/mmds/slides2008/malik.pdf" target="_blank">these slides</a> by Prof Jitendra Malik for more information on how using intersection kernel can speed up computation speed.
</p>

<p>The first thing we do is to normalize the feature vectors by their 2nd norm. Essentially project all the vectors onto a unit sphere.

<p>
We then use an Intersection kernel with the same.
</p>
<center>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
<tr>
<th class="tg-yw4l">Class</th>
<th class="tg-yw4l">precision</th>
<th class="tg-yw4l">recall</th>
<th class="tg-yw4l">f1-score</th>
<th class="tg-yw4l">support</th>
</tr>
<tr>
<td class="tg-yw4l">cat</td>
<td class="tg-yw4l">0.66</td>
<td class="tg-yw4l">0.52</td>
<td class="tg-yw4l">0.58</td>
<td class="tg-yw4l">872</td>
</tr>
<tr>
<td class="tg-yw4l">dog</td>
<td class="tg-yw4l">0.68</td>
<td class="tg-yw4l">0.79</td>
<td class="tg-yw4l">0.73</td>
<td class="tg-yw4l">1123</td>
</tr>
<tr>
<td class="tg-yw4l">total</td>
<td class="tg-yw4l">0.67</td>
<td class="tg-yw4l">0.67</td>
<td class="tg-yw4l">0.67</td>
<td class="tg-yw4l">1995</td>
</tr>
</table>
</center>
<p>
The next thing we did was to try normalizing with sum
</p>
<center>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
<tr>
<th class="tg-yw4l">Class</th>
<th class="tg-yw4l">precision</th>
<th class="tg-yw4l">recall</th>
<th class="tg-yw4l">f1-score</th>
<th class="tg-yw4l">support</th>
</tr>
<tr>
<td class="tg-yw4l">cat</td>
<td class="tg-yw4l">0</td>
<td class="tg-yw4l">0</td>
<td class="tg-yw4l">0</td>
<td class="tg-yw4l">872</td>
</tr>
<tr>
<td class="tg-yw4l">dog</td>
<td class="tg-yw4l">0.56</td>
<td class="tg-yw4l">1</td>
<td class="tg-yw4l">0.72</td>
<td class="tg-yw4l">1123</td>
</tr>
<tr>
<td class="tg-yw4l">total</td>
<td class="tg-yw4l">0.32</td>
<td class="tg-yw4l">0.56</td>
<td class="tg-yw4l">0.41</td>
<td class="tg-yw4l">1995</td>
</tr>
</table>
</center>
<p>
Interestingly the results are very different.
</p>
<p>Infact there seems to be no learning when using L1 norm. It can be seen that all the animals have been labeled as dogs and none of the cat features were even learned.
<p>
Turns out 2nd norm is good for weighted and correlated measurements as is in this case. sum norm can be used in cases where we need to clean out gross errors in the data. (May Be!)
</p>
<h3> Tuning the Regularization Parameter </h3>
<p>
SVM solution also involves tuning a regularization parameter (C) to allow for a bit of flexibility in the sepearting hyper plane.
</p>
<p>
Before tuning C we've set the kernel to be an Intersection kernel.
</p>
<p>
Now lets vary C

<center>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
<tr>
<th class="tg-yw4l">C</th>
<th class="tg-yw4l">Precision</th>
<th class="tg-yw4l">Recall</th>
</tr>

<tr>
<td class="tg-yw4l">0.1</td>
<td class="tg-yw4l">0.659</td>
<td class="tg-yw4l">0.689</td>
</tr>
<tr>
<td class="tg-yw4l">10</td>
<td class="tg-yw4l">0.654</td>
<td class="tg-yw4l">0.707</td>
</tr>
<tr>
<td class="tg-yw4l">20</td>
<td class="tg-yw4l">0.658</td>
<td class="tg-yw4l">0.708</td>
</tr>
<tr>
<td class="tg-yw4l">50</td>
<td class="tg-yw4l">0.654</td>
<td class="tg-yw4l">0.71</td>
</tr>
<tr>
<td class="tg-yw4l">100</td>
<td class="tg-yw4l">0.654</td>
<td class="tg-yw4l">0.709</td>
</tr>
</table>
</center>
<p>
There doesn't seem to be any scope of improvement! Why would this be so?
<p>
This suggests us that while using the intersection kernel there aren't many points that need relaxing on the other side of the hyperplane. In a way there are few points that need to allowed to be on the other side of the classifying barrier.
</p>
<p>
Lets proceed further with our experiments.
<h3>Tuning the smoothness Parameter</h3>
<p>While using a laplacian kernel we can vary the gamma of the laplacian! It decides how much smoothing it will cause over the data.
<p>
<center>

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
<tr>
<th class="tg-yw4l">G</th>
<th class="tg-yw4l">Precision</th>
<th class="tg-yw4l">Recall</th>
</tr>
<tr>
<td class="tg-yw4l">0.0001</td>
<td class="tg-yw4l">0.712</td>
<td class="tg-yw4l">0.804</td>
</tr>
<tr>
<td class="tg-yw4l">0.002</td>
<td class="tg-yw4l">0.541</td>
<td class="tg-yw4l">0.99</td>
</tr>
<tr>
<td class="tg-yw4l">0.1</td>
<td class="tg-yw4l">0.541</td>
<td class="tg-yw4l">0.98</td>
</tr>
<tr>
<td class="tg-yw4l">1</td>
<td class="tg-yw4l">0.541</td>
<td class="tg-yw4l">0.99</td>
</tr>
</table>

</center>
<p>Just look at the recall rates. Almost everything is recalled. It seems that lowering gamma increases the accuracy. More experimentation was done by fine tuning gamma near 0.0001 but the data is currently lost due to a mistake.
<p>Lets also look into other methods.

<h3> Random Forests</h3>
A Random forest classifier with 100 estimators.
<center>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
<tr>
<th class="tg-yw4l">Class</th>
<th class="tg-yw4l">precision</th>
<th class="tg-yw4l">recall</th>
<th class="tg-yw4l">f1-score</th>
<th class="tg-yw4l">support</th>
</tr>

<tr>
<td class="tg-yw4l">0</td>
<td class="tg-yw4l">0.58</td>
<td class="tg-yw4l">0.33</td>
<td class="tg-yw4l">0.43</td>
<td class="tg-yw4l">212</td>
</tr>
<tr>
<td class="tg-yw4l">1</td>
<td class="tg-yw4l">0.63</td>
<td class="tg-yw4l">0.82</td>
<td class="tg-yw4l">0.71</td>
<td class="tg-yw4l">288</td>
</tr>
<tr>
<td class="tg-yw4l">avg</td>
<td class="tg-yw4l">0.61</td>
<td class="tg-yw4l">0.62</td>
<td class="tg-yw4l">0.59</td>
<td class="tg-yw4l">500</td>
</tr>
</table>

</center>
<p>
Random forest in general seem faster and better than using a SVM for this particular problem.
<p>
The below graph suggests that even Random Forests saturate at around 60% accuracy.

<center>
    <img src="{{ site.url }}{{ site.baseurl }}/images/2016-04-11-cats-or-dogs/RFC.png" style="width:50%" />
</center>

<h3> Multiclass Classification</h3>
<p>
Now lets look into finer splitting of data...
<p>
This is the classification report for leopard vs tiger.
Using a RandomForestClassifier
<center>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
<tr>
<th class="tg-yw4l">Class</th>
<th class="tg-yw4l">precision</th>
<th class="tg-yw4l">recall</th>
<th class="tg-yw4l">f1-score</th>
<th class="tg-yw4l">support</th>
</tr>

<tr>
<td class="tg-yw4l">leopard</td>
<td class="tg-yw4l">0.77</td>
<td class="tg-yw4l">0.74</td>
<td class="tg-yw4l">0.75</td>
<td class="tg-yw4l">156</td>
</tr>
<tr>
<td class="tg-yw4l">tiger</td>
<td class="tg-yw4l">0.71</td>
<td class="tg-yw4l">0.74</td>
<td class="tg-yw4l">0.72</td>
<td class="tg-yw4l">133</td>
</tr>

<tr>
<td class="tg-yw4l">avg</td>
<td class="tg-yw4l">0.74</td>
<td class="tg-yw4l">0.74</td>
<td class="tg-yw4l">0.74</td>
<td class="tg-yw4l">289</td>
</tr>
</table>
</center>
<p>
This is the classification report for leopard vs tiger.
Using a LinearSVC
<center>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
<tr>
<th class="tg-yw4l">Class</th>
<th class="tg-yw4l">precision</th>
<th class="tg-yw4l">recall</th>
<th class="tg-yw4l">f1-score</th>
<th class="tg-yw4l">support</th>
</tr>

<tr>
<td class="tg-yw4l">leopard</td>
<td class="tg-yw4l">0.76</td>
<td class="tg-yw4l">0.81</td>
<td class="tg-yw4l">0.78</td>
<td class="tg-yw4l">141</td>
</tr>
<tr>
<td class="tg-yw4l">tiger</td>
<td class="tg-yw4l">0.81</td>
<td class="tg-yw4l">0.76</td>
<td class="tg-yw4l">0.78</td>
<td class="tg-yw4l">148</td>
</tr>

<tr>
<td class="tg-yw4l">avg</td>
<td class="tg-yw4l">0.78</td>
<td class="tg-yw4l">0.78</td>
<td class="tg-yw4l">0.78</td>
<td class="tg-yw4l">289</td>
</tr>
</table>
</center>

<p> If we are doing this already, lets perform multiclass classification directly.
<p>Here is the classification report for all classes using RandomForests using 500 estimators.
<center>

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
<tr>
<th class="tg-yw4l">Class</th>
<th class="tg-yw4l">precision</th>
<th class="tg-yw4l">recall</th>
<th class="tg-yw4l">f1-score</th>
<th class="tg-yw4l">support</th>
</tr>

<tr>
<td class="tg-yw4l">bobcat</td>
<td class="tg-yw4l">0.18</td>
<td class="tg-yw4l">0.06</td>
<td class="tg-yw4l">0.09</td>
<td class="tg-yw4l">158</td>
</tr>
<tr>
<td class="tg-yw4l">chihuahua</td>
<td class="tg-yw4l">0.27</td>
<td class="tg-yw4l">0.06</td>
<td class="tg-yw4l">0.1</td>
<td class="tg-yw4l">169</td>
</tr>
<tr>
<td class="tg-yw4l">collie</td>
<td class="tg-yw4l">0.2</td>
<td class="tg-yw4l">0.5</td>
<td class="tg-yw4l">0.28</td>
<td class="tg-yw4l">286</td>
</tr>
<tr>
<td class="tg-yw4l">dalmatian</td>
<td class="tg-yw4l">0.44</td>
<td class="tg-yw4l">0.12</td>
<td class="tg-yw4l">0.19</td>
<td class="tg-yw4l">146</td>
</tr>
<tr>
<td class="tg-yw4l">fox</td>
<td class="tg-yw4l">0.17</td>
<td class="tg-yw4l">0.02</td>
<td class="tg-yw4l">0.03</td>
<td class="tg-yw4l">109</td>
</tr>
<tr>
<td class="tg-yw4l">germanshepherd</td>
<td class="tg-yw4l">0.22</td>
<td class="tg-yw4l">0.4</td>
<td class="tg-yw4l">0.28</td>
<td class="tg-yw4l">280</td>
</tr>
<tr>
<td class="tg-yw4l">leopard</td>
<td class="tg-yw4l">0.28</td>
<td class="tg-yw4l">0.47</td>
<td class="tg-yw4l">0.35</td>
<td class="tg-yw4l">143</td>
</tr>
<tr>
<td class="tg-yw4l">lion</td>
<td class="tg-yw4l">0.57</td>
<td class="tg-yw4l">0.03</td>
<td class="tg-yw4l">0.06</td>
<td class="tg-yw4l">138</td>
</tr>
<tr>
<td class="tg-yw4l">persiancat</td>
<td class="tg-yw4l">0.3</td>
<td class="tg-yw4l">0.51</td>
<td class="tg-yw4l">0.38</td>
<td class="tg-yw4l">173</td>
</tr>
<tr>
<td class="tg-yw4l">siamesecat</td>
<td class="tg-yw4l">0.28</td>
<td class="tg-yw4l">0.08</td>
<td class="tg-yw4l">0.13</td>
<td class="tg-yw4l">112</td>
</tr>
<tr>
<td class="tg-yw4l">tiger</td>
<td class="tg-yw4l">0.83</td>
<td class="tg-yw4l">0.13</td>
<td class="tg-yw4l">0.23</td>
<td class="tg-yw4l">152</td>
</tr>
<tr>
<td class="tg-yw4l">wolf</td>
<td class="tg-yw4l">0.25</td>
<td class="tg-yw4l">0.01</td>
<td class="tg-yw4l">0.02</td>
<td class="tg-yw4l">124</td>
</tr>

<tr>
<td class="tg-yw4l">avg</td>
<td class="tg-yw4l">0.32</td>
<td class="tg-yw4l">0.24</td>
<td class="tg-yw4l">0.2</td>
<td class="tg-yw4l">1990</td>
</tr>
</table>
</center>
<p>
Seems pretty rugged, may be increasing the number of trees will boost up the precision, but is really heavy on the machine.
<center>
<h2> Fork the code </h2>

<a href="https://github.com/ManikantaReddyD/Canine-Or-Feline" target="_blank"><i class="fa fa-3x fa-github"></i></a>
</center>