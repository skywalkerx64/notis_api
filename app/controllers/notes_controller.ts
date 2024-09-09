import Note from '#models/note'
import { storeNoteValidator, updateNoteValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  async index({ request, auth }: HttpContext) {
    const perPage = request.input('perPage', 10)
    const page = request.input('page', 1)

    return await Note.query()
      .where('user_id', auth.user!.id)
      .orderBy('id', 'desc')
      .paginate(page, perPage)
  }

  async store({ request, auth }: HttpContext) {
    const data = request.validateUsing(storeNoteValidator)
    const note = await Note.create({ ...data, userId: auth!.user?.id })
    return note
  }

  async show({ params, auth }: HttpContext) {
    const note = await Note.findOrFail(params.id)

    if (auth.user?.id !== note.userId) {
      return 'Note not found'
    }

    return await Note.findOrFail(params.id)
  }

  async update({ params, request, auth }: HttpContext) {
    const note = await Note.findOrFail(params.id)

    if (auth.user?.id !== note.userId) {
      return 'Note not found'
    }
    const data = await request.validateUsing(updateNoteValidator)

    note.merge(data).save()

    return note
  }

  async destroy({ params, auth }: HttpContext) {
    const note = await Note.findOrFail(params.id)

    if (auth.user?.id !== note.userId) {
      return 'Note not found'
    }

    await note.delete()

    return 'Note deleted'
  }
}
