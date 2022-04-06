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
  Route.get('/signup', 'AuthController.signupShow').as('signupShow')
  Route.post('/signup', 'AuthController.signup').as('signup')
  Route.get('/login', 'AuthController.loginShow').as('loginShow')
  Route.post('/login', 'AuthController.login').as('login')
  Route.get('/logout', 'AuthController.logout').as('logout')
})
  .prefix('auth')
  .as('auth')

Route.get('/*', 'HomeController.error404')
