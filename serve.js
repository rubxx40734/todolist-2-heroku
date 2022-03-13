const http = require('http')
const { v4: uuidv4 } = require('uuid');
const errorHandel = require('./errorHandel')
const todos = []

const createLister = function(req,res) {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
       'Content-Type': 'application/json'
     }
     let body = ''
    req.on('data', chunk => {
        body += chunk
        body.id = uuidv4()
    })
    if(req.url == '/todos' && req.method == 'GET'){
        res.writeHead(200,headers)
        res.write(JSON.stringify({
                'title' : 'success',
                'data' : todos
        }))
        res.end()
    }else if(req.url == '/todos' && req.method == 'POST') {
        req.on('end', () => {
            try{
                const title = JSON.parse(body).title
                if(title !== undefined) {
                    const todo = {
                        'title' : title,
                         'id' : uuidv4()
                    }
                    todos.push(todo)
                    res.writeHead(200,headers)
                    res.write(JSON.stringify({
                            'status' : 'success',
                            'data' : todos
                    }))
                    res.end()
                }else{
                    errorHandel(req,res)
                }
            }
            catch(err){
                errorHandel(req,res)
            }
        })
    }else if(req.url == '/todos' && req.method == 'DELETE'){
        todos.length = 0
        res.writeHead(200,headers)
        res.write(JSON.stringify({
                'title' : 'delete all success',
                'data' : todos
        }))
        res.end()
    }else if(req.url.startsWith('/todos/') && req.method == 'DELETE') {
        const id = req.url.split('/').pop()
        const num = todos.findIndex(item => item.id === id)
        if(id !== undefined && num !== -1) {
            todos.splice(num,1)
            res.writeHead(200,headers)
            res.write(JSON.stringify({
                    'title' : 'delete all success',
                    'data' : todos
            }))
            res.end()
        }else{
            errorHandel(req,res)
        }
    }else if(req.url.startsWith('/todos/') && req.method == 'PATCH'){
        req.on('end', () => {
            try{
                const todo = JSON.parse(body).title
                const id = req.url.split('/').pop()
                const index = todos.findIndex(item => item.id === id)
                if( todo !== undefined && index !== -1) {
                     todos[index].title = todo
                     res.writeHead(200,headers)
                     res.write(JSON.stringify({
                             'title' : 'delete all success',
                             'data' : todos
                     }))
                     res.end()
                }else{
                    errorHandel(req,res)
                }
            }
            catch{
                errorHandel(req,res)
            }
        })
    }else if(req.method == 'OPTIONS'){  //options代表是否支援跨網域
        res.writeHead(200,headers)
        res.end()
    }
    else{
        res.writeHead(400,headers)
        res.write(JSON.stringify({
             'title' : '404 not fount',
              'data' : [] 
        }))
        res.end()
    }
}

const server = http.createServer(createLister)
  
server.listen(process.env.PORT || 3000);