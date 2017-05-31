# README #

This is sample code to build a Stripe receipts dashboard on your site. The [Ramp Receipts API](https://rampreceipts.com/) client is built with Node.js, Express and React.

The complete Ramp Receipts API documentation is available here: [https://rampreceipts.com/docs](https://rampreceipts.com/docs).

### Quick summary ###

The solution is made from two different applications. The first is a Node.js Express app in the root and the other is a React app created using `create-react-app`. React app is under `/client` folder.

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

3. Install all the required packages for the React app in `./client` folder:

    ```
    yarn
    ```

4. Create `.env` file in `./client` folder and add the following line to it:

    ```
    PORT=3009
    ```

### Running the application ###

1. Run Node.js app using `nodemon` (if you want the server to restart whenever you make a code change) or `yarn start`. The application will be started on port 3010 by default (set in `./bin/www` file).

2. Run React app using `yarn start` in `./client` folder.

3. Application is now accessible from [http://localhost:3009/](http://localhost:3009).

### Who do I talk to? ###

* Built by [Ramp Ventures](http://rampventures.com/) team
* [Contact us](http://rampventures.com/#contactus)

### License ###

This sample project is licensed under the terms of the MIT license. Ramp Receipts API has a different license.
