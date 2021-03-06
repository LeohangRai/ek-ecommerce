import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const validationSchema = schema.create({
  username: schema.string({ trim: true }, [
    rules.required(),
    rules.unique({ table: 'users', column: 'username' }),
  ]),
  email: schema.string({ trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
  ]),
  password: schema.string({}, [rules.confirmed(), rules.minLength(8)]),
  phone: schema.string({}, [rules.unique({ table: 'users', column: 'phone' })]),
})

export const validationMessages = {
  'password_confirmation.confirmed': "The passwords don't match",
  'required': 'The {{ field }} is required for creating a new account',
  'email.unique': 'Email already in use',
  'username.unique': 'The username is already in use',
  'phone.unique': 'The phone number is already in use',
  'password.minLength': 'The password must contain at least 8 characters.',
}

export const createUser = async (
  username: string,
  email: string,
  password: string,
  phone: string,
  roleId: number
) => {
  const user = new User()
  user.username = username
  user.email = email
  user.password = password
  user.phone = phone
  user.roleId = roleId
  return await user.save()
}
