import axios from "axios";
import express from "express";

// initionalization
const app = express();

const port = 4000;

// Middleware
app.use(express.json());
app.set('view engin', 'ejs');
app.use(express.static("public"));


app.get('/', (req, res)=>{
    res.send("Server is upp and running")
})

app.listen(port, ()=>{
    console.log(`Server is running in port: ${port}`)
})