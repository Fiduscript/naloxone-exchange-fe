# Fiduscript

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Getting started

- Install angular-cli globally by running `sudo npm install -g @angular/cli` .
- Install all remaining dependencies by running `npm install` in the project root.
- Run post-install script `npm run postinstall`

## Development server

Run `npm run dev-server` to start back-end and front-end server tasks. Navigate to `https://localhost:8443/`. The app will automatically reload if you change any of the source files.

__WAIT!__ Are you a server-sharing romatic? Trying to save an extra dollar but can't use the same port again and again? Or are you otherwise behind a single public IP and want to run multiple servers under different ports?  In _your seperate user accounts_, try running (from the package root directory) `python bin/multi-dev-server.py` instead of the command above. Now you love birds can flurish! Make sure to record the port the server started on! (It probably won't ever change!).

## AWS Resources

In order to access AWS resources in development mode you will need to create a `.env` file in the package root directory and fill it with the following:

```
AWS_ACCESS_KEY_ID=
AWS_ACCESS_KEY_SECRET=
```

Follow [this tutorial](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) to see how to provide those credentials.

__Never commit your `.env` file!__

__Why?__ Specifying AWS credentials in these `.env` files is only necessary for e.g. development on our laptops, where hardcoded creds are the only way of getting the necessary IAM permissions. This is not necessary in beta/feature/prod, where our servers there get these permissions "automagically" via IAM roles and EC2 instance profiles (see [this](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html) and [this](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html#use-roles) for some background).

__PRO TIP!__ Don't like manually messing around with credentials? You too can easily set up a development box on EC2 that will also automagically get AWS credentials from its instance profile so that an `.env` file is unneeded. See "Setting up an EC2 dev box" below.

## Setting up an EC2 dev box

Setting up an EC2 dev box can be useful so you can have a development machine you can access remotely, but also so you can run the NaloxoneExchange dev server so the rest of the team can access it (e.g. to see your changes in PRs).

To do this, look for the "DevDesktopLaunchTemplate" launch template in the EC2 console. This is a pre-configured template you can use to quickly spin up an EC2 instance, pre-bootstrapped with Node/NPM. The template provides a lot of defaults; here are some defaults that you shouldn't have to change, but we may/will have to update in the template eventually:

* AMI: Currently specifies the ElasticBeanstalk AMI that our stacks use. Presumably will need to be updated at some point.
* Security group ID: Currently specifies the "NE Beta + Feature Hosts" security group.
* IAM instance profile: Currently specifies the "aws-elasticbeanstalk-ec2-role-Test" instance profile, the same way our test/feature hosts get their AWS permissions, so you can be sure that you won't see permission discrepancies between your dev server and prod.
* User data script: Currently provides a "user data sript" which EC2 executes once during instance provisioning to install Node/NPM (using [nvm](https://github.com/creationix/nvm)). Currently hardcoded to install Node 10.15.1, the version we're currently using for NaloxoneExchange.

To launch an instance, click Actions -> Launch Instance From Template, and then:

1. Select the latest template version (currently only 1).
1. __[OPTIONAL]__ Instance type is currently `t2.small`, the smallest instance which can build our website and run the dev server. This should be fine as-is, but you can change this if you have performance issues.
1. Under "Key name" you must specify an SSH keypair that you have the private key for.
1. Under "Instance tags", plug your name in the tag value so that we can easily see whose instances are whose in the console.
1. Click "Launch instance from template".

Find your new instance in the console and copy its hostname; it should only take 60-120 seconds after launching before you can SSH into it. Now you'll need to do a couple last things, like generating SSH keys for Github and updating security groups:

1. SSH into your new instance: `ssh ec2-user@YOUR_EC2_HOSTNAME`
1. Once logged into your new instance, you'll need to generate an SSH keypair so you can upload the public key to your Github account to get access to the NaloxoneExchange repo from your EC2 instance; run: `ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N '' -C "YOUR_EMAIL@fiduscript.com" && cat ~/.ssh/id_rsa.pub`
1. That last command will dump your public key to stdout. Copy the whole thing (everything from "ssh-rsa" to your email address at the end) and upload that to your Github account as a new SSH key.
 * At this point you should be able to clone our Github repo onto your instance, run `npm install`, and proceed as normal with development. You've already got Node/NPM installed.
1. You'll need to update the security group your instance is in. This group already has a bunch of rules for our home IPs, mostly for ports 22, 80, and 443. But since the dev server runs on port 8443, you'll need to add a new rule to the security group giving your IP access on port 8443 so you can hit the dev server on your own instance.
 * __NOTE:__ This new rule will only allow *you* to access your dev website on HTTPS port 8443. If you want to share this during PRs, your teammates will also need rules for themselves. We only need one each -- if you add a rule to get access to your own EC2 instance, that will also give you access to your teammates' via this security group.
1. __[OPTIONAL]__ Want a friendly DNS name instead of remembering an EC2 host name? Head over to the Route53 console and select "naloxoneexchange.com." under hosted zones. Look at the existing "dan.dev.naloxoneexchange.com." CNAME entry and you'll want to add something similar.
 1. Click "Create Record Set"
 1. Under "Name", add a prefix based on your login + "dev", e.g. "straker.dev".
 1. Under "Type", select "CNAME"
 1. In "Value", enter your EC2 hostname
 1. Click Create, wait a few minutes, and the DNS entry should be propagated.


 After all that, if you SSH to your dev box and run the dev server, you should be able to access your website at `https://your_name.dev.naloxoneexchange.com:8443`!

__POOP__ I just realized launch templates are regionalized and you don't seem to be able to change the region of a launch template. The one mentioned here is in Ohio (us-east-2). If you want to create a dev box in another region, it looks like we'll have to copy the template to other regions :-(.

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
