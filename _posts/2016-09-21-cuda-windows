---
layout: post
title: "GPU accelerated computing on Windows 10 (Theano & Keras)"
date: 2016-04-11
excerpt: "There are a ton of resources out there to help with setting up your deep learning machine with linux. There is hardly any material available for Windows 10 machines and those that are available are outdated. I have gone through the pain of sifting through various blogs and other sites to get my setup running and wanted to share it with you guys."
comments: true
tags: machine-learning windows cuda gpu
code: 1
---

## Why?
The first question that comes to your mind is definitely, why is this guy even trying to do serious stuff on a Windows machine? Well I've my reasons. I was recently trying to build a convolution neural network to segment some ultra sound images for identifying nerves! Naturally I had to choose gpu based computation for training. I picked up the Keras + Theano combo for my purposes (I could have gone with tensorflow too!). But soon as fate had it for me, setting up the gpu (NVIDIA 950M) drivers on Ubuntu *for my device* was traumatizing. Every time I installed the nvidia drivers, my display bloke. I was forced to stare at blank screens, doing nothing. I headed to countless forums for help, but as it turns out my problem was a bit device specific and probably there wasn't a solution but to not install nvidia drivers. So I had to explore other options.

Luckily I tried installing cuda development kit on windows and it didn't break it. So I decided to bring the rest of the setup to the same platform.

In case you are compelled to run a deep learning setup on a Windows 10 64-bit Machine, this guide might positively help you. If you need any other help, do comment below.

---

## Guide to Install Deep Learning Setup on Windows 10

## Installing CUDA

Download cuda 7.5 from NVIDIA [here](https://developer.nvidia.com/cuda-downloads). Choose the *local* installer and run it.

Cuda will now install to `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v7.5`

*   Make sure that the following two are added to **system path** (Not the user path)

    *   `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v7.5\libnwp`
  
    *   `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v7.5\bin`

*   It is important that they are added to the **system path** not the user path.

At this stage you might be get a warning that looks like

<center>
    <img src="{{site.url}}/images/2016-09-21-cuda-windows/cuda-needs-vs2013.png" style="width:50%" />
</center>

or

<center>
    <img src="{{site.url}}/images/2016-09-21-cuda-windows/cuda-needs-vs2013-2.png" style="width:50%" />
</center>

Do not check the box and click continue.

Turns out cuda needs visual studio compilers. Specifically it needs the compilers from Visual Studio 2013. I already had Visual Studio 2015 installed but cuda installer didn't bat an eye.

In order to successfully install cuda you'll need visual studio 2013 and you can grab the free community edition [here](https://www.visualstudio.com/en-us/news/vs2013-community-vs.aspx). Visual Studio takes some time to install, please have some patience.

After installing Visual Studio 2013 remember to add this to *system path* `C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\bin`

You should by now have cuda installed successfully.

## MINGW64
We'll now need a complete runtime environment for gcc to support binaries native to Windows 64-bit and 32-bit operating systems. MINGW64 is the right fit for out job.
Download MinGW-w64 from [here](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/)

Run the installer with the following setup.
<center>
    <img src="{{site.url}}/images/2016-09-21-cuda-windows/mingw-setup2.png" style="width:50%" />
</center>
It is important that architecture is set to x86_64 and the version is 5.3.0.
Remember the path, where you installed it.

Now add `INSTALLATION PATH\mingw64\bin` to **system path**

Also rename the `mingw32` to `mingw32-back` as the 32  bit binaries compete with the 64 bit binaries.

You can test your installation of `MinGW` using the following...

```shell
$$ where gcc; where g++; where cl; where nvcc; where cudafe; where cudafe++
$$ gcc --version; g++ --version
$$ cl
$$ nvcc --version; cudafe --version; cudafe++ --version
```

## Theano

I installed `Theano 0.8.2` on my machine, I haven't tested the installation neither with other versions of Theano nor other machines. You might be in luck, just try these steps.
Install the stable version of `Theano 0.8.2` from github

```shell
$$ git clone https://github.com/Theano/Theano.git theano-0.8.2 --branch rel-0.8.2
$$ python setup.py install 
```
Check if Ananconda registered it,

```shell
conda list | grep -i theano
```
## OpenBLAS 0.2.14 (Optional)
We are going to perform GPU based computations, so why stick to *CPU optimized* libraries? In practice, however, many operations are often executed in parallel on the CPU while the GPU is busy learning the weights of the deep neural network and the augmented data discarded after use. For this reason, it is highly recommend installing the OpenBLAS library.

According to the [Theano](https://deeplearning.net/software/theano_versions/dev/install_windows.html#install-windows) documentation, the multi-threaded [OpenBLAS](https://en.wikipedia.org/wiki/OpenBLAS) library performs much better than the un-optimized standard BLAS (Basic Linear Algebra Subprograms) library, so that's what we use.

Download OpenBLAS from [here](https://sourceforge.net/projects/openblas/files/v0.2.14/OpenBLAS-v0.2.14-Win64-int32.zip/download) and extract the files to **OPENBLAS DIR**
  + Add `**OPENBLAS DIR**\bin` to `PATH`

## Using CPU and GPU

Add these lines to the top of your python code to start using the GPU mode, simply uncomment them to switch to CPU mode

```python
import os
os.environ['KERAS_BACKEND'] = 'theano'
os.environ['THEANO_FLAGS'] = 'floatX=float32,device=gpu,lib.cnmem=0.8,dnn.conv.algo_bwd_filter=deterministic,dnn.conv.algo_bwd_data=deterministic,blas.ldflags=-LC:**OPENBLAS DIR**/bin -lopenblas'
```
**OPENBLAS DIR** is where you installed OpenBLAS.

Your keras model should now be using the GPU! 

## Optional
You could definitely install `cuDNN` to further accelrate your performance, but that'll be a post for later.