This project was bootstrapped with [Create React SSR App](https://github.com/trustworktech/create-react-ssr-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://create-react-ssr-app.dev/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://create-react-ssr-app.dev/docs/deployment) for more information.

### `npm run eject`

### Docker

In order to create a docker image for PROD, here you have the command

```docker build . -t adolfoecs/lumartex-web:1.0.4```

but if you want to change the domain for SEO for staging env 

```docker build . --build-arg DOMAIN_URL=http://192.168.99.100:5000 -t adolfoecs/lumartex-web:1.0.4```

As you can see there is a DOMAIN_URL arg that will drive the SEO URL.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React SSR App documentation](https://create-react-ssr-app.dev/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
