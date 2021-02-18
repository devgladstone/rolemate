export const API =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4000'
    : '<insert production server api subdomain>'

export const AUTH_API = API + '/auth'
export const FILE_API = API + '/file'
export const VERIFY_API = API + '/verify'

export const GRAPHQL_API = 'https://hireme-graphql.herokuapp.com/v1/graphql'
