---
layout: post
title: "Inversion of Control"
date: 2016-10-27
excerpt: "A sample implementation of the Inversion of Control principle with a comparative analysis of the approach with a traditional formulation of the same problem."
comments: true
feature: "/images/2016-10-27-inversion-of-control/feature.png"
tags: software-engineering dependency-injection
code: 1
---

## Inversion of Control

The code for this project can be forked from [Inversion of Control](https://github.com/manikantareddyd/InversionOfControl).

Inversion of Control (IoC) increases the modularity of program and introduce flexibilty to add run time components and perform independent testing of individual components without worrying about the dependencies.

We'll view IoC as Dependency Injection (DI). We'll essentially decouple the dependencies between layers through some shared abstractions.

This sample is written in `python 2.7` and depends on pip2 package `simplejson`.

Run as

```shell
$$ python2.7 main.py
```

## Use - Case

The user in the end has the capability to create instances of a class called **FruitBay**.

FruitBay is capable of storing fruit names and their corresponding prices.

It can also provide with the cheapest fruit.

## Implementation

FruitBay provides two methods.

*   `FruitBay.add_fruit`
    *   usage: `FruitBay.add_fruit(fruit_name="Apple",fruit_price="20")`
    *   returns: None
* `FruitBay.get_cheapest_fruit`
    *   usage: `FruitBay.get_cheapest_fruit()`
    *   returns: Name of the cheapest fruit, added till now

### Traditional
Here is the traditional implementation of FruitBay

```python
class FruitBayTraditional:
    def __init__(self):
        self.fruits = []

    def add_fruit(self,fruit_name,fruit_price):
        self.fruits.append({'name':fruit_name,'price':fruit_price})

    def get_cheapest_fruit(self):
        sorted_fruits = sorted(self.fruits, key=lambda k: k['price'])
        return sorted_fruits[0]['name']

fuku = FruitBayTraditional()
fuku.add_fruit("Apple",12)
fuku.add_fruit("PineApple",1)
fuku.add_fruit("Grape",34)

print fuku.get_cheapest_fruit()
```

### Inducing Dependency (Decoupling the execution)

In the `get_cheapest_fruit` we could have used any sorting algorithm. So it would be better if we fragment the code as follows.

```python
class FruitBayFragmented:
    def __init__(self,sort_machine):
        self.fruits = []
        self.sort_machine = sort_machine

    def add_fruit(self,fruit_name,fruit_price):
        self.fruits.append({'name':fruit_name,'price':fruit_price})

    def get_cheapest_fruit(self):
        sorted_fruits = self.sort_machine(self.fruits)
        return sorted_fruits[0]['name']

def my_sort_machine(x):
    return sorted(x, key=lambda k: k['price'])

fuku = FruitBayFragmented(my_sort_machine)
fuku.add_fruit("Apple",12)
fuku.add_fruit("PineApple",1)
fuku.add_fruit("Grape",34)

print fuku.get_cheapest_fruit()
```

We can have any generic algorithm in the `my_sort_machine` method. Notice that `FruitBayFragmented` has no idea about the implementation of `sort_machine` within its implementation, except that it takes an input of a dictionary and produces a dictionary as an output.

We could have allowed the client to choose the method. To push it further we could have asked the client to implement their own sort.

For a few classes and methods this might seem trivial to implement but imagine a Class that depends on numerous other components, tracking them would be a ginormous task.

It would be painful for the client to create instances of dependencies and then pass them as arguments.

It also creates redundant declarations during testing phase. We'll be interested in testing a single component, but end up writing code for instance creation of dependencies.

What if, there was a way to hand over the dependencies to the object only when it's created and avoid unnecessary declarations. We'll need a mechanism, a control sequence, to find what our object depends on and then provide the them.

This can be acheived by implementing containers or locators. We'll be using the term container henceforth.

## Container

Container is a service that can manage dependencies and provide them when required. Container is capable of keeping track of user-implemented methods and inject those methods into an object when its instantiated.

Container provides three methods.

*   `Container.add_method`
    *   usage: `Container.add_method(module="client_code",method_name="my_sort_machine",dependency_name="sort_machine")`
    *   returns: None
* `Container.register_from_config`
    *   usage: `Container.register_from_config()`
    *   returns: None
* `Container.resolve`
    *   usage: `Container.resolve(required_class=FruitBay)`
    *   returns: An instance of class `FruitBay` complete with dependencies resolved.

`Container.add_method` registers the method provided to it. For example in usage case, it'll search for `my_sort_machine` in the `client_code` module and registers it as method that can satisfy the dependency `sort_machine`.

Instead of using the above method we could also have provided a config.json file as below

```json
[
    {
        "module":"client_code",
        "method_name":"my_sort_machine",
        "dependency_name":"sort_machine"
    }
]
```
and then called the `Container.register_from_config` method. The result is exactly the same.

`Container.resolve` will automatically decide what the class provided to it depends on and checks if such a dependency has been registered with it and then creates an instance of the class by injecting the dependency from the registered methods.

For the example in use case, `resolve` will figure out that `FruitBay` has a dependency by name `sort_machine`, checks if any method has been registered to satisfy `sort_machine` and use it to create an instance of `FruitBay` and return it.

We'll not discuss the implementation of `Container` class as its irrelavant to understanding Dependency injection. However, feel free to dig into the `container` module, its really a simple implementation.

## Final Working

*   Client writes required implementations in the `client_code` module
*   Client registers such methods with the `container`
*   Client need not worry about what dependencies a class has and can call the `resolve` method to create an instance.

Lets take a look at the code.

#### framework

```python
class FruitBay:
    def __init__(self,sort_machine):
        self.fruits = []
        self.sort_machine = sort_machine

    def add_fruit(self,fruit_name,fruit_price):
        self.fruits.append({'name':fruit_name,'price':fruit_price})

    def get_cheapest_fruit(self):
        sorted_fruits = self.sort_machine(self.fruits)
        return sorted_fruits[0]['name']
```

#### client_code

```python
def my_sort_machine(x):
    return sorted(x, key=lambda k: k['price'])
```

#### main

```python
from framework import *
from container import *
from traditional import *

#### IOC Implementation ###

container = Container()
## container.add_method(module="client_code",method_name="my_sort_machine",dependency_name="sort_machine")
container.register_from_config()

fuku = container.resolve(required_class=FruitBay)

fuku.add_fruit("Apple",12)
fuku.add_fruit("PineApple",1)
fuku.add_fruit("Grape",34)

print fuku.get_cheapest_fruit()
```
Notice that client has no knowledge of the dependencies of FruitBay, except that he needs to define some methods in the `client_code` module.

## Advantages

The advantages of this technique might not be apparent from this small, rather tiny, implementation. But it is usually not the case in industry. 

A huge framework may be built in whose documentation it is mentioned that the user can define some methods and register them against existing methods in the framework. The user may not know which classes would use which function (and is generally not interested) but just that their implementation of a particular method works better in their usage scenario. So all that the client has to do define such methods and register them and finally use the resolve method to generate object against usual object instantiation.

During testing phases, when testing individual components, we need not worry about declaring the dependencies of the component under testing. Using the `resolve` method you could have directly generated the instance of the class and test it.

Another advantage is centralization of dependencies. By incorporating IoC we can have a much cleaner code, tracking all the methods in the project.

 