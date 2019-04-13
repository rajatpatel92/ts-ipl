// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDrPhODFsyOB7deLA5WS3Ny4sD6Sm5bmw0",
    authDomain: "ts-ipl.firebaseapp.com",
    databaseURL: "https://ts-ipl.firebaseio.com",
    projectId: "ts-ipl",
    storageBucket: "ts-ipl.appspot.com",
    messagingSenderId: "658380817636"
  },
  appConfig: {
    adminUid: "g4bUNW5oEBcSItxmAWbYriTNE622"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
