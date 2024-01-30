const express = require('express');
const empolyeeTable = require("./models").employee;



const router = express.Router();

//Add employee Api
router.post("/add-employee",(req,res)=>{
    empolyeeTable.findOne({
        where:{
            email: req.body.email
        }
    }).then((data)=>{
        if(data){
            res.json({
                status: false,
                message: "Email already exists"
            });

        } else{
            empolyeeTable.create({
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                mobile: req.body.mobile
            }).then( (success)=> {
                res.json({
                    status: true,
                    message: "Employee created successfully"
                });
        
            }).catch((error)=>{
                res.json({
                    status: false,
                    message: " Failed to execute insert query"
                })
            });

        }
       

    }).catch((error)=>{
        res.json({
            status: false,
            message: "Failed to execute query"
        });


    })
   
});

//get all employes
router.get("/list-employee",(req,res)=>{
    empolyeeTable.findAll()
    .then((data) =>{
        if(data){
            res.json({
                status: true,
                message: "Employees found",
                users: data

            })

        }else{
            res.json({
                status: false,
                message: "no employe found"
            })
        }
    })
});


//get single employee
router.get("/single-employee/:id",(req,res)=>{
    empolyeeTable.findOne({
        where:{
            id:req.params.id
        }
    }).then((data)=>{
        if(data){
            res.json({
                status:true,
                message: "Employee data found",
                user: data
            });
        }else{
            res.json({
                status: false,
                message: "No employee found"
            })
        }

    }).catch((error)=>{
        res.json({
            status: false,
            message: "failed to execute query"
        })
    })

});


//update employee
router.put("/update-employee/:id", (req,res)=>{
    empolyeeTable.findOne({
        where:{
            id:req.params.id
        }
    }).then((data)=>{
        if(data) {
            empolyeeTable.update({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile
            }, {
                where:{
                    id:req.params.id
                }
            }).then((data)=>{
                res.json({
                    status: true,
                    message: "Employee updated successfully"
                })
            }).catch((error)=>{
                res.json({
                    status: false,
                    message: "failed to execute query"
                })
            })
        }else{
            res.json({
                status: false,
                message: "no employee found"
            })
        }


    }).catch((error)=>{
        res.json({
            status: failed,
            message: "failed to execute query"
        })
    })
});

//delete employee

router.delete("/delete-employee/:id",(req,res)=>{

    empolyeeTable.findOne({
        where:{
            id:req.params.id
        }
    }).then((data)=> {

        if(data){
            empolyeeTable.destroy({
                where:{
                    id: req.params.id
                }
            }).then((data)=>{
                res.json({
                    status:true,
                    message: "Employee deleted successfully"
                })

            }).catch((error)=>{
                res.json({
                    status: false,
                    message: "failed to execute"
                })

            })

        }else{
            res.json({
                status: false,
                message: "no employee found"
            })

        }
    }).catch((error)=>{
        res.json({
            status: false,
            message: "failed to execute"
        })

    })
});

//welcome page
router.get('/', (req, res)=>{
  res.json({
    status: true,
    message:  " welcom to nodejs"
  }
    )
});
module.exports = router;