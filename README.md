# EkimetricsApply

Welcome to my apply project!

## Objectives

The goal is to gather posts and comments from [ProducHunt](https://www.producthunt.com/), and to display the number of comments' evolution on graphs, with d3.js and Angular.

This is a test of my ability to use Angular, which I was familiar with, and to utilize new skills, since I didn't know d3.js at all.
It's also a way to make a fun project and give back a - hopefully - working prototype.

## Realization

I had 2 weeks to complete this project. But I only started it 4 days before the deadline, because I had some family obligations, and I had no internet there.

I started by defining the app : What it should do, what I would need, what I can use, and what I should get documentation on.
Thankfully, the instructions were pretty thorough. So I read some product hunt API doc, some d3.js doc, and started the project.

The first steps are of course setting up the workspace; creating the first components, pushing everything on git, launching the development environment.

The realization of the project itself followed a patern: coding and testing. 
I started to define the need, from start to finish, and splitting it into simple tasks that I could test easily.
Exemple: 

* What do I need ? 
*To get the list of today's posts.*

* How to get it?
*With a service, using the Angular HttpClient and hitting the good endpoint on the API.*

* *`coding here`*

* Does it work now?
*Yes &rarr; All good !* ;
*No &rarr; Read the error and fix it*

## Time and difficulties

This Project took me a lot more time than I expected. I thought it would be a 10-15h project, but it ended up taking about the double.
I ran into unexpected difficulties, mainly the limitation of requests from Producthun API, and the usage of d3.js.

If I had more time, I could definitely improve this app: the design is not great, and  I couldn't do some of the optional objectives (like being able to select a category)

But it was an interesting experience, I got to learn a lot ! 
## Getting Started

Git clone the repository on your computer.
Run `npm install` to install all packages. 
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. That's it !
