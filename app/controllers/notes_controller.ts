import Note from '#models/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  async index({ request }: HttpContext) {
    const perPage = request.input('perPage', 10)
    const page = request.input('page', 1)

    return await Note.query().paginate(page, perPage)
  }

  async store({ request }: HttpContext) {
    const note = await Note.create(request.all())

    return note.toJSON()
  }

  async show({ params }: HttpContext) {
    return await Note.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const note = await Note.findOrFail(params.id)

    note.merge(request.all()).save()

    return note.toJSON()
  }

  async destroy({ params }: HttpContext) {
    const note = await Note.findOrFail(params.id)

    await note.delete()

    return 'Note deleted'
  }
}
