
# Insurance Microservices Project

This project is designed as a practical demonstration of a microservices-based architecture that manages insurance data transmission securely and efficiently. It includes a Next.js frontend built with ShadCN components and two Express.js backend microservices: a Producer (sending data via AWS SQS) and a Consumer (receiving data and storing it into a MongoDB database).

---

## Overview

Users submit insurance details through a modern, responsive interface. The submitted details are securely transmitted between microservices using AWS Simple Queue Service (SQS), with all historical transmission data logged for reference.

---

## Important Design Choices

### 1. How can you make the project scalable?

Microservices architecture inherently supports scalability. To scale this project, simply deploy multiple instances of each microservice behind a load balancer, or use container orchestration tools like Kubernetes. AWS SQS is already highly scalable and ensures reliable communication at scale.

### 2. Why did you choose that kind of database?

I chose MongoDB because it's highly flexible and can easily handle the evolving structure of insurance data without complicated migrations. It also integrates smoothly with JavaScript-based stacks, making development simpler and more efficient.

### 3. Why did you choose these specific details from the insurance world? Why do you think they are the most important ones?

I selected details like insurance type, coverage limits, premiums, and client personal identifiers because these directly affect policy decisions and customer interactions. They form the core data required by insurance providers, balancing detail and usability, which is essential for practical insurance processing.

---
