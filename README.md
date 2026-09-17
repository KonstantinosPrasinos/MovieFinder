# Movie Finder
This is a basic project for a React + Vite app that fetches and displays movie data from [OMDb](https://www.omdbapi.com/).

## Current Features
1. Searching through the OMDb movie catalog using titles
2. Clicking a movie card to expand a modal with more details

## How to run\
1. Obtain an api key from OMDb
2. Make sure you have node installed. If you don't you can find it [here](https://nodejs.org/en/download).
3. Clone the repository: ```git clone https://github.com/KonstantinosPrasinos/MovieFinder.git```
4. Install the dependencies: ```npm install```
5. Create a fila called ".env" in the project directory and add the following: ```VITE_OMD_API_KEY=<your-api-key-here>```
6. Run the project: ```npm run dev```

## Missing/Future Features
1. Displaying multiple pages of results (pagination)
2. Links to websites the user can watch a selected movie
3. Rendering the different movie reviews
4. Searching using parameters other than title
5. A default set of movies for when the page loads
6. Animating the modal closing/opening