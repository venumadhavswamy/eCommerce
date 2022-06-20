const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send("Welcome");
});

const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`Server running on port ${port}`));