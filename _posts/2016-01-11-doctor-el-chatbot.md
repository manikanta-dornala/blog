---
layout: post
title: "Psychotherapist chatbot - Doctor.el"
date: 2016-01-11
excerpt: "We study the behaviour of the Emacs Psychotherapist programme and thereby make some changes to the source of program <i>doctor.el</i> and hope to bring about some change in the way how the program interacts with us."
comments: true
feature: "{{ site.url }}{{ site.baseurl }}/images/2016-01-11-doctor-el-chatbot/feature.png"
tags: doctor ai chat-bot lisp eliza emacs
---

## ELIZA

ELIZA is a computer program and an early example of primitive natural language processing. ELIZA operated by processing users' responses to scripts, the most famous of which was DOCTOR, a simulation of a Rogerian psychotherapist. Using almost no information about human thought or emotion, DOCTOR sometimes provided a startlingly human-like interaction. ELIZA was written at the MIT Artificial Intelligence Laboratory by Joseph Weizenbaum between 1964 and 1966.

When the "patient" exceeded the very small knowledge base, DOCTOR might provide a generic response, for example, responding to "My head hurts" with "Why do you say your head hurts?" A possible response to "My mother hates me" would be "Who else in your family hates you?" ELIZA was implemented using simple pattern matching techniques, but was taken seriously by several of its users, even after Weizenbaum explained to them how it worked. It was one of the first chatterbots.

It is programmed in LISP and was subsequently ported to many other languages and platforms. We'll be sticking to Eliza in Emacs and which is also programmed in LISP.
<figure>
<figcaption>Source: Wikipedia</figcaption>
</figure>

<h2>Basic Functioning of ELIZA</h2>
<p>
Any input given by the user is taken by the doctor and is tokenized and is interpreted by different fucntions.
</p>
<p>for example</p>
<pre>
(doctor-put-meaning maternal 'family)
(doctor-put-meaning paternal 'family)
(doctor-put-meaning stab 'death)
(doctor-put-meaning murder 'death)
</pre>
<p><br>
These four lines assign maternal and paternal a <i>meaning</i> family and stab, murder as <i>death</i>.
</p>
<pre>
(defun doctor-family ()
(doctor-possess doctor-sent doctor-found)
(doctor-type (doc$ doctor--famlst)))
</pre>
<p>
<br>This function doctor-family calls doctor--famlst whenever maternal or paternal appears in the input!
</p>
<pre>
(set (make-local-variable 'doctor--famlst)
		'((tell me (doc$ doctor--something) about (doc// doctor-owner) family \.)
(you seem to dwell on (doc// doctor-owner) family \.)
((doc$ doctor--areyou) hung up on (doc// doctor-owner) family \?)))
</pre>
<p>
<br>Now the <i>famlst</i> function picks from one of the 3 responses and displays us and then cycles to next response for fucture references of family.
</p>

<h2>Its Intelligence</h2>
<p>
The intelligence of the program heavily relies on the fact that it is a Psychotherapist.
</p>
<p>
As can easily be observed it replies to a statement with an other question in general, that too with very intimate, asking us about more intricate details of the statement made. By doing so it gives us an illusion of a high class therapist with a good charm.
</p>

<p> Here is an excerpt from a sample conversation</p>
<pre>
I am the psychotherapist.  Please, describe your problems.  Each time you are finished talking, type RET twice.

How are you?

I'm ok.  Tell me about yourself.

I'm sad today.

Why do you say you are sad today?

I don't know.

Is it because of your plans that you say you do not know?

I'm taking cocaine

Do you use cocaine often?

yes

I see...  Well, what makes you believe this is so?

I'm depressed

Are you depressed often?

Yes

Yes, hmmm... so, are you sure that this is so?

Yes

I understand.  So do you really think this is so?
</pre>
<p>
As you can see, ELIZA compells the user to give a repy which is sort of the same thing done by a therapist.
</p>
<h2>Shortcomings</h2>
<p>
Clearly ELIZA gets struck with repetetive responses and after a point it gets annoying, but that might actually be the point.
</p>
<p>
It sometimes doesn't get positivity.
</p>
<pre>
I'm happy today

Do you get happy often?

My grades are good nowadays.

Tell me about your grades.

They are really good

Why do you say they are really good?
</pre>
<h2>Improvements I brought about</h2>
<p>
One of the problems I've seen is as follows
</p>
<pre>
I'm from Kanpur.

Why do you say you are from kanpur?
</pre>
<p>
This is not what we expect. we expect a greeting, so I tried fixing it by defining new functions for location identification.
</p>
<h3>Improvised conversation</h3>
<pre>
I'm from Delhi

Hi there from Delhi.

My home is in Delhi

Oh, Delhi must be a nice place to live.

I used to live in Delhi

I once lived in Delhi too.

I came here from Delhi

Good.
</pre>
<p>
I built a list of replies to be given whenever a person says he is from so and so location and they keep cycling just like other doctor replies.
</p>
<h2>Other shortcomings</h2>
<p>
Its replies itself!<br>
If you don't enter any text and press RET it assumes what it said as the input and then replies LOL.
</p>
<pre>
I would appreciate it if you would continue.

Why do you say you would appreciate it if I would continue?
</pre>
<p>
No hardcoded Dictionary!<br>
If you hit with random words it assumes they are nouns!
</p>
<pre>
bum bhole nath

Why do you say bum bhole nath?
</pre>

<h2>Conclusion</h2>
<p>
It is a very nice attempt at creating an AI, the ascpect of memory and keeping the conversation going really make it feel human.
</p>
<p>
Please find here the modified doctor.el file
</p>
<p>
<a class="btn btn-primary" href="https://github.com/manikantareddyd/doctor-eliza" target="_blank" role="button">doctor.el &raquo;</a>
</p>

<hr>
