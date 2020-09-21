# The Idea Pool app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

It is built using following libraries: 

* React with Hooks
* Redux with Redux Toolkit
* Axios and Redux Thunk
* Styled Components
* Jest and Enzyme


## Show me the app

The production app is hosted on Netlify CDN via this URL https://the-idea-pool-app.netlify.app/

Feel free to save your ideas in it. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run lint`

Automatically fixes formatting issues using ESLint. It reports errors that require a manual fix.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run test:coverage`

Runs tests on all files and generates a test coverage report.

Current results are as mentioned here.

File                         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------------|----------|----------|----------|----------|-------------------|
All files                    |    93.84 |     89.9 |    90.71 |    93.86 |                   |

Note that coverage doesn't include app index and service worker.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Use `serve -s build` in project directory to view the app. `serve` should be installed globally beforehand.

## What's been done

This application is a PWA built with React and Redux.

#### 1. Authentication feature

I have added two routes `/signup` and `/login` where users can create an account and login respectively.
Forms are using browser based input validation.
I have added a custom regex validation for `password` field during sign up as per the provided business rules. 

The app is using local storage in device for saving both JWT tokens. It also refreshes the access token every 9 minutes when the app is active in browser.

I have also added a `SecureRoute` component to disable pages that require authentication. 

#### 2. Show My Ideas

It fetches new ideas from API on page load. The idea scores and content view is built with readonly inputs to keep consistency with edit mode.

#### 3. Add a new idea

It creates a dummy idea in Redux state to allow user to type their content and scores. Once confirmed, we make an API request to save it in their account. 

#### 4. Edit an idea

It is similar to Add Idea feature execpt we are modifying an already saved idea. 



## My Approach

I have taken some guesses based on the past experiences with the React projects during interview process. Here are a few notes that will help you understand my approach for this project.

* My focus was to write code to give you good indications of my style and thinking. As mentioned in the coming section, you will see there are many improvements for future iterations if we were to keep working on it. However I am mindful of keeping it as a "Small Project" as suggested in the interview process  
* I have generally tried to keep it simple and clean and favoured agile development over unnecessary complexity
* In addition to above, I have tried to write as much code as possible myself without adding third party libraries to showcase my approach
* Have used local storage to persist logged in state if the user returns
* Have mostly followed test driven development when adding new features
* Have preferred named exports to follow components easily 
* Have preferred a feature folder with `index.js` as a convention
* The input component in UI Library are not holding state. The parent component is responsible for holding state
* Have configured eslint with prettier to have IDE and CLI support for formatting and rules
* App is using prop-types for props validation
* Testing is supported by enzyme and jest together

## Architecture

Here are some important bits to know regarding how I built the application.

#### Components

First of all, the UI layer lives here. I have also added functionality with hooks as needed to hold local state. 

* The components can dispatch actions using hooks provided by React Redux.
* These components can access Redux state using custom selectors built for `useSelector` from Redux
* React Router is responsible for routing of various views

#### Redux

We are using Redux Toolkit with Redux for making Reducers easier to implement.

* `actions` directory contains all the action creators
* `reducers` directory contains all the reducers. Reducers are built with `createReducer` from Redux Toolkit
* `selectors` directory has custom selectors to access particular state in Redux store

#### Constants

Various strings used across the application are stored here.

#### Libs

Home made modules for critical functionality should be stored here. I have added an axios request helper here.

#### Hooks

This is not in place yet, however in future we can have custom hooks here for holding stateful logic 


## What's there for future

This application requires much more work to become a polished My Ideas app. Here is my feedback in case you would like me to address some of these issues or add improvements.

#### Must haves

* The UX for adding or editing an idea needs to be improved. Currently there are issues with focus and have some sort of guard against wrong inputs from user
* Missing UI elements such as My Ideas header for different scores inputs
* Overall UI refinements to become closer to the mockups. This includes error states and loading state
* Production build optimization may be enhanced using React Lazy or Loadable 
* We can add better fonts
* Many PNG icons should be replaced with SVGs 

#### Nice to have / discussion points

* Get My Ideas API can return the total number of pages and the current page number. We can use this for pagination. Pagination also requires more UX discussion on how the app would respond when a user has deleted a few ideas on page 2 of 3.   
* Token API may provide the time the token will expire so we can decide when to renew it
* Have noticed the My Ideas sorting is based on average score. This changes the position within view when user has edited an idea and performed a hard reload

