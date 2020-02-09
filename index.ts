import { Request, Response, NextFunction } from 'express'

import { IdentityService, AuthTypes, AuthParams } from './src/models/identity'

interface ExtendedRequest extends Request {
  auth_params: AuthParams
}

const denyAccess = (res: Response): void => { res.status(401).send('access denied') }

const auth = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = (req.headers.authorization || req.headers['x-access-token']) as string
  const authType = req.headers.authorization ? AuthTypes.UserToken : AuthTypes.StaticToken
  const authParams = req.auth_params || null
  
  const id = new IdentityService({ token, authType, authParams })
  if (!id.token) denyAccess(res)

  const user = await id.authorize()
  if (!user) denyAccess(res)

  Object.assign(req, { context: user })
  next()
}

export { auth, AuthTypes, AuthParams }
