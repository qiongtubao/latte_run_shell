

// import { expect } from 'chai'
import * as latte_run_shell from "../src/index"
import 'mocha'
describe('template', () => {
  it('test', () => {

      let shell = latte_run_shell.create({

      })
      shell.exec('echo $http_proxy', function(err, data) {
        console.log(err, data)
      })

  })
})