# Insurance Microservices Project

This project is designed as a practical demonstration of a microservices-based architecture that manages insurance data transmission securely and efficiently. It includes a Next.js frontend built with ShadCN components and two Express.js backend microservices: a Producer (sending data via AWS SQS) and a Consumer (receiving data and storing it into a MongoDB database).

---

## Overview

Users submit insurance details through a modern, responsive interface. The submitted details are securely transmitted between microservices using AWS Simple Queue Service (SQS), with all historical transmission data logged for reference.

---

## Screens

### Welcome page

![Alt text here](/Users/yairyatzkan/Desktop/welcome.png)

### Details page

![Alt text here](/Users/yairyatzkan/Desktop/details.png)

### History page

![Alt text here](/Users/yairyatzkan/Desktop/history.png)


## Questioins

### 1. How can you make the project scalable?

First, microservices is a scalable architecture. furthemore, To scale this system we will use containerization tools like docker and orchestrate them with Kubernetes.

### 2. Why did you choose that kind of database?

mongoDB fits because it's can easily handle an evolving structure of insurance data which is not necessarily for tables. It also integrates smoothly with JS through the mongoose ODM.

### 3. Why did you choose these specific details from the insurance world? Why do you think they are the most important ones?

The details i chose to use are: Insurance limit, Insurance coverage, Insurance premuium, Insurance type.
I found them the most important details because insurance is a financial product that people purchase and the monitary details are the most relevant when talking about financial decisions.

---
