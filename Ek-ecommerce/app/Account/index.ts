import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const validationSchema = schema.create({
  username: schema.string({ trim: true }, [
    rules.required(),
    rules.unique({ table: 'users', column: 'username' }),
  ]),
  email: schema.string({ trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({ trim: true }, [rules.confirmed()]),
  phone: schema.string({}, [rules.unique({ table: 'users', column: 'phone' })]),
})

export const createUser = async (
  username: string,
  email: string,
  password: string,
  phone: string
) => {
  const user = new User()
  user.username = username
  user.email = email
  user.password = password
  user.phone = phone
  return await user.save()
}
