# Recyclable

## A Web App To Help Create A Sustainable Future

### HackCU VI: Max Rosoff, David Hallstrom, Ben Gillett

![recyclable.png](./recyclable.png)

[Our Live Deploy](https://recyclable.tech) (While live, our Google Cloud Backend has been taken down because we are poor).


## What is it?

You finish your delicious diabetes-in-a-bottle beverage graciously provided by the good organizers of HackCU, and then turn your attention to the problem of the plastic or light aluminum container with which you are about to pollute the environment. You inspect it for a recycling number or instruction, but in your sleep-deprived deliriousness, find nothing. You walk to the waste containers, and inspect the confusing graphical list of "recycle this" and "landfill that" items. Perhaps you're familiar with the recycling policies in your far distant hometown, but not in this new city which has temporarily become your home. What will you do??

Attempting to recycle containers that can't be recycled causes a lot of havoc and extra work for recycling plants, thereby decreasing their efficiency and increasing their cost. But putting extra waste in the landfills is just as bad: this practice is entirely unsustainable. What to do?

This is where Recyclable comes in: with just a brief interaction with our app using a mobile device of your choice, you can quickly determine which waste articles are recyclable in your area. Using sophisticated computer vision algorithms and our extensive hand-picked dataset, our app uses a single image of your waste product to determine its recycling class to help you make your decision.

**By using our app, you save your recycling facilities time and work while also reducing unnecessary waste in our landfills!**

## How does it work?

This project is built on `Express.js` (server) and `React.js` (client). It uses Google Cloud for Neural Net Image processing.
We're hosting it on GCP, and our domain was free from Domain.com! See [recyclable.tech](https://recyclable.tech).

To run it, you'll probably need `nvm` and `npm` and other delicious commands starting with `node`. Some combination of `git clone`, `nvm install --lte`, `npm i`, and `npm run prod` might help install and start it.

We made these design choices for a few reasons: since the project is a web app, it is platform independent and much easier to maintain. The Google Cloud Platform tools are easy to configure and scale, as make it easy to expand the training dataset.

**Our Google Cloud Backend has been taken down at this time.**

## Scaling

Recyclable is quite scalable: recycling capabilities are easily acquired or entered for any city, and the machine learning dataset can be improved upon to include products from all localities while also improving accuracy.
The model can be deployed in parallel using only minimal computing power. Our implementation costs only a few cents per hour to operate.
