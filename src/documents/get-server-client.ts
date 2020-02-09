import admin from 'firebase-admin'

import { ServerClient } from '../models/identity'

interface FunctionArgs {
  db: admin.firestore.Firestore
  clientsCollection: string
  serverTokenProperty?: string
  token: string
}

const handler = async (args: FunctionArgs): Promise<ServerClient | null> => {
    const {
      db, 
      clientsCollection,
      serverTokenProperty = '',
      token,
    } = args
    const clientQueryRes = await db.collection(clientsCollection)
      .where(serverTokenProperty, '==', token).get()

    /*
    if (!clientQueryRes.empty || clientQueryRes.size !== 1) return Promise.resolve(null)

    const clientId: string = clientQueryRes.docs[0].id
    const client: FirebaseFirestore.DocumentData = clientQueryRes.docs[0].data()
    Object.keys(client).forEach((key: any) => {
      if ([rolesProperty, permissionsProperty].indexOf(key) === -1) delete user[key]
    })
    
  return Promise.resolve(user)
  */
  return null
}

export = handler
