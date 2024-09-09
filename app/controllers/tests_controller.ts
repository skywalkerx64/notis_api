import type { HttpContext } from '@adonisjs/core/http'

export default class TestsController {
  async test({ request }: HttpContext) {
    console.log(request.all())
  }
}
