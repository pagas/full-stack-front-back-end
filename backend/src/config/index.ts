import env from 'env-var'

export const DATABASE_URL: string = env
  .get('DATABASE_URL')
  .required()
  .asString()

export const PORT: number = env.get('PORT').required().asPortNumber()

export const JWT_SECRET: string = env.get('JWT_SECRET').required().asString()
