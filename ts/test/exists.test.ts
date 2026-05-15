
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FussyApiDocumentationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FussyApiDocumentationSDK.test()
    equal(null !== testsdk, true)
  })

})
