# Assessment

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

## Prerequisites

Make sure you have **Node.js** and **npm** installed. You can check with:

```bash
node -v
npm -v
```

## Setup Instructions

1. **Clone the repository**:

```bash
git clone <repo-url>
cd <project-folder>
```

2. **Install dependencies**:

```bash
npm install
```

This will download all required libraries for the project.

## Firebase Setup (Email/Password Authentication)

This project uses **Firebase** for authentication. To set it up:

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. In your project settings, go to **Web apps** → **Add app** → **Register app**.

3. Enable **Email/Password** authentication:

   * Go to **Authentication** → **Sign-in method** → **Email/Password** → Enable.

4. Copy your **Firebase config keys** from your app settings.

5. Create an environment file (e.g., `src/environments.ts`) and add your Firebase config:

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

Replace the placeholders with your Firebase keys.

## Development server

To start a local development server, run:

```bash
ng serve
```

or

```bash
npm start
```

Then open your browser at `http://localhost:4200/`. The application will automatically reload when you modify source files.

## Code scaffolding

Angular CLI includes powerful scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a full list of schematics (components, directives, pipes, etc.):

```bash
ng generate --help
```

## Running unit tests

To execute unit tests with Karma:

```bash
ng test
```

## Additional Resources

* [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
* [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
* [Firebase Authentication](https://firebase.google.com/docs/auth/web/start)
