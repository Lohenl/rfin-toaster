# Toastbank. Simple as toast.

Team Toasters' Toastbank: A simple Angular PWA developed with and deployed on AWS Amplify.

The Express webapp is hosted in AWS Lambda as a severless backend for the PWA - working with Angular requires a proxy server in order to work with external APIs (because of CORS), so five hours were spent rewriting proxy routes to whatever was provided in the Mambu API Postman collection.

Built for a certain fintech hackathon.

## Working Pages

The pages you would want to visit in order:

* /#/landing - Landing page
* /#/signup - Account Creation Wizard (It boasts a grand total of 1 (one) integrated Mambu API)
* /#/dashboard - Account Dashboard
* /#/lifestyle - Discovery page
* /#/wallet - API test page (Just to show we did manage to hook it up despite CORS restrictions!)

## The Cool and The Gimmicky

* Anonymous authentication is done with AWS Cognito, you can check it out at work either in Chrome DevTools developer tab or check out the HTTP Headers
* Dark/Light Theme switcher located at top right bar 
* There is some effort put into making some of pages responsive, give it a spin with Chrome DevTools!
* You can check for PWA compliance with DevTools also, under the audit tab

## How to install a PWA on mobile or desktop?

https://medium.com/progressivewebapps/how-to-install-a-pwa-to-your-device-68a8d37fadc1

Desktop samples here:
![](https://i.imgur.com/CzxN8LL.png)
![](https://i.imgur.com/0TWz19s.png)
![](https://i.imgur.com/kDheQIf.png)
