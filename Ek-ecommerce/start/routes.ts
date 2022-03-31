/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.home')

Route.group(() => {
  Route.get('/login', 'UsersController.loginShow').as('loginShow')
  Route.post('/login', 'UsersController.login').as('login')
  Route.get('/register', 'UsersController.create').as('create')
  Route.post('/register', 'UsersController.store').as('store')
})
  .prefix('users')
  .as('users')

Route.get('/*', 'HomeController.error404')
