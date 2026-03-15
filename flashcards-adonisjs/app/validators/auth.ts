import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(20).unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),
    password: vine.string().minLength(8).confirmed()
  })
)

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string(),
  })
)
