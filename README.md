# STG Scavenger Hunt Demo

A demo react application of the scavenger hunt game.

## Install

Install the following tools to run the server and web app.

* Python 3
* Node.js

Install python dependencies

```
python3 -m pip install Flask Flask-Cors Flask-Jsonpify Flask-RESTful Flask-SQLAlchemy Jinja2 SQLAlchemy Click jsonify certifi idna pytz idna six
```

Install node packages

```
npm install
```

## Running the server

In the server folder, start the API:

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