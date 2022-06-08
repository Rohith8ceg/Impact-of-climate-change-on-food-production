let path = require('path');
let express = require('express');
let app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});
