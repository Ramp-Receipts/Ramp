# README #

This is sample code to build a Stripe receipts dashboard on your site. The [Ramp Receipts API](https://rampreceipts.com/) client is built with Node.js, Express and Angular.

The complete Ramp Receipts API documentation is available here: [https://rampreceipts.com/docs](https://rampreceipts.com/docs).

### Quick summary ###

The solution is made from two different applications. The first is a Node.js Express app in the root and the other is an Angular app created using `angular cli`. Angular app is under `/client` folder.

### Version ###

Version 1.0, built for Ramp Receipts v1 API.

### How do I get set up? ###

0. Make sure you have yarn installed globally (`npm install yarn -g`).

1. Install all the required packages for the Node.js app in the root (`./`):

    ```
    yarn
    ```

2. Create `.env` file in root folder and add the following lines to it:

    ```
    ACCESS_KEY=<your access key here>
    CUSTOMER_ID=<your customer id>
    ```

3. Install all the required packages for the Angular app in `./client` folder:

    ```
    yarn
    ```

### Running the application ###

1. Run Node.js app using `nodemon` (if you want the server to restart whenever you make a code change) or `yarn start`. The application will be started on port 3010 by default (set in `./bin/www` file).

2. Run Angular app using `yarn start` in `./client` folder.

3. Application is now accessible from [http://localhost:4200/](http://localhost:4200).

### License ###

This sample project is licensed under the terms of the MIT license. Ramp Receipts API has a different license.
