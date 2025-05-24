---
layout: post
title: "Learning to Land on the Moon"
date: 2018-03-03
excerpt: "In this experiment we implement a neural network based agent to optimize a future reward function for a sequential decision problem and explore the numerous intricacies involved in the problem. We present an agent that successfully learns to consistently steer towards the goal in a simulation of a module landing on the moon built upon OpenAI Gym. We incorporate ideas from multiple previous works and adapt them to the specific problem.
"
comments: true
tags: machine-learning reinforcement-learning Deep-Q-Learning
---

<!-- Introduction
============ -->

Reinforcement learning enables control agents to learn different
strategies to interact with the environment through a sequence of
observation, decisions, and reflections. The goal of any such agent is
to observe the current state of the environment and take an action that
maximizes the expected cumulative future reward. The mathematical
representation of this statement is given by the Bellman equation for
Q-value as

$$
    Q^*(s,a) = \sum_{s'}T(s,a,s')(R(s,a) + \gamma\max_{a'}Q^*(s',a'))
$$

The optimal policy or the optimal decision function can then be obtained
by maximizing the Q-value function.

$$
    \pi^*(s) = \operatorname*{argmax}_{a}Q^*(s,a)
$$

The Q-value can be approximated by the Q-Learning
algorithm that iteratively updates Q-values in a Q-table which converge
to true optimal values over time.

<!-- \[alg:offpolicyq\] **Initialize:** Q(s,a), $\pi(s)$ and an initial state
$s$\ -->
<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/alg_offpolicyq.png">
    </div>
</div>


Note that update for a time(t) depends on the observation from time(t+1)
($\max_{a'}Q(s',a')$). $\Delta$ at any time($t$) doesn’t depend on the
the action to be taken at time($t+1$), which will be dependent on the
policy($\pi$) at $t+1$. Hence the term **Off** Policy.

The above algorithm has a high chance of being stuck with a suboptimal
policy when the world is non-deterministic (most, if not all problems).
This is because we may never visit some of the states ever. It is in
some sense a very safe agent that never takes risks and accepts its fate
when the universe plays dice.

 Greedy *Action Selection* Policy
=================================

It is imperative that the agent venture beyond its known experiences and
*explore*. Every now and then it should take actions against the optimal
policy learned based on the experiences so far. At the same time, place
safe bets by *exploiting* its knowledge. The $\epsilon$ greedy policy
suggests that the agent choose a random action from the action
space,$\mathcal{A}$, with a probability $\epsilon$ and the optimal
action with a probability $1-\epsilon$ during the *action-selection*
phase. This has to be performed instead in Line 3 in Algorithm previously discussed.

$$
a =
    \left\{
    \begin{array}{ll}
        random(\mathcal{A}ction) & \mbox{with probability } \epsilon \\
        \max_{a'} Q(s',a')       & \mbox{otherwise}                  
    \end{array}
    \right.
    $$ 
    
$\epsilon$ can be a constant or some variable function.
Constant value can lead to arrogant behavior, hence in practice it is
good to use a *time-decaying* $\epsilon$ function.

Q-Learning in Continuous State spaces
=====================================

Defining state transitions based on actions taken and computing the
transition probabilities works well in discrete worlds. Regular problems
are too large for us to keep track of all state-action pairs. Instead,
we approximate Q values with a function $Q(s,a, \Theta)$, where $\Theta$ is the set of parameters that defines the function approximation.

We consider the problem where the state space is continuous but the
actions are discrete and finite ($n$ in number). In such case the Q
function (or the **action-value** function) takes as input an
action($a$) (from a discrete set) and a state($s$) (comprising of
continuous values). We can look at this in a different way as having $n$ different functions each giving out a Q-value for the state($s$), such that the function that produces the maximum Q-value is the optimal
action at that state.

In such case, the Off policy $\epsilon$ greedy Q learning algorithm
remains the same except for the update step at line 6 in Off Policy Algorithm by a different update rule.

One of the updates, which will find *a minimum*, that can be iteratively performed on the parameters $\Theta$ is via a loss function $\mathcal{L}(\Theta)$ given by 

$$

\label{continuous update}
    \begin{aligned}
        Y^Q_t                         & = R_{t+1}+\gamma\max_{a}Q(s_{t+1},a, \Theta_t)                         \\
        \mathcal{L}(\Theta_t)         & \propto \operatorname*{\mathbb{E}}_{s_t,a_t}(Y^Q_t - Q(s_t, a_t, \Theta_t))^2               \\
        \nabla(\mathcal{L}(\Theta_t)) & =(Y^Q_t - Q(s_t, a_t, \Theta_t))\nabla_{\Theta_t}Q(s_t, a_t, \Theta_t) \\
        \Theta_{t+1}                  & = \Theta_t + \alpha(\nabla(\mathcal{L}(\Theta_t))                      \\
    \end{aligned}

$$ 
    
Neural networks are a kind of function estimators that are driven by gradient descent in general.

Deep Q Learning {#vanilladqn}
===============================

We construct a neural network with weights($\Theta$), input($s$) and $n$
output nodes, each output node corresponding to Q-value of taking an
action $i$ for the input state($s$).

But instead of driving the update rule on the values from the previous
iteration, we pick random (action-values, state) pairs from a *sample
space* as there is a lot of correlation between continuous states, which
could lead to over-fitting and divergence. The sample-space is a random
sampling of experiences from the agent’s memory, collected over many
episodes. This technique is termed ***Experience Replay***. The agent
thus learns from past experiences in general instead of immediate
experiences and is expected to reach a global minimum.

<!-- \[alg:offpolicydeepq\] **Initialize:** Neuralnet weights $\Theta$ , an
initial state $s$ and a fifo queue buffer $\mathcal{B}$ of finite size\ -->

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/alg_offpolicydeepq.png">
    </div>
</div>



We’ll apply this learning agent on the Lunar Lander simulation

Lunar Lander
============

Lunar lander is an environment available in OpenAI gym. It simulates the
landing of a module on the surface of moon.

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/lunar_lander.png">
    </div>
</div>

The state of the lander at any given moment of time is defined by 8
*continuous* variables.
$x, y, v_x, v_y, \phi \mbox{ orientation }, \omega \mbox{ angular speed }, c_1$ground
contact of leg1 $, c_2$ ground contact of leg2.

It can perform four *discrete* actions, *do nothing*, *fire right*,
*fire left*, *fire main*. Every fire of main engine is rewarded $-0.3$.
A Crash $-100$. Come to rest $100$. Land on the pad between $100...140$.
The environment stops beyond 1000 time frames. So the worst possible
scenario leads to a reward aleast $-240$.

This particular discrete action$-$continuous state problem can be solved
by a simple PID controller but it involves a fair bit of physical
understanding of action space and assumptions about the environment/

On the other hand, Q-Learning needs no prior knowledge and no
interpretation of the transition. $s\xrightarrow[a]{r} s'$.

The neural network implemented is a multilayer perceptron with 3 hidden
layers. Multiple configurations of $\epsilon$, $\mathfrak{b}$ and other
params have been experimented and most of them produce similar results
as below.

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/vanilla_dqn_train.png">
    </div>
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/vanilla_dqn_test.png">
    </div>
</div>


The agent continually learns to produce a reward slightly less than
$100$. Notice that most of the runs in training are governed by 1000
runs episodes. Which means the lander didn’t manage to crash land but
began to hover in mid-air. This is the case of converging to a local
minimum, where the lander avoids huge punishment from crashing and
spends on fuel for hovering.

Double Q Learning {#ddqn}
==================================================

Vanilla Deep Q Learning is very optimistic, it tries to avoid great
punishments and accepts anyone who offers a morsel of positive future
reward and converge to a suboptimal policy.

Due to the nature of $\max$ operator DQN also leads to overestimations
in values which results in propagation of wrong information about the
information of which states are more valuable directly affecting the
quality of policy. The $\max$ operator ignores underestimations of Q
values but honors a Q value that has been wrongly overestimated when
selecting the optimal policy.

Both of these can be prevented by introducing a second neural network in
the agent. While the first model learns the optimal policy the other
model decides the current optimal policy. The second model is updated
with the new parameters from the first one every now and then.

$$
\begin{aligned}
    Y^Q_t        & = R_{t+1}+\gamma\max_{a}Q(s_{t+1},a, \Theta')     \\
    \Theta_{t+1} & = \Theta_t + \alpha(\nabla(\mathcal{L}(\Theta_t)) \\
    \Theta'      & =\Theta \mbox{ Every now and then}                
\end{aligned}
$$ 
    
If we keep the hyper parameters of vanilla dqn
\[vanilladqn\] the same and introduce a second network that is updated
every $(n=1000)$ observations we achieve a considerable improvement in
performance averaging about a per episode score of $170$. We are close!

But notice how there are still a lot of episodes that take the 1000 step
runs. The lander still aims to receive a less negative reward by
avoiding the ground.


<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/double_dqn_train.png">
    </div>
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/double_dqn_test.png">
    </div>
</div>


Preferential Memory {#ddqnPM}
===================

Landing on the ground is a particular set of sequences that when happen
to lead to a huge positive reward. By our exploration strategy, the
landing event happens enough times that the lander knows there is a
positive reward state but is not *confident* enough that it takes that
course of action over and over.

To increase the confidence in events leading to landing, we increase the
chance of such (state, action, reward, next state) tuples from being
sampled during the model update step. Whenever an action leads to a
positive reward, we re-save the same tuple multiple(a constant $\tau$)
times. This is slightly different from the method prescribed in
*Prioritized Experience Replay* where a
probability weight is assigned to experiences in memory based on the TD
error term.

The average test score is now about $\sim 199$, with the same setting in
other hyperparameters as in \[ddqn\]


<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/p_double_dqn_train.png">
    </div>
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/p_double_dqn_test.png">
    </div>
</div>


On Models and hyper parameters
==============================

Model Size and Depth
--------------------

The neural network comprises of nodes grouped into layers. In general,
we measure the size of a model by the number of nodes it has and the
depth of model by the number of layers.

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/model_complexity.png">
    </div>
</div>


In general, on increasing the size of a model decreases the rewards
obtained. As this lead to more parameters and overgeneralization of the
problem.

On the other hand, if we fix a number of nodes($=100$) and build a deep
network, the reward increases!

<!-- ![image](model_depth){width="0.8\linewidth"} -->
<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/model_depth.png">
    </div>
</div>

Theoretically, a neural network with only 1 hidden layer should be able
to approximate any function with enough nodes. But a deep network is,
capable of learning abstract concepts in the data with a few nodes. When
a back-propagation update occurs, the weights of the shallow network
simply adjust to memorize the input.

Updating the Second Model
-------------------------

As we employed Double Deep Q learning, we need to update the target
model every n observations. This is expected to bring down over-fitting.
We define update rate as observation interval between successive updates
of the target model.

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/update_rate.png">
    </div>
</div>



<!-- ![image](update_rate){width="0.8\linewidth"} -->

As we can see small update rates tend to give smaller rewards as they
can be overestimated by the same model. This was expected as small
update rate would mean that target and model are temporally similar.
After achieving a maximum, increasing the update rate will bring the
reward down as in limit a large update rate would mean no update at all.
For our model, an update rate around 800 is in the Goldilocks zone.

Preferential Memory Re-save
---------------------------

We mentioned how we save positively rewarding experiences multiple
times. This approach($\tau$ resave) increases preference by a direct
increase in population.

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/preferential_memory.png">
    </div>
</div>




As can be seen, increasing how frequently good experiences are sampled
in general increases the reward. Notice that towards the end, the
difference between multiple preferential re-save rates begins to blur.
(Unarguably 0 re-saves still lags behind).

This is because, as more and more samples are drawn from a population
dominated by good observations, and the epsilon for action selection
goes down, the agent will be taking good actions anyway. That means
either we re-save or not the agent’s memory is going to be saturated
with good experiences. The greatest effect of preferential re-saves is
to speed up the convergence towards good actions. 0 re-saves will
eventually get towards it through more iterations.

$\gamma$ and $\epsilon$ decay
-----------------------------

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/eg.png">
    </div>
</div>


There are sweet-spots for both $\gamma$ (reward decay) and $\epsilon$
decay to produce high rewards. They are essentially attributed to being
the balance between relying too much on expected future rewards and
exploring just enough to find the rewarding states.

Conclusion
==========

The best model is three layers deep, with 100 nodes, 10 re-saves, 800
target-update rate, 0.975 $\epsilon$ decay and 0.99 $\gamma$. This agent
consistently provided a score $>200$ averaging around $\sim 221$. The
behavior of the landing trajectory is strikingly similar to one produced
by a PID controller(appendix \[appendix:pidcontroller\]), which is based
on the physics and understanding of the system. It is quite remarkable
that the agent learns the ways of the world and its mathematics without
any prior knowledge of the same.

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/the_one.png">
    </div>
</div>


Appendix
========

Off Policy vs On Policy updates {#appendix:OffPolicyOnPolicy}
===============================

Off-policy learners compute one policy while following another. They can
learn the optimal policy regardless of the behavior of the current
policy. Whereas On Policy learners believe their current policy is good
enough and try to improve upon it. Both stem from the temporal
difference update given by

$$
    Q(s_{t+1},a_{t+1}) = Q(s_t,a_t) + \alpha(y_t-Q(s_t,a_t))
$$ 

The difference between both learners is the update($y$) 

$$
\begin{aligned}
    \mbox{SARSA (On Policy)}       & : y_t = r_t + \gamma Q(s_t, a_t)         \\
    \mbox{Q-Learning (Off Policy)} & : y_t = r_t + \gamma \max_{a'}Q(s_t, a') 
\end{aligned}
$$ 

The *max* operator in Q-Learning makes the update
step, current action agnostic. However the same *max* can cause the
neural network to diverge due to its non linear nature.

On policy, methods are stable and converge but might be trapped in
locally optimal policies.

Objective Optimization {#appendix:objectiveoptimization}
======================

Optimization algorithms *optimize* (*minimize* or *maximize*) a *Target
Objective* function. Target functions
in our cases are also labeled as *Error*, *Loss* or *Cost* functions
$\mathcal{L}(\Theta)$. The goal of the optimization algorithm is to find
a function $y=\mathcal{F}(x, \Theta)$ such that the value of
$\mathcal{L}(x, y, \Theta)\forall x$ is *optimized* in the space of
$x,y$.

Optimization can be done by solving for $\mathcal{F}$ with constraints
defined by $\mathcal{L}$ in a space $\mathcal{D}$. The solution is
obtained by solving simultaneous equations generated by $\nabla\mathcal{L}=0$ in $\mathcal{D}$. 

For example, 

$$
\begin{aligned}
        \mbox{Let}                & : (x,y)\in \mathcal{D}= \{(1.01,1.99), (2,4), (3.99,8.01)\} \\
        \mathcal{F}(x, \Theta)    & : y = \theta x                                              \\
        \mathcal{L}(x, y, \Theta) & : e = (y - \mathcal{F}(x, \Theta))^2                        \\
        \mbox{Goal}               & : \mbox{Minimize }  \mathcal{L}                             \\
        \mbox{Solution}           & : \theta = 2                                                
    \end{aligned}
$$

It is hard to solve directly when the dimensionality of the parameter
vector $\Theta$ and available space $\mathcal{D}$ is huge. Instead, we
apply iterative algorithms. Equation \[continuous update\] is one such
algorithm called *Stochastic Gradient Descent*.

In the neural network built for solving Lunar Lander, we use the
*Adam* optimizer. It is known to perform
well when the parameter space and data space are large.

PID Controller Solution {#appendix:pidcontroller}
=============================================

Although reinforcement learning shows promise in learning to land the
module on the moon. The caveat here is the tremendous amount of time and
computing power it took to build and empower the agent to steer it
correctly. With better knowledge and a precise implementation, we can
beat the game. This method has nothing to do with Reinforcement Learning
and we slide it in from learnings of a different course(AI for
Robotics). Please note that this procedure relies heavily on the
knowledge about the system and environment. That implies we know which
action does what.

In control systems, the agent is expected to do something along a
pre-estimated function. The action you take is to minimize a utility
function ($u(t)$). (same old story). 

$$
\begin{aligned}
        u(t) = \tau_p e(t) + \tau_i \int_0^t e(\lambda)d\lambda + \tau_d \frac{de(t)}{dt} 
\end{aligned}
$$

The trick in here lies in defining $e(t)$ for our problem. We define two
functions instead of one. The first to correct horizontal drift and the
second to correct the velocity on touchdown at unit time steps.

$$
\begin{aligned}
    u_{v_y}(t)  & = \tau_pv_y + \tau_i \int_0^t v_ydt + \tau_d\frac{dv_y}{dt}                             \\
                & = \tau_pv_y + \tau_iy + (ignoring)                                                      \\
    u_{\phi}(t) & = \tau_p(x+v_x-\phi) + \tau_i \int_0^t (x+v_x-\phi) dt + \tau_d\frac{d(x+v_x-\phi)}{dt} \\
                & = \tau_p(x+v_x*1-\phi) + (ignoring) + \tau_d(v_x - \omega)                              
\end{aligned}
$$

For sake of brevity, we consider only terms that will be available.
Integral of deviation and Derivative of velocity aren’t directly
available through state, so we ignore them.

Since we can take only one action at any given time, we do nothing when
$ |u_{v_y}|, |u_\phi| < \eta$, fire main engine if
$ |u_{v_y}| > |u_\phi|$, right engine when $u_\phi>\eta$ and left engine
when $u_\phi<-\eta$.

The parameters are generally tuned using a *coordinate
descent* algorithm (*Twiddle*)(yet an other
objective optimization algorithm), but for this case it was easy enough
to handpick producing a $222$ mean score!!!

<div class="row">
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/pid.png">
    </div>
    <div class="col-md-6">
        <img src="{{ site.url }}{{ site.baseurl }}/images/2018-03-03-learning-to-land-on-moon/pid_corrections.png">
    </div>
</div>


<!-- ![image](pid){width="0.8\linewidth"}
![image](pid_corrections){width="0.8\linewidth"} -->

As mentioned earlier, the PID controller generated trajectory is
strikingly similar to the one produced by the best RL agent.

References
==========
Mostly wikipedia. You should be able to google the terms and find the papers.