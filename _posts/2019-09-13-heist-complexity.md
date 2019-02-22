---
layout: post
title: "Heist Complexity"
date: 2018-09-13
excerpt: "We'll see about heist complexity and the ways to compute it efficiently."
comments: true
mathjax: true
tags: algorithms graphs
---

Let $G=  (V, E)$ be a simple, unweighted, undirected graph. The distance
between two vertices $u, v∈V$, given by $d(u, v)$, is defined as the
length of the shortest path between $u$ and $v$ in the graph $G$. Note
that $d(u, u) = 0$.

We are also given a set of vertices $H$ called the Heist vertices.
Heist-Closeness of a vertex is defined as following:

$$
C_{HC}(H, u) = \frac{1}{\sum_{v \in H}d(u,v)}
$$ 

Essentially $C_{HC}(H,u)$ gives an estimate of how close the vertex $u$ is to all
the vertices in $H$ at once. In the next sections we present an
algorithm to compute the value of $C_{HC}(H,u)$ for all vertices
$u\in V$ in as efficient way as possible.

Idea
====

The most naive way to compute $C_{HC}$ would be to follow the definition
literally. That would be to evaluate the distance from every vertex to
all the Heist vertices and sum them, which would then take a time of

$
    O(|V|*(\text{time it takes to find the length of shortest path between a vertex and all Heist vertices}))
$

We know that a simple *Breadth First Search* traversal from a source
vertex is capable of evaluating the shortest path to every other vertex
from the source and the time complexity of BFS traversal is
$O(|V|+|E|)$. Therefore the time complexity of this approach would be
$O(|V|(|V|+|E|))$.


A BFS traversal can compute shortest path from a source to all other
vertices. But we only need shortest path distance to the Heist vertices.
A BFS traversal on a Heist vertex will compute shortest path to every
other vertex which is exactly what we need.


So instead of running BFS on all vertices we run it only on the Heist
vertices and compute distances between Heist vertex and other vertices
bringing down the time to $O(|H|(|V|+|E|))$.


Here’s a simple two step solution

1.  For every heist vertex compute all shortest paths to every other
    vertex using a BFS traversal.

2.  For every vertex sum the shortest path distances to all the heist
    vertices.

Pseudocode
==========


![image](/images/2018-09-13-heist-complexity/alg1.png) 

$DSum_{HV}$ is the dictionary for all vertices with the value for a
key(vertex) being the sum of distances from the vertex to all the Heist
vertices.

The $levels$ array stores the depth of every vertex when a BFS is run
from source vertex. Since the graph is unweighted and undirected, the
depth is also the shortest distance from source to that vertex.

<!-- The Time complexity of this algorithm is as discussed $O(|H|(|V|+|E|))$.

1.  Line 2-22: $for$ loop running for $|H|$ times.

2.  Line 9-18: Inner $while$ runs for a total of $|V|+|E|$ times if $neighbors(v)$
    is readily available

3.  Line 11-15: *Will depend* on the implementation but can be done in $constant$
    average time -->

Proof of Correctness
====================

We’ll be proving that the above algorithm computes the heist closeness
centrality for all the vertices in the graph. The proof is multi part.

-   ${DSum}_{HV}$ eventually stores the sum of distance from every
    vertex to all the heist vertices.

-   The *levels* array at the end of each iteration(per heist) has the
    correct shortest distances from the heist to all other vertices.

It is easy to see that if the levels array has correct value of shortest
distances from Heist vertex then every iteration the distances add up in
$DSum_{HV}$. So we will be proving that BFS indeed computes shortest
paths.

Computing Shortest Paths with BFS traversal
-------------------------------------------

We are trying to prove that after a traversal the level or depth of
vertex from the source is also the shortest distance from the source.
$level_u(v) = d(u,v)$

### Vertices are expanded by the order of their Level

Before we prove that BFS finds shortest paths we have a small lemma that
shows that at any given time levels will be expanded in an orderly
fashion. Implying that vertices of level $j>i$ will only be marked only
after all vertices of level $i$ are marked.

To prove this notice that vertices will only be marked $i+1$ if a vertex
of $i$ is expanded. The order in which vertices are expanded is decided
by the way they entered the queue. So we need to prove that at any stage
the queue has vertices ordered by levels.

At any stage if Q has the vertices $v_1, v_2, v_3, ..., v_i$ in this
order, then we have
$$level_s(v_1) \leq level_s(v_2) \leq level_s(v_3) \leq ... \leq level_s(v_i) \leq levels_s(v_1)+1$$
Here’s an inductive proof for the same.

-   Base: Only $s$ is in the Queue

-   Assume:
    $level_s(v_1) \leq level_s(v_2) \leq level_s(v_3) \leq ... \leq level_s(v_i) \leq levels_s(v_1)+1$

-   Inductive Step:

    -   Pop $v_1$, assumption still holds true

    -   When $v_1$ is expanded new vertex ($v_k$) will have
        $level_s(v_k)=level_s(v_1)+1$

    -   Add $v_k$ to Queue, assumption still holds true

### Level is also the shortest path length

This translates to $level_u(v) = d(u,v), \forall v\in V$. We can prove
this by induction over levels

-   Base: for vertex $s$ we have $level_s(s)=0$ and $d(s,s)=0$

-   Inductive Hypothesis: Assume true till level $i$, then for any
    vertex $u$ we have
    $level_s(u)=\tau \iff d(s,u)=\tau, \forall \tau \leq i$.

-   Inductive step:

    -   For any un-visited vertex $v$ at distance $i+1$ from $s$,
        we need to show $level_s(v)=i+1 \iff d(s,v)=i+1$.

    -   Part 1: Any vertex $v$ that has been visited now, if it has
        $level_s(v)=i+1$ then we also have $d(s,v)=i+1$

        -   Vertex $v$ has to be *visited* by expanding an edge from $u$
            to $v$ where $level_s(u)=i$ therefore $level_s(v)=level_s(u)+1 \implies level_s(v)=i+1$

        -   We know that that shortest distance to $u$ is $d(s,u)=i$.
            Then $d(s,v)\leq d(s,u)+1 = i+1$.

        -   However since $v$ was never marked before $d(s,v)>i$ we have
            $d(s,v)=i+1$.

        -   Hence $level_s(v)=i+1 \rightarrow d(s,v)=i+1$.

    -   Part 2: All vertices with $d(s,v)=i+1$ will be marked in the
        array with $level_s(v)=i+1$

        -   Let a vertex $u$ be on the shortest path from
            $s\rightarrow v$ such that $d(s,u)=i$. Then by the
            hypothesis $level_s(u)=i$ and $u$ will be visited before $v$
            due to the previous lemma.

        -   Since $v$ has not been visited before, and when $u$ will be
            expanded and all its neighbors will be visited, then $v$
            will be set with $level_s(v)=level_s(u)+1 \implies level_s(v)=i+1$

        -   $d(s,v)=i+1 \rightarrow level_s(v)=i+1$

Hence by the end of one iteration for a Heist vertex we will have
computed the shortest path from every vertex to that heist. This is
added to the sum of distances from vertices to heist vertices and
inverted in the end to obtain Heist Closeness.

Complexities
============

## Time


The Time complexity of this algorithm is as discussed $O(\|H\|(\|V\|+\|E\|))$.

1.  Line 2-22: $for$ loop running for $\|H\|$ times.

2.  Line 9-18: Inner $while$ runs for a total of $\|V\|+\|E\|$ times if $neighbors(v)$
    is readily available

3.  Line 11-15: *Will depend* on the implementation but can be done in $constant$
    average time 
    
## Space

1.  Line 1: $O(\|V\|)$ space for the $DSum_{HV}$ dictionary

2.  Line 3: $O(\|V\|)$ worst case space for the Queue

3.  Line 4: $O(\|V\|)$ space for the Levels Dictionary

Simply put the space required is in the order of number of vertices in
the Graph it doesn’t matter how sparse or dense the graph is.

Both Space an Time Complexities are independent of the topology of graph
in the worst case and always take $O(|V|)$ space and $O(|H|(|V|+|E|))$
Time.

Implementation
==============

The psuedocode has been translated into Python while using a hash based,
Set, data structure to store the visited nodes and a hash based
dictionary to store the level for each vertex.

The complexity to figure out if a given vertex is present in the set is
$O(1)$ average and $O(n)$ worst. Adding a vertex to the set takes the
same time as well.

For the dictionaries the access complexity is $O(1)$ if the keys are
hashable without collisions, which in our case is of great advantage as
keys are plain integers with unique values for each vertex. All
dictionaries have been initialized a priori so that insertion complexity
doesn’t add up in between iterations.

In the end the time complexity of the algorithm is not truly
$O(|H|(|V|+|E|)$, but is augmented by a few scalars as $|H|(a|V|+b|E|)$.

Evaluation
==========

We evaluated the above implementation by over many($\sim 2000$) random
fully connected graphs and measured the physical time taken on one
device in one run.

The tests have been performed over many heist nodes over graphs that
vary in size by both the number of vertices and the number of edges. The
fully connected graphs have been generated by first generating a
spanning tree for the given vertices and then by randomly connecting any
two nodes until the desired number of edges are present.

The spanning tree was generated by sequentially hopping from one vertex
to another unvisited vertex and joining them till all vertices have been
visited. (Pseudocode in appendix)

![image](/images/2018-09-13-heist-complexity/cc_time.svg) 

Remember that the x axis is not truly $|H|(|V|+|E|)$. In our case it has
been created by $|H|(3|V|+|E|)$. As can be seen Actual Running Time
linearly grows with Time Complexity Function. This shows that the
running time is on par with the proven time complexity. The plot is not
perfectly linear due to other additions of hash set complexities, file
read-write times increasing with bigger graphs, array caches and other
factors.

Other plots involving vertices and edges

![image](/images/2018-09-13-heist-complexity/vertices_vs_time.svg)

![image](/images/2018-09-13-heist-complexity/edges_vs_time.svg)

These can be different at first to explain, but they look the way they
do due to how the edge counts and vertex counts have been chosen.

Lets pick the vertex count vs time plot. In it we notice that as
vertices increase, running time increases but the values stack up. This
is due to varying number of heist counts. In any column the top most
value represents the highest heist count experimented with that vertex
count.

If we notice only the top of the stack, it grows almost linearly
implying that one fixing heist count time depends linearly on vertices.

Similarly with edges (edge count has been more frequently sampled, hence
the dense plot)

Appendix: Random Fully Connected Graph Generation
=======================================
![image](/images/2018-09-13-heist-complexity/alg2.png)
