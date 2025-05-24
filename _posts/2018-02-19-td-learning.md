---
layout: post
title: "On Random Walks and TD Learning"
date: 2018-02-19
excerpt: '
    Temporal difference learning methods introduced in 1988 by Richard Sutton are the foundation of Reinforcement Learning algorithms, although the context was different. The celebrated paper presents the idea of TD learning as a general framework to achieve faster learning in prediction for sequential decision-making problems. In this report we’ll reproduce the results presented in the paper <b>Learning to Predict by the Methods of Temporal Differences</b> The reproduction reinforces the argument that TD learning methods perform faster and better in comparison supervised learning approaches. We’ll provide highly correlating results with the original paper.
'
comments: true
mathjax: true
tags: machine-learning ai reinforcement-learning
feature: "{{ site.url }}{{ site.baseurl }}/images/2018-02-19-td-learning/randomwalk.png"
---

## Multi Step Prediction Problem
Consider the problem in which experience is received as observation-outcome sequences of the form $$x_1,\ x_2,x_3,\ldots,\ x_m,\ z$$ where $$x_t$$ is a vector of observation experienced at time $$t$$ and $$z$$ is the outcome of such a sequence. We’ll call a sequence of observation-outcome as an episode. Thus, each episode has an outcome. The goal of the learning algorithm is to generate a sequence of $$P_1,P_2,P_3,\ldots,\ P_m$$ which are estimates of outcome of the sequence at their respective times. This can be rewritten as a function of $$x$$ and some unknown $$w$$  vector which we can alter to get closer to truth of $$P$$. $$P_t(x_t,\ w)$$ . Notice how w is independent of t. Learning algorithms tend to update the value of w as more and more episodes are experienced, with an update rule, that depends on the episode seen. 

$$ w=w+\sum_{\forall t\in(1,\ \ m)}{\Delta w_t} $$

For our purposes, we model $$P$$ as a linear function, $$P_t=w^Tx_t$$. For such a modelling of our problem the update rule can be written as,

$$ \Delta w_t=\alpha\left(z-w^Tx_t\right)x_t\ \ \ \ \ \ \ \ \ 0\le\alpha\le1$$

This is the simple, effective and robust *[Widrow-Hoff Rule](#widrowhoff)* . The learning rate ($$\alpha$$) decides how much importance we want to give to this update. A higher $$\alpha$$ means faster learning of observed behavior and smaller $$\alpha$$ would mean less preference to outliers. The point is that, for a higher $$\alpha$$ the model quickly learns new things and for a smaller one it’s resilient to rapid changes. We need to remember this while we run our experiments. A smaller $$\alpha$$ in general implies that the model converges to something useful, but in turn takes more updates to do the same, after all it’s a slow learner.

This update rule forces us to wait till the end of the episode to observe $$z$$ and then update $$\Delta w_t$$. So, all the observations of individual states do not lead to any learning, and we must remember the entire series of observations till the end of an episode to update our model. Put differently, this approach is not an incremental way to update $$w$$.

## Enter Sutton and TD(1)
There exists a TD approach that produces the same result as the Widrow-Hoff rule, and yet be computed incrementally! The trick as Sutton states is to represent $$z-P_t$$ as a [telescopic sum](#sutton1988). 

$$z-P_t=\sum_{k\in\left(t,\ m\right)}{P_{k+1}-P_k}\ \ \ ,\ where\ P_{m+1}=z$$

Using this sum and some hocus pocus the update rule can be re-written as,

$$\Delta w_{t-1}=\alpha\left(P_t-P_{t-1}\right)\sum_{k\in(1,t-1)} x_k$$

Notice now, how the update rule at time step $$t$$ of an episode only depends on current $$P_t$$, previous $$P_{t-1}$$ to generate update for $$\Delta w_{t-1}$$. 
But! The result is still the same at the end of the episode. It will only learn to make things right by the end of the episode for the episode, while, all we save for ourselves is the memory for estimated $$P_t$$ at every step and instead have it imbedded within the update $$\Delta w_t$$.

## The TD($$\lambda$$) family of learning procedures
With a minor, yet sensational addition to the above update rule, we make it sensitive to changes to successive predictions rather to overall error between predictions and the outcome . 

$$ \Delta w_t=\alpha\left(P_{t+1}-P_t\right)\sum_{k\in(1,t)}{\lambda^{t-k}x_k}\ \ \ \ \ \ \ \ \ 0\le\lambda\le1 $$

The effect of $$\lambda$$ is to give more preference to recency and less to older observations. Notice that for $$\lambda=1$$, the procedure is same as Widrow-Hoff and for $$\lambda=0$$, the update only considers $$x_t$$ for update in $$\Delta w_t$$. In other words, $$\lambda=1$$, considers the entire sequence for any update on $$w$$, where $$\lambda=0$$ only considers the most recent observation. For everything between the update rule balances a result that isn’t either of the two extremes. This form can again be re-written as

$$\Delta w_t=\alpha\left(P_{t+1}-P_t\right)e_t\ \ \ \ \ \ \ \ \ \ e_t=x_t+\lambda e_{t-1}\ $$

This simpler update rule results in faster learning, which we’ll demonstrate with an experiment on Random Walks.
## The Dynamics of a Bounded Random Walks
Consider a world of seven states, $$[A, B, C, D, E, F, G]$$. In every state, except $$A$$ and $$G$$, as the time ticks, you appear in either the state on the left side or the right side with a $$50%$$ chance. If you land in $$A$$ or $$G$$ the game is over. You get a cookie if you land in $$G$$ and nothing if you land in $$A$$. $$A$$ sequence can now be defined as a series of states that ends in either $$A$$ or $$G$$. Let all the sequences start only at $$D$$. Then an episode can be 

$$D\rightarrow E\rightarrow F\rightarrow E\rightarrow F\rightarrow G$$

We want to predict how likely it is for us to receive the cookie if we are in some state. Clearly it is 1, if you are in $$G$$ and 0 if you are in $$A$$. We can now define the outcome of the above sequence as 1 as it received a cookie when it terminated. Likewise, for a sequence ending in $$A$$, the outcome is $$0$$. We can’t stop but ask, what would happen to us if we are in some state $$S$$. To fit it into the theory studied above, we represent every state as a categorical vector. 

$$A=x_0=\left[1,0,0,0,0,0,0\right]^T,\ D=x_3=\left[0,0,0,1,0,0,0\right]^T,\ G=x_6=\left[0,0,0,0,0,0,1\right]^T\ldots$$

$$P_k$$ is the expected value of being in state $$x_k$$, defined as $$P_k=w^Tx_k$$. The actual value is computed as $$w^T=[0,\frac{1}{6},\frac{2}{6},\frac{3}{6},\frac{4}{6},\frac{5}{6},\ 1]$$. Can we learn these values, by observing various sequences and their outcome? 

## Experiments
### Data
We generate sequences by starting at state $$D (x_3)$$, flipping a coin and jump to the state on left or right based on the flip’s outcome and continue till either of states, $$A \left(x_0\right)$$ or $$G \left(x_6\right)$$ is reached. One assumption we make is to consider sequences of certain max length and no more to avoid large errors. For the experiments conducted the max length is 20, (this is justified as the probability of generating a $$k$$ length sequence is $${~2}^{-k}$$, ~0.0000009 for $$k=20$$). A 1000 such sequences are generated and split into sets of 10 sequences. There are now 100 sets, each of 10 sequences.

### Error (The RMS error)
Let’s say the final prediction is  $$P=[P_1^\ast,\ \ P_2^\ast,\ \ P_3^\ast,\ \ P_4^\ast,\ \ P_5^\ast]$$ then we define our error to be the Root of mean  of the squared error ($$P-[\frac{1}{6},\frac{2}{6},\frac{3}{6},\frac{4}{6},\frac{5}{6}]$$). Notice how we dropped of states $$A,\ G$$ from error computation. Those predictions won’t change as they are fixed, there is no point in considering them for any error.

### The programming
There is a slight deviation from the way the algorithm in the paper and the implemented program is written. The program follows the model of value updates, in contrast to a weight vector update. The underlying math is the same. The terms Value vector and Weight vector from hereon are interchangeable.

### Experiment1 – The downside of learning only what you already know
In the first experiment, we try to understand how varying $$\lambda$$ affects the average error. The experiment was run with a small 0.01 to ensure convergence. Every sequence produces a change $$\Delta w$$.These $$\Delta w$$ are accumulated over the sequences in one set and then the vector $$w\$$ is updated.

Each set is presented to the learner until the value vector no longer changes (slightly maybe). The change ($$\delta w$$) was measured between successive values of weight vector and if its norm is less than a tolerance (0.01) we stop updating and then we measure the RMS error for this set. Also, if the vector doesn’t converge within 100 steps, it’s assumed to be diverging (although this never happened in the experiment ran. $$w$$ always converged within 100 iterations, for small 0.01.)  Now the error over all the sets is averaged, to receive the error for one particular $$\lambda$$.

<div class="row"> <div class="col-md-12">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2018-02-19-td-learning/Figure_1.png" style="width:75%" />
</div>
</div>
Quite surprisingly (or not) $$\lambda=1$$ has the highest error. We might expect that the $$TD(1)$$ procedure should have induced the least error, as it considers everything and minimized error between predictions and actual outcomes. But all it does is reduce only it. It doesn’t account for anything else, that might come up in future, which leads to an accumulated error.

This can be seen by running the algorithm only once instead of waiting for convergence, which essentially is the first training error of the model.

<div class="row">
<div class="col-md-12">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2018-02-19-td-learning/Figure_1-1.png" style="width:75%" />
</div>
</div>

$$TD(1)$$ produces the least error in such case. It learns what it sees and cares no further. As more future data is shown error increases.

Although the first figure looks quite like one presented in the paper, the errors are however small compared to those in the paper. This might be attributed to, as is the consensus, to better floating-point arithmetic of modern systems over the ones of 1988. This difference is observed across all experiments. 

### Experiment 2 – It’s all about the balance
We stated earlier on what the learning rate does, here we demonstrate the same. A large $$\alpha$$ means risk of divergence and high error, small $$\alpha$$ means assured convergence, but requirement of large amounts of data. For this we present each sequence only once and $$\Delta w$$ is added to Value vector after each sequence, instead of accumulating it over an entire set. Again, as the previous case RMS error is computed for each set and averaged over all sets. The weight vector is initialized to $$0.5$$ for all states expect $$A, B$$.

$$\alpha=0$$ implies no learning and final vector is same as the other, so the error for such a case is same irrespective of $$\lambda$$. 


<div class="row"> <div class="col-md-12">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2018-02-19-td-learning/Figure_2.png" style="width:75%" />
</div></div>
This suggests that a small $$\alpha$$ doesn’t do anything and a high $$\alpha$$ hurries so much that the it forgets things. There is sweet spot in between where we can optimally learn and be fast as well.

Although this graph looks a bit different from the one in paper, consider the graph to left of $$\alpha=0.4$$. It behaves the same as in paper. $$\lambda=1$$ has the highest error, $$\lambda=0.3$$ is the lowest, $$\lambda=0$$, cuts over $$\lambda=0.8$$. That implies, this model learned faster than one in 1988 even for same value of $$\alpha$$.

### Experiment 3 – Only the Best
We have already experimented what would happen for a small $$\alpha$$. What happens for the Best $$\alpha$$? To figure this out we have the same protocol followed in experiment 2. But with a change. We computed the best $$\alpha$$ for every $$\lambda$$, as per experiment 2 and we notice the best performer is now somewhere around $$\lambda=0.2$$ and not $$\lambda=0$$ as was in experiment 1. With $$\alpha$$ values ranging between $$[0.2,\ 0.05]$$, we have learnt the least error generating weight with one presentation of the data itself. Notice how the errors are in general the same (perhaps less), even though the data has been presented only once. 

<div class="row"> <div class="col-md-12">
    <img src="{{ site.url }}{{ site.baseurl }}/images/2018-02-19-td-learning/Figure_3.png" style="width:75%" />
</div></div>

So, a TD approach allowed us to learn faster. Only $$\lambda=1$$ required $$0.05$$, (it diverged otherwise), the rest could afford a faster learning.

### Now what?
I don't know! May be we should go forth and program a game...

## References

<h4 id="#widrowhoff">WidrowBernard, StearnsSamuelD. Adaptive Signal Processing．s.l.，Prentice-Hall，1985</h4>

<h4 id="sutton1988">Learning to Predict by the Methods of Temporal Differences． SuttonRichardS.1，1988，Machine Learning，Vol. 3，pp.9-44</h4>