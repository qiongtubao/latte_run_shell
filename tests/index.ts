import * as latte_run_shell from "../src/index"
let shell = latte_run_shell.create({

})
shell.exec('echo $http_proxy && echo $https_proxy', function(err, data) {
  console.log(err, data)
})