# Pokémon Trainer 
This web application allows users to collect Pokémon from the PokeAPI and view them in their collection. Users must enter their username before being able to collect any Pokémon.It consists of three pages: Landing Page, Trainer Page and a Pokemon Catalogue Page.

## Landing Page
The first thing a user should see is the “Login page” where the user must be able to enter their “Trainer” name.
There should be a button that saves the Trainer name to the Trainer API and in local- or sessionStorage. The app then redirects the user to the main page, the Pokémon Catalogue page.
The users may NOT be able to see the Pokémon Catalogue without have a Trainer name stored in localStorage.
If username exists in localStorage, you may automatically redirect from the landing page to the Pokémon
Catalogue page.

## Trainer Page
A user may only view this page if there is a Trainer name that exists in localStorage. The user redirects back to the
Landing page if they do not have a Trainer name stored in localStorage.
The Trainer page lists the Pokémon that the trainer has collected. For each collected Pokémon, display the Pokémon
name and image.
A user is also able to remove a Pokémon from their collection from the Trainer page.

## Pokémon Catalogue Page
The Catalogue page may NOT be viewed if there is no Trainer name stored in localStorage. It uses a Guard service to achieve this functionality. The Catalogue page lists the Pokémon name and avatar*. It gets all the Pokémon and stores it in sessionStorage. When the page is reloaded it reads from sessionStorage rather than the API. This way, the PokeAPI is not constantly hit with requests every time you save your files.
We've added a button on each Pokémon that, when clicked, adds the Pokémon to the trainer’s collection. This updatew the Trainer API with the collected Pokémon. 

# Getting Started
## Prerequisites
Before you can run this app, you'll need to have the following tools installed:

Node.js (LTS – Long Term Support version)
Angular CLI
Git

## Installing
Clone the repository to your local machine:

git clone https://github.com/your-username/pokemon-trainer.git

Install the required packages:

npm install

## Running
Start the development server:

ng serve
Navigate to http://localhost:4200/ in your web browser.

# Component Tree
A component tree for the application can be found in the component-tree.pdf file in the root of the repository.

# API
This app uses the Trainer API to store and retrieve trainer and Pokémon data.

# Built With
Angular Framework
HTML
CSS
JavaScript

# Contributions
Christos Giannikis https://github.com/ChrisGiannikis
Fotis Staikos: https://github.com/NotFotis

# Vercel Website
https://pokemon-trainer-p3lnhzvaw-chrisgiannikis.vercel.app/login
