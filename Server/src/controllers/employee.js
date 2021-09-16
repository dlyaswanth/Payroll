const Employee = require("../models/employee")
const Company = require("../models/company")
exports.createEmployee = async (req, reply) => { 
    try { 
        const employee = new Employee(req.body)   
        
        //earnings calculation
        const company=await Company.findById(employee.companyId)
        var earnings=0;
        for (const earning in company.earningsDocArray) {
            earnings+=Number(company.earningsDocArray[earning].amount);
          }
        console.log(earnings);
        //salary calculation
        employee.salary=earnings+Number(employee.basicPay)-Number(employee.deductions);
        console.log(employee);
        employee.save()
        
        //updating company emp count and emp netpay
        var updatedObj={
            employeeCount:company.employeeCount+1,
            employeeNetPay:company.employeeNetPay+employee.salary
        }
        
        const updatedCompany = await Company.findByIdAndUpdate(employee.companyId,{ $set: updatedObj},{new:true,useFindAndModify:false})
        const allEmployee=await Employee.find({companyId:employee.companyId});
        reply.send({employee,updatedCompany,allEmployee,"message":'Employee Created'}) 
    } 
    catch(error){
        reply.send ({ "error" : 'Creation Failed' })    
    } 
}
exports.viewAllEmployee = async (req, reply) => { 
    try { 
        const employee= await Employee.find();
        reply.send(employee);
    } 
    catch(error){
        reply.send ({ "error" : 'View Failed' })    
    } 
}
exports.viewEmployee= async (req,reply) => {
    const id=req.params.id;
    
    try{
        const employee=await Employee.findById(id);
        if(employee){
            reply.send(employee);
        }    
    else{
        reply.send ({ "error" : 'No Company Found' })   
    }
    }
    catch(error){
        reply.send ({ "error" : 'View Failed' })    
    } 
}
exports.viewEmployeeByCompany= async (req,reply) => {
    const companyId=req.params.companyId;
    try{
        const employee=await Employee.find({companyId:companyId});
        if(employee){
            reply.send({employee,"message":"Employee Sent"});
        }
        else{
            reply.send({employee,"message":"No Employee found for this company"})
        }
    }
    catch (error) {
        reply.send({"error":"Employee Fetch Failed"})
    }
}
exports.viewEmployeeEmail = async (req,reply) => {
    const email=req.params.email;
    
    try{
        const employee=await Employee.findOne({employeeEmail : email});
        if(employee){
            reply.send(employee);
        }    
    else{
        reply.send ({ "error" : 'No Company Found' })   
    }
    }
    catch(error){
        reply.send ({ "error" : 'View Failed' })    
    } 
}
exports.editEmployee= async (req,reply)=>{
    try{
        const id = req.params.id;
        //fetching previous details
        var employee= await Employee.findById(id)
        //geting updated details  from user
        const updatedEmployee = await Employee.findByIdAndUpdate(id,{ $set:req.body},{new:true,useFindAndModify:false}) 
        //altering company netpay according to updated employee details(basicpay)
        if(updatedEmployee){
            var company=await Company.findById(updatedEmployee.companyId)
               // var diff= updatedEmployee.basicPay - employee.basicPay;
                var updatedObj={
                    employeeNetPay:company.employeeNetPay - employee.salary + updatedEmployee.salary
                }
            //updating company table
            const updatedCompany = await Company.findByIdAndUpdate(updatedEmployee.companyId,{ $set: updatedObj},{new:true,useFindAndModify:false})
            const allEmployee=await Employee.find({companyId:updatedEmployee.companyId});
            reply.send({updatedEmployee,allEmployee,"message":"Your Company Is Updated Successfully"})
        }    
        else{
        reply.send ({ "error" : 'No Company Found' })   
        }
    }
    catch(error){
        reply.send ({ "error" : 'Update Failed' })    
    } 
}
exports.deleteEmployee = async (req,reply)=>{
    try{
        const id=req.params.id;
        const deletedEmployee=await Employee.findByIdAndRemove(id,{new:true,useFindAndModify:false})
        console.log("delete");      
        if(deletedEmployee){
            var company=await Company.findById(deletedEmployee.companyId)
            var updatedObj={
                employeeCount:company.employeeCount-1,
                employeeNetPay:company.employeeNetPay-deletedEmployee.salary
            }           
            const updatedCompany = await Company.findByIdAndUpdate(deletedEmployee.companyId,{ $set: updatedObj},{new:true,useFindAndModify:false})
            console.log(updatedCompany)
            const allEmployee=await Employee.find({companyId:deletedEmployee.companyId});
            reply.send({updatedCompany,deletedEmployee,allEmployee,"message":"Your company is deleted successfully"});
        }    
        else{
        reply.send ({ "error" : 'No Company Found' })   
        }
    }
    catch(error){
        reply.send ({ "error" : 'Deletion Failed' })    
    } 
}
