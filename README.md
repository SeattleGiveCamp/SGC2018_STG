# STG Scavenger Hunt Demo

A demo react application of the scavenger hunt game.

## Install

Install the following tools to run the server and web app.

* Python 3
* Node.js

Install python dependencies.

```
python3 -m pip install Flask Flask-Cors Flask-Jsonpify Flask-RESTful Flask-SQLAlchemy Jinja2 SQLAlchemy Click jsonify certifi idna pytz idna six
```

Install node packages

```
npm install
```

## Running the server

In the server folder, start the API. If you need more help running the API server, reference the `.txt` files in the `server` folder.

```
python RESTful_API_prototype.py
```

This will run the API on port 5002. In the root folder, start the web app:

```
npm start
```

This will compile and start the app on port 9000.

### Building the app

To build the web app for production, run:

```
npm run build
```

This will compile the app for production and place it in the `dist` folder. This will consist of a single HTML file and a single javascript file.

## Next Steps

* This is a fully functioning react demo application. It can be used as a starting point for the full application. Some of the screens match up with the prototype designs, and new screens will need to be added to completely match the prototype designs.
* There are some TODOs in the code that should be addressed.
* This is built as a single page application. It can be hosted on something that can host single page apps. It is just an HTML and a JS file so something needs to exist to serve those two files.
* The login page is a fake page that needs to be hooked into a user authentication system.
* The concept of an authenticated user also needs to be added to the app. Right now it does not have a concept of a user. For this you could add a mobx user store or an account store that handles the user state and API calls.
* Reference the `.txt` files in the `server` folder for more instructions and information on the API server.

## More Next Step Details

* Users and Login
	- On the login page, type any email and password (it isn't hooked up to anything).
	- User accounts need to be setup.
	- Currently hard coded username of a  GiveCamp developer in the content pages, which should be updated to the logged-on user.
	- Our app has triggers for rewarding points (scanning the correct QR code), but a new API calls needs to be made to add them to the user's account.

* Admin section of site
	- Currently does not exist. The 3 missions for demo were directly inserted into the database and the content pages created manually.
	- Goal: Make the Content Pages and QR Codes dynamic and able to have new missions setup by STG staff in an admin page. Our API documentation explains how to store and read this data.
	- Workflow:
		* Create a new Mission and give it a title. 
		* Set the # of Tasks, and assign point values per task.
		* Since we are using a PWA, they just need to edit the HTML content to be displayed on the content pages. These are currently not dynamically generated but could be.
		* QR Code can be generated for each step, and a QR image displayed for STG to copy into their other marketing forms for distribution.
		
* Rewards
	- Currently, points just accumulate and are displayed as a total on the Home screen.
	- Need to be able to see available rewards.
	- Need to be able to redeem rewards.

![Wireframe diagram of Admin Page](https://github.com/SeattleGiveCamp/SGC2018_STG/blob/master/Documentation/Admin%20Wireframe.png)
