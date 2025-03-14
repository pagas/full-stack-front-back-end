import env from 'env-var'

export const DATABASE_URL: string = env
  .get('DATABASE_URL')
  .required()
  .asString()
