const express=require('express')
const router=express.Router()
const mysql=require('mysql')
const db=require('../config/db.config')


const connection=mysql.createConnection(db.database)

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var itemtableqQuery="CREATE TABLE IF NOT EXISTS Item(code VARCHAR(255),itemname VARCHAR(255),qty VARCHAR(255),price VARCHAR(255))"
        connection.query(itemtableqQuery,function(err,result){
            console.log("Connect Database")
        console.log("item table Created")
        })
    }
})

router.get('/',(req,res)=>{
    var query="SELECT*FROM item";
    connection.query(query,function(err,row){
        if(err){
            res.send("No customers")
        }else{
            res.send(row)
        }
    });

})


router.post('/',(req,res)=>{
    const code=req.body.code
    const itemname=req.body.itemname
    const qty=req.body.qty
    const price=req.body.price

    var query="INSERT INTO item (code,itemname,qty,price)VALUES(?,?,?,?)";

    connection.query(query,[code,itemname,qty,price],(err)=>{
        if(err){
            res.send("Item Already Saved");
        }else{
            res.send("Item saved")
        }
    })

    console.log(req.body)
})


router.put('/',(req,res)=>{
    const code=req.body.code
    const itemname=req.body.itemname
    const qty=req.body.qty
    const price=req.body.price

    var query="UPDATE item SET itemname=?,qty=?,price=? WHERE code=?";

    connection.query(query,[itemname, qty , price,code],(err,row)=>{
            if (err)throw err;
                res.send(row)
    })
})

router.delete('/:code',(req,res)=>{
    const code=req.params.code
    var query="DELETE FROM item WHERE code=?";
    connection.query(query,[code],(err,rows)=>{
        res.send("Deleted item :" +code)

    })
})

router.get('/:id',(req,res)=>{
    const code=req.params.id
    var query="SELECT *FROM item WHERE code=?"
    connection.query(query,[code],(err,row)=>{
        if(err){
            res.send("No User")
        }else{
            res.send(row)
        }
    });
})
module.exports=router