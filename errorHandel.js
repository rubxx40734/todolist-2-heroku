function errorHandel(req,res){

    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
       'Content-Type': 'application/json'
     }
     res.writeHead(400,headers)
     res.write(JSON.stringify({
             'status' : 'false',
             'message' : '格式錯誤 或無此todo id1111'
     }))
     res.end()
}

module.exports = errorHandel