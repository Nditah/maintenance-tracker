# Link
https://nditah.github.io/maintenance-tracker/ui/index.html

# Project Overview
Maintenance Tracker App is an application that provides users with the ability to reach out to
operations or repairs department regarding repair or maintenance requests and monitor the
status of their request.

# Required Features
1. Users can create an account and log in.
2. The users should be able to make maintenance or repairs request.
3. An admin should be able to approve/reject a repair/maintenance request.
4. The admin should be able to mark request as resolved once it is done.
5. The admin should be able to view all maintenance/repairs requests on the application
6. The admin should be able to filter requests
7. The user can view all his/her requests


## SERVER-SIDE

npm install -g eslint for a global install
eslint --init

First we'll install babel-cli.

$ npm install --save-dev babel-cli
Along with some presets.

$ npm install --save-dev babel-preset-es2015 babel-preset-stage-2

Then we'll add our first npm start script in package.json.

  "scripts": {
+   "start": "babel-node index.js --presets es2015,stage-2"
  }

#  Watching file changes with nodemon
We can improve our npm start script with nodemon.

$ npm install --save-dev nodemon
Then we can update our npm start script.

  "scripts": {
-   "start": "babel-node index.js"
+   "start": "nodemon index.js --exec babel-node --presets es2015,stage-2"
  }

  // https://github.com/babel/example-node-server