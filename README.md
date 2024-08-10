# TV Shows Dashboard

## Overview

The TV Shows Dashboard is a Vue 3 application that allows users to view TV shows categorized by genres, search for shows, and view detailed information about each show. The application leverages the TVMaze API to fetch and display data about TV shows.

### Features

- **Dashboard Page**: Displays TV shows sorted by rating, grouped by genre.
- **Search Functionality**: Allows users to search for TV shows by name with real-time updates.
- **Details Page**: Provides detailed information about a selected TV show, including its image, rating, genres, and summary.

## Tech Stack

- **Vue 3**: Frontend framework
- **Pinia**: State management
- **TypeScript**: Strongly typed language
- **SCSS**: Styling with BEM methodology
- **Vite**: Build tool
- **Vitest**: Unit testing
- **Axios**: HTTP requests

## Project Setup

### Prerequisites

- Node.js (version 18.x or later)
- npm (version 9.x or later)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/jkmaswell/abn-challenge.git
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Run the application**

    ```bash
    npm run dev
    ```

    Open `http://localhost:5173/` in your browser to view the application.

4. **Run Tests**

    ```bash
    npm run test
    ```

    This command runs the unit tests using Vitest.

## Architecture

### Directory Structure

- **`src/`**: Contains the source code for the application
  - **`components/`**: Reusable Vue components
  - **`pages/`**: Vue components representing different pages
  - **`stores/`**: Pinia stores for state management
  - **`models/`**: Classes to handle data fetching and business logic
  - **`types/`**: TypeScript type definitions
  - **`styles/`**: SCSS files for styling
  - **`router/`**: Vue Router configuration
- **`tests/`**: Contains unit tests
- **`public/`**: Static assets

### Components

- **SearchBar**: Provides a text input for searching TV shows.
- **ShowCard**: Displays basic information about a TV show.
- **SearchResults**: Shows the list of TV shows matching the search query.
- **GenreList**: Lists TV shows grouped by genre (if applicable).

### Pages

- **DashboardPage**: The main page that includes the search bar, show list by genre and results.
- **ShowDetailPage**: Details page for displaying more information about a selected TV show.

### Store

- **Pinia**: Used to manage the state of TV shows and search queries. Provides actions to fetch shows, filter by genre, and update search queries.

### API Integration

- **TVMaze API**: The application uses the TVMaze API to fetch data about TV shows. API endpoints are used to retrieve lists of shows and detailed information about individual shows.

### Styling

- **SCSS**: Styles are written using SCSS with BEM methodology to ensure maintainable and scalable CSS.

## Testing

Unit tests are written using Vitest. Tests cover critical functionalities such as fetching data, filtering shows, and component rendering.

To run tests, use:

```bash
npm run test
```
