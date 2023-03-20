const Users =require('../Model/UserSchema')
const Category =require('../Model/category')
const SubCategory =require('../Model/subcategory')
const FactorHandler =require('../FactoryHandler/factoryhandler')
const createSendToken =require('../suscribers/createSendToken')
const Error =require('../Utils/ErrorHandler/ErrorHandler')

 exports.CreateAccount = async(req, res, next) => {
    if (
       req.body.password != req.body.confirmPassword
    )
       return next(new Error(`PASSWORD_NOT_MATCH`, 400));
    const data = {
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
       confirmPassword: req.body.confirmPassword,
       role:'admin'
    };

   const admin = await Users.create(data)
   if(!admin) return next(new Error(err.message))
   res.status(201).json({
    message:"SignIn Sucessfully ",
    data :admin
   })
 };



exports.Login =async(req,res,next)=>{
   const user =await Users.findOne({email:req.body.email}).select("+password");
   if (!user) return next(new Error(COMPARE_PASSWORD_USING_DB, 400));
   const isMatch = await user.comparepassword(req.body.password);
   if (!isMatch) return next(new Error(COMPARE_PASSWORD_USING_DB, 400));
   createSendToken(user,200,req,res,"LOGIN_SUCCESS")
}


//Category Handler
exports.AddCategory=FactorHandler.Add(Category)
exports.getAllCategory=FactorHandler.getAll(Category)
exports.EditCategory=FactorHandler.updateOne(Category)
exports.UpdateStatus=FactorHandler.updateOne(Category)
exports.getCategory=FactorHandler.getOne(Category)

//SubCategory
exports.AddSubCategory=async(req,res,next)=>{
    const  data =[];
    const arr =req.body.subcategory
    for(let i=0;i<=arr.length-1;i++)
    { 
       const subcategory={
           categoryId:req.query.id,
           name:arr[i].name
       }
       data.push(subcategory)
    }
  const subcategory =await SubCategory.create(data)
   if(!subcategory) return next(new Error('data not be added'))
   res.status(200).send({message:"sub category add sucess fully"});
 }
 
 exports.getAllCategoryofSubcategory=(req,res,next)=>{
    SubCategory.find({},function(err,data){
       if(err) return next(new Error(`${err.message}`,500))
       res.status(200).send({data:data})
    })
 }
 
 exports.getAllSubcategory=(req,res,next)=>{
    SubCategory.find({categoryId:req.params.id},function(err,data){
       if(err) return next(new Error(`${err.message}`,500))
       res.status(200).send({data:data})
    })
 }
 
 exports.EditSubcategory =async(req,res,next)=>{
    SubCategory.findOneAndUpdate({_id:req.params.id},{name:req.body.name},function(err,data){
         if(err) return next(new Error(err.message))
         res.status(200).send({message:"subcategroy data change Sucessfull",data:data})
     })
 }
 
 
 exports.deleteSubcategory =async(req,res,next)=>{
    SubCategory.findOneAndUpdate({_id:req.params.id},{status:req.body.status},function(err,data){
        if(err) return next(new Error(err.message))
        res.status(200).send({message:"subcategroy data change Sucessfull",data:data})
    })
 }








