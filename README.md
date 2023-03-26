# panda

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).


## Notes

Unfortunately I ran out of time having spent more than 3 hours on the technical test, but I feel that the example I have provided is a good proof of concept.

The application is built using Node JS and Loopback which is a framework for building REST APIs within node

- I realize that there is a soft requirement for preference to smaller frameworks
- However most of my experience with writing REST APIs is in Loopback, so I've opted to use that as it gave me a better chance of completing the technical test (sorry)

The benefits to Loopback are that you get a lot of functionality out of the box for example:

- Skeleton elements e.g. Controllers, Models, Datasources
- Skeleton unit tests
- Best practice elements like Linters already plumbed in
- Swagger pages to test the API with
- REST API validation is driven from annotations in the model classes
- It allows different datasources to be connected in
  - At the moment this is using a Memory Data source which persists to the filesystem for now
  - However, you can for instance use databases/nosql elements Mongo DB etc.

### What is missing

There are a number of elements which I did not get chance to complete and the prototype is not what I would consider production quality unfortunately

- Unit tests are missing
- Validation is not provided on all fields in the model
- Error messages are not easiliy localised but could be in a future version
  - You will notice as you input bad data into Swagger and execute, you will get an error response from the Loopback API
  - You can change this using Middleware to then plumb in your own responses/localised messages, however I did not have time for this

## Getting started

The application is written in Node JS and you will need to do the following first:

1. Install Node JS version 16.16.0 from [here](https://nodejs.org/en)
2. Install Visual Studio code found [here](https://code.visualstudio.com/)
   a. This is if you want to examine the code and run through an IDE
   
   
## To run the prototype

Using a terminal window in the root of the project
1. Install the project dependencies using NPM
```sh
npm install
```

2. Run the prohect
```sh
npm start
```

3. Navigate to the Swagger page in a Browser: http://127.0.0.1:3001/explorer

4. Using the swagger page execute the examples
- Note, the test data provided in the tech test is already pre-loaded into the service


## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3001 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
