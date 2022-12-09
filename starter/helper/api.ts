import { create } from 'apisauce'

export type Secret = {
  plainTextToken?: string
}

export const urlencodedHeader = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

// define the api
export const api = (secret?: Secret) => {
  const headers = !!secret
    ? {
        Accept: 'application/json',
        Authorization: `Bearer ${(secret as Secret).plainTextToken}`,
      }
    : {
        Accept: 'application/json',
      }

  return create({
    baseURL: 'http://165.22.255.85:1337/api',
    headers,
    withCredentials: true,
  })
}
