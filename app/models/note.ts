import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import config from '@adonisjs/core/services/config'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title?: string | null

  @column()
  declare content?: string | null

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
