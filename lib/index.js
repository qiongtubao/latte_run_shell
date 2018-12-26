"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var Shell = (function () {
    function Shell() {
        var _this = this;
        this.caches = [];
        this.process = child_process_1.spawn("bash");
        this.process.on("error", function (error) {
            _this.error("error");
        });
        this.process.stdout.on("data", function (data) {
            _this.data(data);
        });
        this.process.stderr.on("data", function (data) {
            console.log(data.toString());
        });
        this.process.on('close', function (code) {
            console.log("\u5B50\u8FDB\u7A0B\u9000\u51FA:" + code);
        });
    }
    Shell.prototype.error = function (error) {
        console.log("\u6536\u5230\u9519\u8BEF\u6D88\u606F" + error);
    };
    Shell.prototype.data = function (data) {
        this.onData && this.onData(null, data.toString());
    };
    Shell.prototype.export = function (key, value) {
    };
    Shell.prototype.exec = function (cmd, callback) {
        var _this = this;
        if (this.onData) {
            this.caches.push({
                cmd: cmd,
                callback: callback
            });
            return this;
        }
        this.onData = (function () {
            var lock = false;
            return function (err, data) {
                if (lock) {
                    return;
                }
                lock = true;
                callback(err, data);
                _this.onData = undefined;
                var cache = _this.caches.shift();
                if (cache) {
                    _this.exec(cache.cmd, cache.callback);
                }
            };
        })();
        this.process.stdin.write(cmd + " \n");
        return this;
    };
    return Shell;
}());
function create(options) {
    return new Shell();
}
exports.create = create;
