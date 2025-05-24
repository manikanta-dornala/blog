---
layout: post
title: "Performance of Dynamic Branch Predictors in Processor Pipelines"
date: 2017-04-20
excerpt:
    Branch Instructions are critical to the effectiveness of a deep
    pipeline, as these instructions can lead to stalls in the execution flow
    and result in high penalty costs. The performance of the CPU decreases
    with increasing pipeline stalls. To better extract parallelism we need
    to predict, pre-fetch and start executing the branch target instruction
    before the target actually resolves. For this very purpose many branch
    direction predictors have been proposed and implemented. In this project
    we study various branch prediction schemes and compare them against each
    other.

    The project involves study of various schemes, including static, dynamic
    and advanced predictors. Advanced branch predictors implemented are the
    perceptron, Tage, skewed predictor. The comparison of the schemes is
    made over the size of predictor on selected programs from SPECint2006
    and SPECfp2006 benchmark suites.
comments: true
tags: processor-architecture branch-predictors 
feature: "{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/MIPS_Architecture.png"
mathjax: true
---
## Direction Predictors
No discussion of Branch Predictors can begin without studying the
**Static** scheme of prediction first. The static scheme[(Lee Johny Alan 1995)](#lee1995branch)
of prediction is the simplest in the sense that it just predicts if
***all*** branches are taken or not. This seemingly innocent mode of
computation, can reach miss rates as low as $$10\%$$ in certain programs,
with a general accuracy of around $$60\%$$.

<div class="row" ><div class="col-md-8">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/static.png" style="width:75%" />
    <p class="caption">Performance of Static Predictor on benchmark programs </p>
</div></div>

Nevertheless, dynamic schemes of prediction have much better performance
than static schemes as we’ll see and can achieve miss rates at least as
low as $$10\%$$. There are various families of dynamic predictors, but one
aspect remains the same across all of them. They differ from the static
schemes in the way they estimate a branch. They utilize the run time
behavior of the program while execution to approximate the control flow
and hence predict the direction of branch.

We have considered to implement BiModal, Gag, Sag, Gshare, Gskew,
Perceptron and Tage branch prediction schemes. We skip the discussion on
BiModal, Gag, Sag and Gshare to understand from Gskew onwards, as the
former where analyzed in detail in a previous assignment.

### Gskew


In this report we have implemented 2bc-gskew[(Seznec and Michaud 1999)](#seznec1999aliased) branch
predictor, it is basically a combination of a Bimodal predictor and 2
Gshare predictors(with different hash functions) plus there is also a
meta predictor. This hybrid predictor are shown to have high accuracy at
very low hardware cost.

### Description

The prediction of this predictor is dependent on the prediction of a
2-bit Meta predictor which in turn takes output from a bi-modal and an
e-gskew predictor. An e-gskew predictor has 3 banks a bi-modal and two
gshare banks, a majority vote of the three is taken for the prediction.

<div class="row" ><div class="col-md-8">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/gskew.png" alt=" Skewed Branch Predictor (Seznec and Michaud 1999)" style="width:75.0%" />
    <p class="caption"> Skewed Branch Predictor
    </p>
</div></div>

### Update Policy

On a bad prediction, the three banks of the e-gskew predictor are
updated. On a correct prediction, only the banks participating to the correct
prediction are updated i.e. if the selected predictor was bimodal then
only bimodal predictor is updated. If e-gskew was selected only the
banks giving correct output in the predictor are updated.
The Meta predictor bank is updated only when the two predictions
disagree.

### Reasoning/ Rationale

Applying partial update policy on the predictor results in better
accuracy the reason being bimodal predictor accurately predicts strongly
biased static branches. Thus, once the metapredictor has recognised
biased branches the other tables are not updated.

<div class="row" ><div class="col-md-8">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/gskew2.png" style="width:75%" />
    <p class="caption">Performance of Gskew Predictor on benchmark programs (Stage 5) </p>
</div></div>

Perceptron
----------

Perceptrons are radically different from other dynamic schemes. They are
the simplest of the neural network family. Neural networks face a real
problem in their implementation at the hardware level. But Perceptrons
have properties that make it easy to implement on the chip.


<div class="row">
<div class="col-md-8">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/percp.png"/>
    <!-- <p class="caption"> -->


</div>
    <!-- </p> -->
</div>
A simple Perceptron. The input values $$x_1, ..., x_n$$, are propagated through the weighted connections by taking their respective products with the weights $$w_1, ..., w_n$$. These products are summed, along with the bias weight $$w_0$$, to produce the output value $$y$$
Figure 3, shows the graphical model of a perceptron. It is represented
by a vector of weights, which are plain integers for our purpose. The
output of a perceptron is given by the following.

$$y = w_0 + \sum_{i=1}^n{x_i w_i}$$

The inputs $$x_i$$ are *bipolar*, that is they are either $$1$$, *taken* or
$$-1$$, *not taken*. A negative $$y$$ implies that prediction is that the
branch is *not taken* and positive $$y$$ implies branch is *taken*.

### Training of perceptrons

$$w_i=w_i+tx_i$$

This algorithm increments a weight when a prediction matches the actual
direction. When they are disagreement, weights tend to become negative
numbers of large magnitude, when they are agreement, weights tend to
become positive numbers of large magnitude. When a weak correlation
forms the weights fluctuate around 0.

### Perceptron Predictor

-   The branch address is hashed to be the index of a table of
    perceptrons.

-   Using the index a perceptron is fetched.

-   The quantity $$y$$ is estimated as inner product of perceptrons
    weights and the global history.

-   If $$y>0$$ branch is predicted to be *taken*, otherwise is *not
    taken*.

-   Once the actual target is known, the perceptron is trained using the
    previously discussed algorithm and is written back into the table.

<div class="row" ><div class="col-md-8">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/percp2.png"
        style="width:55.0%" />
    <p class="caption">Perceptron Predictor Block Diagram. The branch address is hashed to select a perceptron that is read from
        the table. Together with the global history register, the output of the perceptron is computed, giving the prediction.
        The perceptron is updated with the training algorithm, then written back to the table.
    </p>
</div></div>

### Performance of Perceptron

The perceptron predictor tends to perform well if the the predicted
direction tends to be *linear separable* function of history. Also the
perceptron predictor requires space only *linear* in the history length,
whereas predictors like Gshare tend to explode exponentially. This
linear increase in space is what gives us an incentive to study
perceptrons.

<div class="row" ><div class="col-md-8">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/perceptron.png" style="width:75%" />
    <p class="caption">Performance of Perceptron Predictor on benchmark programs (Stage 5) </p>
</div></div>

Tage
----

Tage stands for Tagged geometric history length predictor. Tage uses a
simple default predictor (like bimodal) along with multiple tagged
predictor which are indexed using different length histories. These
history length, used for index are generally in geometric progression.
Final predicton for any branch is provided either by the default
predictor or any of component(provider) predictor, if there is hit or
tag match with any one.

In case of multiple tag matches, the prediction is provided by the tag
matching table of longest history. During implementation, we have used
bimodal as the default predictor, and four different tables are kept
which are indexed using history length 5, 14,44, 130 respectively. Each
table entry stores a tag and counter, which is utilised when predicting
the fate of branch.

### Prediction Computation

The prediction is provided on the basis of tag hit in longest history
table, in case of mis default predictor is used. Here is a simple flow
chart of 5-component tage predictor.

<div class="row" ><div class="col-md-8">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/tage2.png" 
        style="width:75.0%" />
    <p class="caption"> A 5-component TAGE predictor synopsis: A base predictor is backed with several tagged predictors components indexed using
        increasing history length</p>
</div></div>

### Updating the TAGE predictor

In each table entry a tag, prediction and a useful counter is kept.
Useful counter is updated when the alternate prediction is different
from final prediction. Counter is incremented if the actual prediction
is correct otherwise it is decremented. Each is a two bit counter. Exact
details of update procedure of various counters can be found here
[(Scheznec 2006)](seznec2006case).
<div class="row" ><div class="col-md-8">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/tage1.png" style="width:75%" />
    <p class="caption"> Performance of Tage Predictor on benchmark programs (Stage 5)</p>
</div></div>

TAGE is a state of the art branch predictor which does not utilizes any
information about future branches(as in case of prophet-critique
predictor).
It can be easily seen from the result that TAGE outperformed all other
predictors implemented in this project.

## Performance analysis for different data costs of predictors


While designing a predictor inside a processor space is a very important
factor. In this section we will try to analyze, how the predictors
performance evolve as we alter the total space utilized by the
predictor. By such experimentation, we can easily argue which predictor
to use and what should be specifications of the predictor.
We have compared the performance of dynamic predictors on a particular
benchmark programs as we change the total space utilized by the
predictor. We have incrementally updated the total space utilized by the
predictor and calculated the miss rate on benchmark. The predictors
begin with a basic budget of 256 bytes and is doubled in every stage.

General Trends
--------------

Following general trends can be observed across different benchmark
programs. The plots have been attached in appendix.

-   Miss rate decreases and eventually saturates as we increase the
    total size of predictors.

-   If we would further increase the total size then Miss rate might
    start to increase again as it can be seen in case of perceptron
    predictor in soplex program. We were not able to experiment on
    larger total space utilized by predictors because of time
    constraint.

-   Tage outperforms all other predictors followed by perceptron
    predictor. Outcome of any branch is dependent on branch address and
    branch history. The key idea behind branch prediction is that branch
    behavior repeats itself. A key question which always comes is how
    long should be branch history, and it can be easily realized that
    optimal history could be different for different branches. TAGE
    tackles this problem by keeping multiple table indexed using
    different histories, as a result, previously difficult to predict
    branches which were requiring a large history or short history will
    be accurately predicted.

-   Simple predictors such Bimodal, Gag and Sag saturate very early
    indication that these predictor does not require much space to
    achieve their optimal miss rate. In case of space crunch such
    predictors should definitely be used.

-   It can be seen that performance of bimodal and gskew is nearly same,
    with Gskew outperforming a bit. For strongly biased branches bimodal
    predictor works well with the draw back of aliasing, this is
    accounted by taking an e-gskew predictor (as two of the banks are
    gshare) but still one of the banks used is bimodal predictor the say
    of bimodal predictor in the final outcome is greater which is
    reflected in the results.

-   Rapid improvement in performance of gag can be seen as we increase
    size. Indicating that space at point 4-5 is the optimal space which
    should be used for GAG.

-   Perceptron predictor are very pattern sensitive, looking at the
    plots it evident to say that for some programs the miss rate is
    independent of the size of the predictor. On the other hand for some
    programs it decreases on on increasing size. This can be because of
    inability of perceptron to predict non-linear patterns (such as
    geometric) correctly no matter how many times it has seen the
    pattern.

## Appendix


**Acknowledgment**

We thank S. Desai for his invaluable implementation of TAGE, which we
have used in our analysis.

<div class="row">
<div class="col-lg-6">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/bzip2.png" style="width:75%" />
    <p class="caption">Performance of Direction Predictors on bzip2 </p>
</div>
<div class="col-lg-6">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/hmmer.png" style="width:75%" />
    <p class="caption">Performance of Direction Predictors on hmmer</p>
</div>
</div>
<div class="row">
<div class="col-lg-6">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/omnetpp.png" style="width:75%" />
    <p class="caption">Performance of Direction Predictors on omnetpp </p>
</div>

<div class="col-lg-6">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/perlbench.png" style="width:75%" />
    <p class="caption">Performance of Direction Predictors on perlbench </p>
</div>
</div>
<div class="row">
<div class="col-lg-6">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/soplex.png" style="width:75%" />
    <p class="caption">Performance of Direction Predictors on soplex </p>
</div>
<div class="col-lg-6">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2017-04-20-dynamic-branch-predictors/xalanbmk.png" style="width:75%" />
    <p class="caption">Performance of Direction Predictors on xalanbmk </p>
</div>
</div>

## References

<div id="refs" class="references">
    <div id="jimenez2001dynamic">
        <p>Jiménez, Daniel A, and Calvin Lin. 2001. “Dynamic Branch Prediction with Perceptrons.” In
            <em>High-Performance Computer Architecture, 2001. Hpca. the Seventh International Symposium on</em>, 197–206. IEEE.</p>
    </div>
    <div id="lee1995branch">
        <p>Lee, Johnny KF, and Alan Jay Smith. 1995. “Branch Prediction Strategies and Branch Target Buffer Design.” In
            <em>Instruction-Level Parallel Processors</em>, 83–99. IEEE Computer Society Press.</p>
    </div>
    <div id="seznec1999aliased">
        <p>Seznec, André, and Pierre Michaud. 1999. “De-Aliased Hybrid Branch Predictors.” PhD thesis, INRIA.</p>
    </div>
    <div id="seznec2006case">
        <p>———. 2006. “A Case for (Partially) Tagged Geometric History Length Branch Prediction.”
            <em>Journal of Instruction Level Parallelism</em> 8: 1–23.</p>
    </div>
</div>
