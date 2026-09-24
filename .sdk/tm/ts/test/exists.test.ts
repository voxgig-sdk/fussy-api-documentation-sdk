
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FussyApiDocumentationSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FussyApiDocumentationSDK.test()
    equal(testsdk instanceof FussyApiDocumentationSDK, true,
      'FussyApiDocumentationSDK.test() must return a client synchronously')
  })

})
