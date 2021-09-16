const Payslip = require("../models/payslip")


exports.createPayslip = async (req, reply) => { 
    try { 
        const payslip = new Payslip(req.body)   
        console.log(payslip)    
        await payslip.save()
        
        //get remimbursment by companyID
        const Allpayslip = await Payslip.find({employeeId : payslip.employeeId});
        reply.send(Allpayslip); 
    } 
    catch(error){
        reply.send ({ "error" : 'Creation Failed' })    
    } 
}

exports.viewAllPayslip = async (req, reply) => { 
    try { 
        const payslip= await Payslip.find();
        reply.send(payslip);
    } 
    catch(error){
        reply.send ({ "error" : 'View Failed' })    
    } 
}

exports.viewEmployeePayslip = async (req,reply) => {
    const id=req.params.employeeId;
    const date = req.params.date;
    
    try{
        const payslip = await Payslip.find({employeeId : id, payDate:date});
        console.log(payslip)
        reply.send(payslip);
    }
    catch(error){
        reply.send ({ "error" : 'View Failed' })    
    } 
}
exports.editPayslip= async (req,reply)=>{
    try{
        const id = req.params.id;
        const updatedPayslip = await Payslip.findByIdAndUpdate(id,{ $set:req.body},{new:true,useFindAndModify:false})
        if(updatedPayslip){
         reply.send({updatedPayslip,"message":"Your Payslip Is Updated Successfully"})
        }
        else{
            reply.send ({ "error" : 'No Payslip Found' })   
        }
    }
    catch(error){
        reply.send ({ "error" : 'Update Failed' })    
    }
}

exports.deletePayslip = async (req,reply)=>{
    try{
        const id=req.params.id;
        const deletedpayslip=await Payslip.findByIdAndRemove(id,{new:true,useFindAndModify:false})
        console.log("delete");
        const payslip = await Payslip.find({employeeId:deletedpayslip.employeeId});
        reply.send({deletedpayslip,payslip,"message":"Your company is deleted successfully"});
    }
    catch(error){
        reply.send ({ "error" : 'Deletion Failed' })    
    } 
}
