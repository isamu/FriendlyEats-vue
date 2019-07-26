## Yet another FriendlyEats

This is yet another FriendlyEats based on a start-up kit for a Firebase web project, which uses Vue.js.

![FriendlyEats](./public/img/sample.jpg "サンプル")


## Instruction

1. Git clone this repository
2. Run "npm install firebase-tools -g" to install firebase tools. 
3. Run "npm install" once to get necessary node modules.
4. Run "npm install" once in the functions directory as well.
5. Open the firebase console (from https://firebase.google.com) and add a project
6. From the dashboard of this project, add an app and choose "web" (</>).
7. From the setting of this app, choose "Config" (in Firebase SDK snippet)
8. Copy the config file, and paste into src/firebase/firebase.js file.  
9. Replace the word "fir-vue-startup-kit" in .firebaserc file with your Firebase project name.
10. Open the firebase console, and create a Cloud Firestore (make it "secure" for now). 

## Available Scripts

In the project directory, you can run:

### `npm run serve`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Vue in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `firebase deploy`

Deploys the app to the Firebase cloud. You need to run "npm run build" before the deployment.

