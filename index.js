// *** Express.js Server set up with Node.js


// Embedded below is essentially the simplest Express app you can create. It is a single file app — not what you’d get if you use the Express generator, which creates the scaffolding for a full app with numerous JavaScript files, Jade templates, and sub-directories for various purposes.

// pull in `express`
const express = require('express')
// assign `express` to `app`
const app = express()
// choose port to run/listen from/to
const port = 3000

// tell `express` where the static files are
app.use(express.static(__dirname + "/public/"));

// assign `root` of server(`/`), then when accessed via `sendFile(__dirname + 'fileLocation')` returns `index.html`
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))
// tell `express` to listen to port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// does not re-render on refresh???
