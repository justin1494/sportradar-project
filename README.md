# Sportradar Coding Academy coding task

Hi!
My name is Marcin and this is the coding task for the sportradar internship.

## HOW it works?

As the Sportradar API is a B2B API, I was getting a CORS error when trying to fetch the data. To handle that, I used a proxy server (since I am not that fluent in making such programs, I used [GoBeteen app from pwalsh's gitHub](https://github.com/okfn/gobetween)).

## Getting started

In order to start the app, you have to:

1. In the app root folder, make a .env file and type inside:

```Javascript
REACT_APP_API_URL='{key was provided in e-mail}'
```

2. Go to the /server directory and execute two commands:

```Javascript
$ npm install --legacy-peer-deps
$ npm start
```

You should get the prompt:

```Javascript
Serving from port 3005
```

This starts the proxy server.

3. Open new terminal window and in root directiory of the app execute two commands:

```Javascript
$ npm install
$ npm start
```

This will start the app (default under the 3000 port)..

Now the app should run.

## Additional features

I have added some additional features, such as a search bar to search through the fetched table. Due to a lack of time, I was unable to add more options, but I have been thinking about them. As further options, you could add filters to the table, such as match date, match result, win, loss, etc. For the match subpage, you could fetch data about every player (based on their ID) and display their number, position, and so on.
