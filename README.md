# User Management

A React application for managing users, including viewing, creating, updating, and deleting (CRUD) user profiles. The application uses TypeScript for type safety and fetches user data from an API with local storage fallback.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Components](#components)
- [Data Storage](#data-storage)
- [Dependencies](#dependencies)
- [Learn More](#learn-more)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/) (optional but useful for version control)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/user-management.git


2. **Navigate to the project directory:**

    ```bash
    cd user-management
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: This is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Features

- **View Users**: Displays a list of users with the option to view details, edit, or delete.
- **Create User**: Form for adding new users.
- **Edit User**: Form for updating user information.
- **Delete User**: Remove users from the list.
- **User Details**: Detailed view of user information, including address and company details.

## Components

- **UserList**: Renders a table of users with actions to edit or delete.
- **UserForm**: A form for creating or updating user information.
- **UserDetail**: Shows detailed information for a selected user.
- **Alert**: Displays success or error messages.

## Data Storage

- **Local Storage**: The application stores user data in local storage to persist data across page reloads.
- **API**: Users are fetched from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/users). If the API call fails, local storage is used as a fallback.

## Dependencies

- `react`
- `react-dom`
- `react-router-dom`
- `typescript`
- `@types/react`
- `@types/react-dom`
- `@types/react-router-dom`

## Learn More

To learn more about React and TypeScript, check out these resources:

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
