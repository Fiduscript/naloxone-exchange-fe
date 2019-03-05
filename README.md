# Fiduscript

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Getting started

- Install angular-cli globally by running `sudo npm install -g @angular/cli` .
- Install all remaining dependencies by running `npm install` in the project root.
- Run post-install script `npm run postinstall`

## Development server

Run `npm run dev-server` to start back-end and front-end server tasks. Navigate to `http://localhost:8081/`. The app will automatically reload if you change any of the source files.

__WAIT!__ Are you a server-sharing romatic? Trying to save an extra dollar but can't use the same port again and again? Or are you otherwise behind a single public IP and want to run multiple servers under different ports?  In _your seperate user accounts_, try running (from the package root directory) `python bin/multi-dev-server.py` instead of the command above. Now you love birds can flurish! Make sure to record the port the server started on! (It probably won't ever change!).

## AWS Resources

In order to access AWS resources in development mode you will need to create a `.env` file in the package root directory and fill it with the following:

```
AWS_ACCESS_KEY_ID=
AWS_ACCESS_KEY_SECRET=
```

Follow [this tutorial](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) to see how to provide those credentials.

__Never commit your `.env` file!__

## Beta server
When code is deployed, it first goes to a [beta site](http://beta.naloxoneexchange.com/). In order to have access to this site, you must add your IP address to the security group associated with it.
Go to the [AWS Console](https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#SecurityGroups:sort=groupId) and go to the EC2 panel. On the left side, under 'Network and Security,'
click 'Security Groups.' There, you'll see a list of groups, but the one we care about is 'Naloxoneexchangefrontend-env-staging.' Click on this, and then on the bottom half of the screen click on the 'Inbound' tab.
You need to then hit 'Edit,' followed by 'Add Rule,' and change the first dropdown to 'HTTP,' the source dropdown to 'My IP,' and add a description so we know what device/user is being whitelisted. Then be sure to 'Save,'
and you should now have access to the site!

## Production server

Run `npm run prod-server` to compile code and start the server. Navigate to `http://localhost:8080/` to use the app. The server will run with the compiled files in the `dist/` directory; it will not refresh on changes to source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

__Note:__ SkullJack uses `.pug` and `.styl` files instead of the auto generated `.html` and `.css` files. If you generate a component or module make sure to rename these!

__Note2:__ Don't forget about the --routing flag when generating code when applicable!

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Testing

Front end smoke tests are required. These tests only verify that a component can render without error.

- Run `ng test` to start a continuous test server.
- Run `npm run build-test` to run deployment tests. If these fail, so will your deployment. This will also run lint tests! __PLEASE RUN THIS BEFORE POSTING A CODE REVIEW!__ 

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Releasing

Code intending to be deployed to [Prod](naloxoneexchange.com) should use:
- Git base branch: release
- Pipeline name: [NaloxoneExchangeFrontend](https://us-east-2.console.aws.amazon.com/codesuite/codepipeline/pipelines/NaloxoneExchangeFrontend/view?region=us-east-2)
- Beta Url: beta.naloxoneexchange.com
- Prod Url: naloxoneexchange.com
  
If developing against the feature branch:
- Git base branch: master
- Pipeline name: [NaloxoneExchangeFrontend-Feature](https://us-east-2.console.aws.amazon.com/codesuite/codepipeline/pipelines/NaloxoneExchangeFrontend-Feature/view?region=us-east-2)
- Feature Url: feature.naloxoneexchange.com


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
