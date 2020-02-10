import admin from 'firebase-admin'

interface FunctionArgs {
  db: admin.firestore.Firestore
  usersCollection: string
  rolesProperty?: string
  permissionsProperty: string
  uid: string
}

const handler = async (args: FunctionArgs): Promise<object | null> => {
    const {
      db, 
      usersCollection,
      rolesProperty = null,
      permissionsProperty,
      uid
    } = args
    const userQueryRes = await db.collection(usersCollection).doc(uid).get()
    if (!userQueryRes.exists) return null

    const user: FirebaseFirestore.DocumentData = userQueryRes.data() || {}
    Object.keys(user).forEach((key: any) => {
      if ([rolesProperty, permissionsProperty].indexOf(key) === -1) delete user[key]
    })
    
  return Promise.resolve(user)
}

export = handler
