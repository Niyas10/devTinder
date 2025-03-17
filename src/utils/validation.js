const validator = require("validator");

const validateSignUpData = (req) =>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }else if (!validator.isEmail(emailId)){
        throw new Error("Email id not valid")
    }else if (!validator.isStrongPassword(password)){
        throw new Error("enter a strong password")
    }
    
}

const validateProfileData = (req)=>{
    const allowedEditField = ["firstName","LastName","photoUrl","about","gender","age","skills"];

     if(req.body.photoURl &&!validator.isURL(req.body.photoURl)){
               throw new Error ("enter valid image url")
     }

  const isEditAllowed =   Object.keys(req.body).every(field => allowedEditField.includes(field))
  
 return isEditAllowed;
    

}

module.exports = {
    validateSignUpData,
    validateProfileData
}
