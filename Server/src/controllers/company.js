const Company = require("../models/company")

exports.createCompany = async (req, reply) => { 
    try { 
        const company = new Company(req.body)  
        company.save()  
        console.log(company)    
        reply.send({company,"message": 'Company Created'})
    } 
    catch(error){
        reply.send ({ "error" : 'Creation Failed' })    
    } 
}

exports.viewAllCompany = async (req, reply) => { 
    try { 
        const companies= await Company.find();
        reply.send(companies);
    } 
    catch(error){
        reply.send ({ "error" : 'Can not be viewed' })    
    }
}

exports.viewCompany= async (req,reply) => {
    const id=req.params.id;
    
    try{
        const company=await Company.findById(id);
        if(company){
        reply.send(company);
        }
        else{
            reply.send ({ "error" : 'No Company Found' })   
        }
    }
    catch(error){
        reply.send ({ "error" : 'Update Failed' })    
    }
}

exports.viewCompanyEmail = async (req,reply) => {
    const email=req.params.email;
    
    try{
        const company=await Company.findOne({companyEmail : email});
        if(company){
            reply.send(company);
        }
        else{
            reply.send ({ "error" : 'No Company Found' })   
        }
    }
    catch(error){
        reply.send ({ "error" : 'Update Failed' })    
    }
}


exports.editCompany= async (req,reply)=>{
    try{
        const id = req.params.id;
        const updatedCompany = await Company.findByIdAndUpdate(id,{ $set:req.body},{new:true,useFindAndModify:false})
        if(updatedCompany){
         reply.send({updatedCompany,"message":"Your Company Is Updated Successfully"})
        }
        else{
            reply.send ({ "error" : 'No Company Found' })   
        }
    }
    catch(error){
        reply.send ({ "error" : 'Update Failed' })    
    }
}

exports.deleteCompany = async (req,reply)=>{
    try{
        const id=req.params.id;
        const deletedCompany=await Company.findByIdAndRemove(id,{new:true,useFindAndModify:false})
        console.log("delete");
        if(deletedCompany){
        reply.send({deletedCompany,"message":"Your company is deleted successfully"});
        }
        else{
            reply.send ({ "error" : 'No Company Found' })   
        }
    }
    catch(error){
        reply.send ({ "error" : 'Update Failed' })    
    }
}
