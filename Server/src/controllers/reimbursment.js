const Reimbursment = require("../models/reimbursment")
const Company = require("../models/company")
const Employee = require("../models/employee")

exports.createReimbursment = async (req, reply) => { 
    try { 
        const reimbursment = new Reimbursment(req.body)   
        console.log(reimbursment)    
        await reimbursment.save()
        
        //get remimbursment by companyID
        const Allreimbursment = await Reimbursment.find({employeeId : reimbursment.employeeId});
        reply.send(Allreimbursment); 
    } 
    catch(error){
        reply.send ({ "error" : 'Creation Failed' })    
    } 
}

exports.viewCompanyReimbursmentList = async (req,reply)=>{
    const id=req.params.companyId;
    try{
        const company = await Company.findById(id);
        
        reply.send(company.reimbursmentArray)
    }
    catch(error){
        reply.send({"error": "could not fetch reimbursment"})
    }
}

exports.viewAllReimbursment = async (req, reply) => { 
    try { 
        const reimbursment= await Reimbursment.find();
        reply.send(reimbursment);
    } 
    catch(error){
        reply.send ({ "error" : 'View Failed' })    
    } 
}

exports.viewCompanyReimbursment= async (req,reply) => {
    const id=req.params.companyId;
    
    try{
        const reimbursment = await Reimbursment.find({companyId:id});
        reply.send(reimbursment);
    }
    catch(error){
        reply.send ({ "error" : 'View Failed' })    
    } 
}

exports.viewEmployeeReimbursment = async (req,reply) => {
    const id=req.params.employeeId;
    
    try{
        const reimbursment = await Reimbursment.find({employeeId : id});
        reply.send(reimbursment);
    }
    catch(error){
        reply.send ({ "error" : 'View Failed' })    
    } 
}


exports.editReimbursment= async (req,reply)=>{
    try{
        const id = req.params.id;
        const updatedreimbursment = await Reimbursment.findByIdAndUpdate(id,{ $set:req.body},{new:true,useFindAndModify:false})
        
        if(updatedreimbursment.status=="Approved"){
            //updating salary of employee
            const employee = await Employee.findById(updatedreimbursment.employeeId)
            const updateObj = {
                salary : employee.salary + updatedreimbursment.amount,
                approvedReimbursment : employee.approvedReimbursment + updatedreimbursment.amount
            }
            await Employee.findByIdAndUpdate(updatedreimbursment.employeeId,{ $set:updateObj},{new:true,useFindAndModify:false}) 
            //updating netpay of company
            const company = await Company.findById(updatedreimbursment.companyId)
            await Company.findByIdAndUpdate(updatedreimbursment.companyId,{ $set:{employeeNetPay : company.employeeNetPay+updatedreimbursment.amount}},{new:true,useFindAndModify:false}) 
        }
        
        //get remimbursment by companyID
        const reimbursment = await Reimbursment.find({companyId:updatedreimbursment.companyId});
        reply.send({updatedreimbursment,reimbursment,"message":"updated succesfully"});
    }
    catch(error){
        reply.send ({ "error" : 'Update Failed' })    
    } 
}

exports.deleteReimbursment = async (req,reply)=>{
    try{
        const id=req.params.id;
        const deletedreimbursment=await Reimbursment.findByIdAndRemove(id,{new:true,useFindAndModify:false})
        console.log("delete");
        const reimbursment = await Reimbursment.find({employeeId:deletedreimbursment.employeeId});
        reply.send({deletedreimbursment,reimbursment,"error":"Your company is deleted successfully"});
    }
    catch(error){
        reply.send ({ "error" : 'Deletion Failed' })    
    } 
}
