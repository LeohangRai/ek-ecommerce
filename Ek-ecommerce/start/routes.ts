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
  Route.post('/signup', 'AuthController.signup').as('signup').middleware('throttle')
  Route.get('/login', 'AuthController.loginShow').as('loginShow')
  Route.post('/login', 'AuthController.login').as('login').middleware('throttle')
  Route.get('/logout', 'AuthController.logout').as('logout')

  Route.get('/forgot-password', 'PasswordResetController.forgotPasswordShow').as(
    'forgotPasswordShow'
  )
  Route.post('/forgot-password', 'PasswordResetController.forgotPasswordMail')
    .as('forgotPasswordMail')
    .middleware('throttle')

  Route.get('/reset-password/:email', 'PasswordResetController.resetPasswordShow').as(
    'resetPasswordShow'
  )
  Route.post('/reset-password/:email', 'PasswordResetController.resetPassword')
    .as('resetPassword')
    .middleware('throttle')
})
  .prefix('auth')
  .as('auth')
  .namespace('App/Controllers/Http/Main')

Route.group(() => {
  Route.get('/', 'DashboardController.index').as('index')
  Route.group(() => {
    Route.resource('users', 'UsersController').except(['show'])
  })
  Route.group(() => {
    Route.resource('roles', 'RolesController').except(['show'])
  })
  Route.get('*', 'DashboardController.error404').as('error404')
})
  .prefix('dashboard')
  .as('dashboard')
  .namespace('App/Controllers/Http/Dashboard')

Route.get('/*', 'HomeController.error404')
