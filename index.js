var express = require('express');
var app = express();

app.use(express.static('webapp', {
    lastModified: false
}));
 
app.listen(9000);
