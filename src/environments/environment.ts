// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:'http://localhost:3000',
  socketUrl:'http://localhost:8000',
  s3_region: 'ap-south-1',
  s3_bucket_name: 'event-era-events',
  s3_secret: 'ZGq0sM1b4OtUbgPy4vRIcyaoq5Eh6gfTQX/Nu1/0',
  s3_access: 'AKIASO5SQSTQEWEKBSP5',
  paypalClientId: 'AWCK_Xyc-vPGHMNz7NnUTQg5AajrxH-of_9l5-6SBCcau---NHAE7uEqSILmhAxXXqYIr_tHJnwg8uhE',
  paypalSecret: 'EGW3mTcVgfU1a8hr0Znq1khDHb8K3adcX1FIQSXAAhKUrTAMxU7I0_BuYRvm6mT9i4o-YFVPjs6M0cB_'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
