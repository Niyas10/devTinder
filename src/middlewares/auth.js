const adminAuth = (req,res,next)=>{
    console.log("admin auth checked")
    const token = 'xyz'
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized request")
    }else{
        next()
    }
}

const userAuth = (req,res,next)=>{
    const token = 'xyz'
    const userAuthorized = token === 'xyz'
    if(!userAuthorized){
        res.status(401).send("unAuthorized request")
    }else{
        next()
    }
}

module.exports = {
    adminAuth,
    userAuth
}