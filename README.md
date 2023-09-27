# Introduction

This project aims to create a microservice that synchronizes XML data from suppliers, including product stock and prices. We often face challenges in keeping our data up-to-date due to the volume of data and the rapid changes from some suppliers. This microservice will address these issues by regularly fetching XML data, storing it locally, and pushing updates to our system when changes occur. Additionally, we will explore ways to simplify the process of adding new suppliers.

## Prerequisites

Before you begin, ensure you have the following installed:

* Node.js
* npm

## Installation
```bash
npm i
```

## Usage

1) Run the following command to start your Express server:

```bash
node app.js
```

2) If everything is set up correctly, you should see the following message in your terminal:

```arduino
Server is running on port 3000
```

3) Open a web browser and go to http://localhost:3000/fetch-supplier-data