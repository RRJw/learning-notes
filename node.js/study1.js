var foo='这是node.js'

console.log(foo)


var fs=require('fs')

fs.readFile('./你好.md',function(error,data){
    console.log(data.toString())
})