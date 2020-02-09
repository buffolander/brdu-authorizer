import { Identity, ServerClient, AuthTypes, HashFunctions } from './identity'

const handler = async (args: Identity): Promise<ServerClient|null> => {
  const { 
    token,
    authParams = { collections: [] }, 
  } = args
  const { 
    collections = [],
  } = authParams

  const authParam = collections.filter(collection => collection.authType === AuthTypes.StaticToken)
  console.log(authParam)

  return null
}

export = handler

/*

const client: Identity = {
  authType: AuthTypes.StaticToken,
  token: 'abc',
  authParams: {
    service: 'patients',
    collections:[{
      collection: 'client_auth',
      authType: AuthTypes.StaticToken,
      serverTokenProperty: 'apiKey',
      serverTokenHash: HashFunctions.SHA256,
    }]
  }
}

handler(client)
//

const crypto = require('crypto')
const hash = crypto.createHash('sha256')

hash.update({"message":"helloWorld"}')
console.info(hash.digest('hex'))
*/
