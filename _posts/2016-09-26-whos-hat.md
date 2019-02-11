---
layout: post
title: "Criticism against counter example by Rosenkrantz against Instance Confirmation"
date: 2016-09-26
excerpt: "Nicod's criterion is one of the fundamental concepts of the theory of confirmation. It is also center to the famous 'Raven Paradox', and attempts have been made to debunk it. One such counter example was provided by Rosenkrantz to show that instance confirmation leads to paradoxical states. However I believe that the paradox stated by Rosenkrantz is just apparent and can be resolved by the notion of logically conceived observations. "
comments: true
mathjax: true
tags: philosophy instance-confirmation confirmation-theory
feature: "/images/2016-09-26-criticism-against-rosenkrantz-example-against-nicod/feature.png"
---

## Nicod's Criterion

For a formula of the form A *entails* B, a particular proposition, with the presence of B, in case of A, is favourable to the formula and a proposition, with absence the  of B, in case of A, is unfavourable and the rest of the other propositions are considered irrelevant. [Nicod, 2014](#nicod2014foundations) 

Using this criterion we will discuss a procedure for confirmation in case of evidence.

### Method of Confirmation

We only consider hypotheses of form as $$H: \forall x P(x) \Rightarrow Q(x)$$ 

 + We find an object/observation $$O$$ 

 + If $$ P(O) $$ is True and $$Q(O)$$ is True, we say $$O$$ in $$P\wedge  Q$$, confirms $$H$$

 + If $$P(O)$$ is True and $$Q(O)$$ is False, we say $$O$$ in $$P\wedge  \neg Q$$, dis-confirms $$H$$


We consider $$O$$ being $$P\wedge Q$$ as an $$instance$$ of the hypothesis $$H$$, by this we mean $$O$$ is both $$P$$ and $$Q$$ and pronounce Nicod's criterion as *Instances of a Hypothesis confirm the Hypothesis*

---

## Rosenkrantz's Counter example
[Howson and Urbach, 200](#howson2006scientific) paraphrases a convincing counterexample to the above criterion due to [Rosenkrantz, 2012](#rosenkrantz2012inference) as follows:

>   Three people leave a party, each with a hat. The hypothesis that none of the three
    has his own hat is confirmed, according to Nicod [NC], by the observation that
    person 1 has person 2’s hat and by the observation that person 2 has person 1’s
    hat. But since the hypothesis concerns only three, particular people, the second
    observation must refute the hypothesis, not confirm it.

At the first sight, this *set of observations*, might seem paradoxical that two *confirming* observations lead to a *disconfirming* state! 

---

## Analysis of the counter example

Universe $$(U)$$: Three people with three hats

Hypothesis $$(H)$$: None of us has our own hat

Observation 1 $$(O_1)$$: Person 1 has Person 2's hat

Observation 2 $$(O_2)$$: Person 2 has Person 1's hat

This leads to a state of the Universe which in truth will look like

+ Person 1 has Person 2's hat,
  
+ Person 2 has Person 1's hat and
  
+ Person 3 has Person 3's hat.

We understand that the 

Observation 3 $$(O_3)$$: Person 3 has Person 3's hat 

hasn't been made yet or hasn't been *logically conceived* yet. We'll stress on the meaning of *logically conceived* later.

We rewrite hypothesis $$H$$ in the form $$ \forall x P(x) \Rightarrow Q(x) $$ as

Proposition $$P(x)$$ : x is a Person

Proposition $$Q(x)$$ : x is not wearing his own hat


We can now establish $$O_1$$ and $$O_2$$ as instances of $$H$$ as they are both $$P\wedge Q$$. Following the method of confirmation, we can see that $$O_1$$ confirms $$H$$ and $$O_2$$ also confirms $$H$$. 

This confirmation of hypothesis by both $$O_1$$ and $$O_2$$ is claimed to be paradoxical as, in reality the hypothesis $$H$$ is false. But our argument is that there is nothing wrong with $$O_1$$ and $$O_2$$ confirming the hypothesis $$H$$ on their own. 

---

## Resolution of apparent paradox

The problem lies with the perception of the method of confirmation. It has been explicitly mentioned that **a observation** of the form $$P\wedge Q$$ is used for confirmation and not **a set of observations**. Such a set cannot be written as $$P\wedge Q$$.


But in the counter example that, we consider both $$O_1$$ and $$O_2$$ as a single observation, which is definitely not the case of confirmation. The apparent paradox lies with our understanding of the example, which relates to the background information of the universe. 


We can propose the notion of **logically conceived observations** due to which we tend to consider all possible *new observations*, by re stating the information available to us, *at the moment*, to view it in a simpler form. We use *logical deduction* for the same. The information contains all possible background information and all observations made so far.

If we forget for a moment, what implications $$O_1$$ and $$O_2$$ have on the hypothesis $$H$$, we understand that for the universe $$U$$ to be consistent, we can logically deduce that, we can make a new observation $$O_3$$ (A virtual one, not necessarily a true observation, can exist only on paper, but will be true owing to premises) that states: Person 3 has his own hat. We can see that $$O_1 \wedge O_2 \vdash  O_3$$ in $$U$$.

Now that we conceived a new observation, we can apply the method of confirmation and conclude that $$O_3$$ is of the form $$P\wedge \neg Q$$ and hence $$O_3$$ is a dis-confirming evidence. 

So if we allow for logical conception, $$O_3$$, logically conceived from $$O_1$$ and $$O_2$$, is a dis-confirming evidence and hence the hypothesis $$H$$ is false. $$O_1$$ and $$O_2$$ can still confirm $$H$$ irrespective of other observations. 

It doesn't mean that our hypothesis is correct, only that it is supported by evidences $$O_1$$ and $$O_2$$. The moment we make an observation (real or logically conceived), that also happens to be a dis-confirming evidence, we can state that the hypothesis is false. Until then the hypothesis $$H$$ stands as an unfalsified hypothesis. 

The core of the argument lies with an unsaid assumption that knowledge is ever growing and increases with the number of observations made, which can in turn lead to new *logically conceived observations*, that can confirm or dis-confirm existing hypotheses.

---

## References

<div id="#nicod2014foundations"> Nicod, J. (2014).*Foundations of geometry and induction.*  Routledge </div>
<div id="#rosenkrantz2012inference">  Rosenkrantz, R. D. (2012). *Inference, method and decision:  towards a Bayesian philosophy of science, *volume 115.  Springer Science & Business Media </div>
<div id="#howson2006scientific">Howson,  C.  and  Urbach,  P.  (2006). *Scientic  reasoning:  the  Bayesian approach.*  Open Court Publishing </div>