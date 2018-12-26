import {spawn, ChildProcess} from "child_process"




class Shell {
    process: ChildProcess
    onData: Function
    caches: any[] = []

    constructor() {
        this.process = spawn("bash")
        this.process.on("error", (error) => {
            this.error("error")
        })
        this.process.stdout.on("data", (data) => {
            this.data(data)
        })
        this.process.stderr.on("data", (data)=> {
            console.log(data)
            //this.error(data)
        })
        this.process.on('close', (code) => {
            console.log(`子进程退出:${code}`)
        })
    }
    error(error) {
        console.log(`收到错误消息${error}`)
    }
    data(data) {
        // console.log(`收到正确信息 ${data}`)
        this.onData && this.onData(null, data.toString())
    }
    export(key, value) {

    }
    exec(cmd, callback?) {
        if(this.onData) {
            this.caches.push({
                cmd: cmd,
                callback: callback
            })
            return this
        }
        this.onData = (() => {
            let lock = false
            return (err, data) => {
                if(lock) {
                    return
                }
                lock = true
                callback(err, data) 
                this.onData = undefined
                let cache = this.caches.shift()
                if(cache) {
                    this.exec(cache.cmd, cache.callback)
                }
            }
        })()
        this.process.stdin.write(`${cmd} \n`)
        return this
    }
}
export function create(options) {
    return new Shell() 
}