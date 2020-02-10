import authenticateUser from './authenticate-user'
import authenticateServer from './authenticate-server'

enum AuthTypes { 
  StaticToken = 'x-authorization-token',
  UserToken = 'authorization',
}

enum HashFunctions {
  NONE = '',
  MD5 = 'md5',
  SHA256 = 'sha256',
}

interface User { 
  uid: string
  name?: string
  email?: string
  picture?: (string | null)
}

interface ServerClient {
  id: string
  account?: string
  integration?: string
  env?: string
}

interface Collection {
  authType?: AuthTypes
  collection: string
  rolesProperty?: string
  permissionsProperty?: string // default 'permissions'
  serverTokenProperty?: string
  serverTokenHash?: HashFunctions
}

interface AuthParams {
  service: string
  collections: Collection[]
}

interface Identity { 
  authType: AuthTypes
  token: string
  authParams?: AuthParams
}

class IdentityService {
  constructor(private identity: Identity) {
  }

  get token() { 
    return this.identity.token
  }

  get authParams(): (AuthParams | undefined) {
    return this.identity.authParams
  }

  set authParams(authParamsObj: AuthParams | undefined) {
    this.identity.authParams = authParamsObj
  }

  async authorize(): Promise<User | ServerClient | null> {
    switch (this.identity.authType) {
      case AuthTypes.UserToken:
        const user = await authenticateUser(this.identity)
        if (!user) return null
        
        // implement authorization logic
        return Promise.resolve(user)
        // next case
      case AuthTypes.StaticToken:
        return null
        // next case
      default:
        return null
        // end
    }
  }
}

export { IdentityService, Identity, AuthTypes, AuthParams, HashFunctions, User, ServerClient }
