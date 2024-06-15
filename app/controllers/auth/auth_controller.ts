import UserRegistered from '#events/user_registered'
import User from '#models/user'
import {
  loginValidator,
  changePasswordValidator,
  registerValidator,
  emailVerificationValidator,
} from '#validators/auth/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await registerValidator.validate(request.all())
    const user = await User.create(data)
    UserRegistered.dispatch(user)

    return response.status(201).json({
      message: 'User registered',
      user: user,
    })
  }
  async login({ request }: HttpContext) {
    const data = await loginValidator.validate(request.all())

    const user = await User.verifyCredentials(data.email, data.password)

    const token = await User.accessTokens.create(user)

    return {
      message: 'Logged in',
      token: token.value?.release(),
      user: user.toJSON(),
    }
  }

  async logout({ auth, response }: HttpContext) {
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(auth.user, token)
    return response.ok({ message: 'Logged out' })
  }

  async changePassword({ request, auth, response }: HttpContext) {
    const data = await changePasswordValidator.validate(request.all())
    const user = await User.find(auth.user?.id)
    if (!user) return response.badRequest({ message: 'User not found' })

    if (!(await hash.verify(user.password, data.oldPassword))) {
      return response.badRequest({
        errors: [
          {
            message: 'Invalid user credentials',
          },
        ],
      })
    }

    if (!(await hash.verify(user.password, data.oldPassword))) {
      return response.badRequest({
        errors: [
          {
            message: 'Invalid user credentials',
          },
        ],
      })
    }

    await user.merge({ password: data.password }).save()

    return response.ok({ message: 'Password changed' })
  }

  async verifyEmail({ request, response }: HttpContext) {
    const data = await await emailVerificationValidator.validate(request.all())

    const user = await User.findBy('email', data.email)

    if (!user) return response.badRequest({ message: 'User not found' })

    // if (user.verificationToken !== data.token) {
    //   return response.badRequest({ message: 'Invalid verification code' })
    // }
    await user
      .merge({
        verificationToken: null,
        verificationTokenExpiresAt: null,
        emailVerifiedAt: new Date(),
      })
      .save()

    return response.ok({ message: 'Email verified' })
  }
}
