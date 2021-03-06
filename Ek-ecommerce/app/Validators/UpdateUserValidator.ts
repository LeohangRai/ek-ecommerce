import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({ table: 'users', column: 'username', whereNot: { id: this.ctx.params.id } }),
    ]),

    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
        caseInsensitive: true,
        whereNot: { id: this.ctx.params.id },
      }),
    ]),

    password: schema.string({}, [rules.minLength(8)]),

    phone: schema.string({}, [
      rules.unique({ table: 'users', column: 'phone', whereNot: { id: this.ctx.params.id } }),
    ]),

    roleId: schema.number(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'required': 'The {{ field }} is required for creating a new account',
    'email.unique': 'Email already in use',
    'username.unique': 'The username is already in use',
    'phone.unique': 'The phone number is already in use',
    'password.minLength': 'The password must contain at least 8 characters.',
  }
}
