http = require 'http'
fs = require 'fs'
path = require 'path'

PORT = 5001

app = http.createServer (request, response) ->
    filePath = '.' + request.url

    if filePath == './'
        filePath = './index.html'

    console.log filePath

    query = filePath.lastIndexOf '?' 
    if  query > 0
        filePath = filePath.slice 0, query 

    extname = path.extname filePath 
    contentType = 'text/html'
    switch  extname  
        when '.js'
            contentType = 'text/javascript'
        when '.css'
            contentType = 'text/css'
        when '.png'
            contentType = 'image/png'
        when '.jpg'
            contentType = 'image/jpeg'
        when '.gif'
            contentType = 'image/gif'
        when '.otf'
            contentType = 'application/x-font-opentype'
        when '.svg'
            contentType = 'image/svg+xml'            
        when '.ttf'
            contentType = 'application/x-font-truetype'

    path.exists filePath, (exists) ->
        if !exists  
            if filePath == './404'
                response.writeHead 404
                response.end()
                return
            else
                filePath = "app.html"
        fs.readFile filePath, (error, content)  ->
            if  error  
                response.writeHead 500
                response.end()
            else 
                response.writeHead 200, 'Content-Type': contentType  
                response.end content, 'utf-8' 
app.listen PORT

console?.log "Server running at http://127.0.0.1:#{PORT}/"
