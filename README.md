# Pokémon React App

## Description

This project is a small React application that interacts with the PokéAPI to display a paginated list of Pokémon. Users can search for Pokémon, add new ones to a local list, and navigate through pages of Pokémon. The app uses a local cache to store previously fetched data and improve performance.

## Features

- Paginated Pokémon list (10 Pokémon per page).
- Search functionality to filter Pokémon by name.
- Add new Pokémon to the list.
- Local cache to reduce API calls.
- Loading and error state management.
- Responsive UI styled with Tailwind CSS.

## Technologies Used
- React: For the front-end user interface.
- Tailwind CSS: For styling and responsive design.
- PokéAPI: For fetching Pokémon data.
- react-toastify: For displaying loading, error, and success notifications.
- Vite: For fast development and bundling.-

## Requirements

To run this application, you need to have:

- [Node.js](https://nodejs.org/en/) (version v22.14.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/pokemon-react-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pokemon-react-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the Development Server:
   ```bash
   npm run dev
   ```
