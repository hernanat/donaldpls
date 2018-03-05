# DonaldPls

## What is this?

DonaldPls is a satire web project based on the shenanigans of the 45th president of the United States, Donald J. Trump.

As of now, the site includes a Donald speech generator using multideep markov chains, and training texts assembled from speeches and statements by the Donald.

## Requirements

This web app uses [.NET Core](https://www.microsoft.com/net/core#macos) for the backend and [Angular2](https://angular.io/) on the frontend. Follow the links to see how to set those up.

To serve the Angular2 app, we use [Angular-CLI](https://github.com/angular/angular-cli).

## Running

Clone the repo. 

Once you have all the requirements satisfied to run the app, you can start the backend and frontend by taking the following steps:

Start backend: 

`$ cd donaldpls/backend`

`$ dotnet restore`

`$ dotnet run`

Start frontend:

`$ cd donaldpls/frontend`

`$ ng serve`

If all goes well, you should be able to navigate to `http://localhost:4200` and see the site up and running.

## Speech Generator

When you load the Speech Generator page, a speech will have automatically been generated. To generate new speeches, simply click on the Donald.

## Wall Breaker

To play the game, navigate to the Wall Breaker page and press start. Use your mouse to move the paddle left and right to break bricks.

## Contributing

If you are interested in contributing or have any suggested changes, clone the repo and make a pull request :)

