import vine from '@vinejs/vine'

export const storeNoteValidator = vine.compile(
  vine.object({
    title: vine.string(),
    content: vine.string().optional(),
    tags: vine.array(vine.string()),
  })
)

export const updateNoteValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    content: vine.string().optional(),
    tags: vine.array(vine.string()).optional(),
  })
)

export const searchNoteValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    content: vine.string().optional(),
    titleOrContent: vine.string().optional(),
    tags: vine.array(vine.string()).optional(),
  })
)
