const express = require ('express')();
const app =  express();
app.get('/',(req,res)=> {
    res.send ("Hellon World");}
);

app.listern(port,()=>{

    console.log('Server is running on http://localhost:${port}');
});

//Get all items

app.get('/api/items',(req,res)=>{
    const id = parseIntr(req.params.id,10);
    const items={id,name:'Item ${id}'};
    res.json(items);
});

// create a new items

app.post('/api/items',(req,res)=>{
const newItem = req.body;

}
)