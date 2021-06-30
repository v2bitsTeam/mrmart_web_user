MrMart Web App: available at http://mrmart.co/

Built using React.

### `yarn`

Installs the dependencies from package.json.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Most Important

The razorpay live key which is saved inside environment file is not backed up to git for security reasons. To make sure that the app works as expected:

Firstly, add .env file to the root level directory (where package.json is present).

Second, add anew key called "REACT_APP_RAZORPAY_LIVE_API_KEY" and add the live key value to it and save the file.

That's it, the key will be picked up by react and payment will work as expected.
