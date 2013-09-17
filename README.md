Node Twitter API 1.1 Example
==========================

Basic example of using Twitter 1.1 API with node

It uses: 
-------------------------------------
- Passportjs for authentification http://passportjs.org/
- ntwitter for API calls 
- expressjs
- angularjs 

How to run example
-------------------------------------
- *Important* Currently ntwitter 5.0.0 has a an issue(https://github.com/AvianFlu/ntwitter/pull/121) with twitter 1.1 search API,the path is not correct. you can apply a manual fix (https://github.com/crscastillo/ntwitter/commit/2661c956c2f7a2bb0de2b2c3c1e6ab792e672c6d) or wait for the pull to be merged.

- run *npm install*
- run *TWITTER_CONSUMER_KEY=xxx TWITTER_CONSUMER_SECRET=xxx node app.js*
