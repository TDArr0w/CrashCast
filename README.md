Here is a README for the CrashCast program, based on the files you provided.

-----

# CrashCast 🚑

CrashCast is a modern web application built with **React 19** and **Vite**. It's designed for advanced mapping and data visualization, likely related to crash or incident data, using a powerful combination of **Deck.gl** and **Google Maps**.


[CrashCast Landing Page](https://github.com/user-attachments/assets/8f8e441b-3e89-4666-b8cb-1d1d0ee64d3f)

![crashcast Dark Mode](https://github.com/user-attachments/assets/ded4e780-8e5a-414c-b8fa-52db9164de09)


## Core Technologies

  * **Framework:** React 19
  * **Bundler:** Vite
  * **Mapping & Visualization:**
      * Deck.gl (Core, Layers, React)
      * Google Maps (via `@vis.gl/react-google-maps`)
      * Mapbox GL (via `react-map-gl`)
  * **Routing:** React Router
  * **Styling:** Sass (SCSS)
  * **State Management:** `@plq/use-persisted-state` for persistent state
  * **Linting:** ESLint

-----

## Prerequisites

Before you begin, ensure you have Node.js installed on your system.

  * **Node.js:** This project requires version **`>=22.12.0`** as specified in `package.json`.

-----

## Installation

1.  Clone the repository to your local machine.
2.  Navigate into the project directory:
    ```sh
    cd crashcast
    ```
3.  Install the required npm dependencies:
    ```sh
    npm install
    ```

-----

## Available Scripts

This project comes with several pre-configured npm scripts:

### `npm run dev`

Runs the application in development mode with hot-reloading. The server is configured to be accessible from your local network (it listens on `0.0.0.0`).

### `npm run build`

Builds the application for production. This script bundles your code and optimizes it, outputting the static files to the `dist` directory.

### `npm run preview`

Starts a local static web server that serves the production-built files from the `dist` directory. This is useful for verifying that the production build works correctly before deploying.

### `npm run lint`

Runs the ESLint linter across the project to check for code quality and style issues, based on the rules in `eslint.config.js`.

-----

## Server Configuration

The Vite configuration (`vite.config.js`) is set up to allow access from specific domains and IP addresses for both the development and preview servers. This is intended for deployment on a server, such as an AWS EC2 instance.

**Allowed Hosts Include:**

  * `crash-cast.com`
  * `www.crash-cast.com`
  * `13.216.14.117`
  * `ec2-54-85-61-166.compute-1.amazonaws.com`

The provided `start.sh` script suggests a deployment flow of pulling from Git, installing dependencies, building the project, and running the development server. For a production deployment, you would typically use `npm run preview` or a dedicated static file server.
