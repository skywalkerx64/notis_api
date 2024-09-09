import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import config from '@adonisjs/core/services/config'
import User from './user.js'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title?: string | null

  @column()
  declare content?: string | null

  @column()
  declare tags?: (string | null)[] | null

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: relations.BelongsTo<typeof User>

  @column.dateTime({
    autoCreate: true,
    serialize: (value) => value?.toFormat(config.get('panel.dateTimes.dateTimeFormat')),
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value) => value?.toFormat(config.get('panel.dateTimes.dateTimeFormat')),
  })
  declare updatedAt: DateTime
}
