![Kuvempu](/brand/logo.svg)

Kuvempu helps you build fast, robust, adaptable and high performant PWA on Google Cloud Firebase.

![Architecture](/diagrams/architecture.jpg)

*NOTE: Kuvempu is still in Development mode*


## Vision
> Develop Fast.

> Fail Fast.

> Iterate Fast.



## Pre-requisites

1. Google Firebase Project with Blaze Plan
2. Node.js (>=12), Npm (>=6), git
3. Basic understanding of JS, React, Express, Next.js
3. Basic understanding of Firebase services
4. Basic understanding of JSONSchema

## Installation

### Quick Start

1) [Create Firebase Project](#user-content-create-firebase-project)
    1) [Setup Firebase](#user-content-setup-firebase)
    2) [Setup Authentication](#user-content-setup-authentication)
    3) [Setup Firestore](#user-content-setup-firestore)
    4) [Setup Apps](#user-content-setup-apps)
        1) [Consumer App](#user-content-consumer-app)
        2) [Admin App](#user-content-admin-app)
        3) [REST App](#user-content-rest-app)
    4) [Setup Service Account](#user-content-setup-service-account)

2) [Sandbox Setup](#user-content-sandbox-setup)
    1) [Install Global Dependencies](#user-content-install-global-dependencies)
    2) [Clone Kuvempu repo](#user-content-clone-kuvempu-repo)
    3) [Setup environment](#user-content-setup-environment)
    4) [Initialise project](#user-content-initialise-project)
    5) [Build and Deploy project](#user-content-build-and-deploy-project)

### Create Firebase Project

#### Setup Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Click on Add Project
- **Step 1**, input your project name (Ex: Kuvempu Demo)
- **Step 2**, enable analytics for your project
- **Step 3**, choose existing or new account for analytcis
- Click on **Create Project**
- Wait until the project is ready. Takes couple of seconds.
- Click on **Continue**
- In the project dashboard, Upgrade **Spark** to **Blaze** Plan (Last option in the sidenav)
- Done
- Proceed with **Setup Authentication**

#### Setup Authentication

- In the navigation, click on **Authentication**
- Click on **Get Started**
- Go to **Sign-in** method tab
- Modify **Email/Password**
- Enable the **first option** and **Save**
- Enable other options you wish to use for Authenticating users
- Done
- Proceed with **Setup Firestore**

#### Setup Firestore

- In the navigation, click on **Firestore**
- Click on **Create Database**
- Enable the option **Start in Production Mode**
- Click on **Next**
- Change location of **Cloud Firestore location**, if you wish to
- Click on **Enable**
- Done
- Proceed with **Setup Apps**

#### Setup Apps

##### Consumer App

- In the navigation, click on **Project Overview**
- Click on **Web** under **Add an app to get started**
- Provide an **Linked Firebase Hosting site** (Ex: yourappname-consumer) [NOTE: This app will be used to serve consumer traffic. Postfix with **-consumer** for identification, though not mandatory]
- Enable setup **Firebase Hosting** for this app
- Click on **Register app**
- Click **Next** in **Add Firebase SDK** section
- Click **Next** in **Install Firebase CLI** section
- Click **Continue to the console** in **Deploy to Firebase Hosting** section
- Done
- Proceed with **Admin App**

##### Admin App

- In the dashboard, click on **Add app**
- Click on **Web** from the given options
- Provide an **Linked Firebase Hosting site** (Ex: yourappname-admin) [NOTE: This app will be used to serve admin traffic. Postfix with **-admin** for identification, though not mandatory]
- Enable setup **Firebase Hosting** for this app
- Provide a hosting name (Ex: yourappname-admin.web.app for consistency)
- Click on **Register app**
- Click **Next** in **Add Firebase SDK** section
- Click **Next** in **Install Firebase CLI** section
- Click **Continue to the console** in **Deploy to Firebase Hosting** section
- Done
- Proceed with **REST App**

##### REST App

- In the dashboard, click on **Add app**
- Click on **Web** from the given options
- Provide an **Linked Firebase Hosting site** (Ex: yourappname-rest) [NOTE: This app will be used to serve admin traffic. Postfix with **-rest** for identification, though not mandatory]
- Enable setup **Firebase Hosting** for this app
- Provide a hosting name (Ex: yourappname-rest.web.app for consistency)
- Click on **Register app**
- Click **Next** in **Add Firebase SDK** section
- Click **Next** in **Install Firebase CLI** section
- Click **Continue to the console** in **Deploy to Firebase Hosting** section
- Done
- Proceed with **Setup Service Account**

#### Setup Service Account

- In the dashboard, click on the **Settings** icon corresponding to **Project Overview**
- Click on **Project Settings** from the options
- Go to **Service Accounts** tab
- Click on **Generate new private key** option in the **Firebase Admin SDK** screen
- Click on **Generate key** button
- Save to local drive. We will use it later to setup environment variables.
- Done
- Proceed with **Sandbox Setup**

![Sample](/diagrams/fb-screenshot.jpg)

### Sandbox Setup

#### Install Global Dependencies

`npm install -g firebase-tools` [*v9.3.0 was used during development*]

`npm install -g pwa-asset-generator` [*v4.0.1 was used during development*]

`npm install -g gulp-cli` [*CLI v2.3.0 and Local 4.0.2 was used during development*]

#### Clone Kuvempu repo

##### Using HTTPS

`git clone https://github.com/Intelnut/kuvempu.git <your_project_dir_name> --depth=1`

##### Using SSH

`git clone git@github.com:Intelnut/kuvempu.git <your_project_dir_name> --depth=1`

#### Setup environment

##### Rename `sample.env` to `.env`

`cd /path/to/your/project`

`mv sample.env .env`

##### Update .env

*Note: Before updating the environment, go to Firebase console > Select your Project > Settings Icon > Project Settings*

`nano .env` or use a text editor

Select the admin app that you have created, under **Your apps** in Firebase **Project Settings**

Select **Config** option under **Firebase SDK snippet**

You should see `const firebaseConfig = {...}` object

Map the values as mentioned below

```
ADMIN_FIREBASE_CONFIG_APP_ID=<firebaseConfig.appId>
ADMIN_FIREBASE_CONFIG_MEASUREMENT_ID=<firebaseConfig.measurementId>
ADMIN_HOSTING_SITE=<Linked Firebase Hosting site>
ADMIN_URL=<HOSTING_URL> // click **Linked Firebase Hosting** dropdown > **Manage in Hosting** and copy + paste the **Domain** value
```

Select the rest app that you have created, under **Your apps** in Firebase **Project Settings**

Select **Config** option under **Firebase SDK snippet**

You should see `const firebaseConfig = {...}` object

Map the values as mentioned below

```
REST_FIREBASE_CONFIG_APP_ID=<firebaseConfig.appId>
REST_FIREBASE_CONFIG_MEASUREMENT_ID=<firebaseConfig.measurementId>
REST_HOSTING_SITE=<Linked Firebase Hosting site>
REST_URL=<HOSTING_URL> // click **Linked Firebase Hosting** dropdown > **Manage in Hosting** and copy + paste the **Domain** value
```

Select the consumer app that you have created, under **Your apps** in Firebase **Project Settings**

Select **Config** option under **Firebase SDK snippet**

You should see `const firebaseConfig = {...}` object

Map the values as mentioned below
```
CONSUMER_FIREBASE_CONFIG_APP_ID=<firebaseConfig.appId>
CONSUMER_FIREBASE_CONFIG_MEASUREMENT_ID=<firebaseConfig.measurementId>
CONSUMER_HOSTING_SITE=<Linked Firebase Hosting site>
CONSUMER_URL=<HOSTING_URL> // click **Linked Firebase Hosting** dropdown > **Manage in Hosting** and copy + paste the **Domain** value

FIREBASE_CONFIG_API_KEY=<firebaseConfig.apiKey>
FIREBASE_CONFIG_AUTH_DOMAIN=<firebaseConfig.authDomain>
FIREBASE_CONFIG_MESSAGING_SENDER_ID=<firebaseConfig.messagingSenderId>
FIREBASE_CONFIG_PROJECT_ID=<firebaseConfig.projectId>
FIREBASE_CONFIG_STORAGE_BUCKET=<firebaseConfig.storageBucket>
```

Open the previously saved cert json file and map values as mentioned below

```
FIREBASE_SA_PRIVATE_KEY_ID=<private_key_id>
FIREBASE_SA_PRIVATE_KEY=<private_key>
FIREBASE_SA_CLIENT_EMAIL=<client_email>
FIREBASE_SA_CLIENT_ID=<client_id>
FIREBASE_SA_AUTH_URI=<auth_uri>
FIREBASE_SA_TOKEN_URI=<token_uri>
FIREBASE_SA_AUTH_PROVIDER_X509_CERT_URL=<auth_provider_x509_cert_url>
FIREBASE_SA_CLIENT_X509_CERT_URL=<client_x509_cert_url>
```

#### Initialise project

```
cd /path/to/your/project
firebase login
gulp install
gulp setup
```

#### Build and Deploy project

```
gulp build:deploy

```

  
