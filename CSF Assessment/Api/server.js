const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = 5100;
app.use(express.json());

app.use((req, res, next)=>{
    console.log(req.path,req.method);
    next();
})

//using cors to avoid platform issues
app.use(cors());
//adding routes to server
app.use("/api",routes);


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});

module.exports = app;