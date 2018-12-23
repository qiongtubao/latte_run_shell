"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var Shell = (function () {
    function Shell() {
        var _this = this;
        this.process = child_process_1.spawn("bash");
        this.process.on("error", function (error) {
            _this.error("error");
        });
        this.process.stdout.on("data", function (data) {
            _this.data(data);
        });
        this.process.stderr.on("data", function (data) {
            console.log("收到error", data);
        });
        this.process.on('close', function (code) {
            console.log("\u5B50\u8FDB\u7A0B\u9000\u51FA:" + code);
        });
    }
    Shell.prototype.error = function (error) {
        console.log("\u6536\u5230\u9519\u8BEF\u6D88\u606F" + error);
    };
    Shell.prototype.data = function (data) {
        console.log("\u6536\u5230\u6B63\u786E\u4FE1\u606F");
    };
    Shell.prototype.export = function (key, value) {
    };
    Shell.prototype.exec = function (cmd, callback) {
        this.process.stdin.write('pwd', function (error) {
            console.log("exec pwd " + error);
        });
    };
    return Shell;
}());
function create(options) {
    return new Shell();
}
exports.create = create;
