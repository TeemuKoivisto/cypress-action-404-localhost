import { exec, spawn } from 'node:child_process'

async function run() {
  const controller = new AbortController()
  const { signal } = controller
  exec('pnpm --filter site dev', { signal }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
  })
  const cypress = spawn(
    'pnpm --filter site cy run --browser=chrome --config baseUrl=http://localhost:5285',
    { shell: true }
  )
  cypress.stdout.on('data', function (data) {
    console.log(data.toString())
  })
  cypress.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString())
    controller.abort()
  })
}

run()
