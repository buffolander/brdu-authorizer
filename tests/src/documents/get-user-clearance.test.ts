import { IdentityService, AuthTypes } from '../../../src/models/identity'

const id = new IdentityService({
  authType: AuthTypes.UserToken,
  token: "anything",
})

test('sample', () => {
  expect(id.authParams).toBe(undefined)
})