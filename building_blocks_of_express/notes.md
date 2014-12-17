# First Steps

Express request and response objects extend the node http.IncomingMessage and http.ServerResponse prototypes

# How Middleware Works

Static middleware example doesn't work as is - need to specify the path using `__dirname`

## Using middlewares

app.use to specify the start
next() to call the next middleware
the stack is completed when the response is sent

## Static
static sends all assets in the specified folder

## Building middleware

# Reading from the URL

# POST Requests

# DELETE Requests
