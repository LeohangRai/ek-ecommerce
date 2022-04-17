# Ek-ecommerce
An e-commerce web project build on top of AdonisJs web framework. 

## Installation
Just run "npm install" to install all the necessary dependencies
$ npm install
OR 
$ npm i

## Things to remember
This project uses [redis](https://redis.io/) as caching store for request-throttling. So, make sure to install and setup redis-server on your machine. Also, MySQL is used for database. 
Lastly, don't forget to add your own '.env' file by taking reference from the '.env.example' file. 

## Database migrations (required)
$ node ace migration:run

## Database seeders (required)
$ node ace db:seed

## Running the server:
$ node ace serve 
OR
$ npm run dev