const express=require('express')

const app=express()
const PORT=8080;
app.get("/",(req,res)=>{
  
    res.send("Hello World") 
})
app.get("/test",(req,res)=>{
  
    res.send("test routing") 
})

app.listen(PORT,()=>{
    console.log(`My app is running on port:${PORT}`)
})
