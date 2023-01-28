const express=require("express")
const cors=require("cors")
const mysql=require("mysql2")
const app=express()
const port=5000
app.use(express.json(),cors())
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'images'
  });
  app.get('/images',(req,res,next)=>{
    sql.execute(`select * from data`,(error,result)=>{
        if(error){
            return res.json({message:"fail",error:error})
        }
        return res.json({token:result})

    })
  })
  app.get('/images/:name',(req,res,next)=>{
    const {name}=req.params
    sql.execute(`select * from data where name like'%${name}%'`,(error,result)=>{
        if(error){
            return res.json({message:"fail",error:error})
        }
        return res.json({token:result})

    })
  })
  ////search
app.post('/images',(req,res,next)=>{
  const {name}=req.body
  
  sql.execute(`select * from data where name like '%${name}%'`,(error,result)=>{
    if(error){
      return res.json({error:error})
    }
    return res.json({token:result})
  })
})
app.post('/addimages',(req,res,next)=>{
  const{path,name}=req.body
  sql.execute(`insert into data (path,name) values ('${path}','${name}')`,(error,result)=>{
    if(error){
      return res.json({error:error})
    }
    return res.json({token:result})
  })

})

app.listen(port,()=>{
    console.log(`server is running....`);
})

