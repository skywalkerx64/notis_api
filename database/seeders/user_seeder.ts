import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const users = [
      {
        email: 'johndoe@mail.test',
        password: 'password',
        fullName: 'John Doe',
      },
      {
        email: 'janedoe@mail.test',
        password: 'password',
        fullName: 'Admin Doe',
      },
    ]

    await User.createMany(users)
  }
}
