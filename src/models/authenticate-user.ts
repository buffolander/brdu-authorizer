import * as admin from 'firebase-admin'

admin.initializeApp({ credential: admin.credential.applicationDefault() })

import { Identity, User } from './identity'

const handler = async (args: Identity): Promise<User|null> => {
  const tokenSplit = args.token.split(' ')
  let token = null

  if (tokenSplit.length === 1) token = tokenSplit[0]
  else if (tokenSplit[0].toLowerCase() === 'bearer') token = tokenSplit[1]
  else return Promise.resolve(null) 
  // implement Basic athentication with credentials from Firestore collection

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    Object.keys(decodedToken).forEach(key => {
      if (['uid', 'name', 'email', 'picture'].indexOf(key) === -1) delete decodedToken[key]
    })
    return decodedToken as User
  } catch (err) {
    console.error(err)
  }
  return null
}

export = handler
