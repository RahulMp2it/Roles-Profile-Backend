import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../Models/user.js'

class UserController {
  static userRegistration = async (req, res) => {
    const {name, email, password, passwordConfirmation} = req.body
    const user = await UserModel.findOne({email: email})
    if(user){
      res.send({"status": "failed", "message": "Email already exists"})
    }else {
        if(name && password && passwordConfirmation){
          if(password === passwordConfirmation){
            
            try {
              const salt = await bcrypt.genSalt(10)
              const hashPassword = await bcrypt.hash(password, salt)
              const doc = new UserModel({
                name:name,
                email:email,
                password:hashPassword
              })
              await doc.save();
              const saved_user = await UserModel.findOne({email:email})
              //Generate JWT Token
              const token = jwt.sign({useID:saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
              res.status(201).send({"status": "success", "message": "Register successfully", "token": token})
            } catch (error) {
              console.log(error)
              res.send({"status": "faild", "message": "enable to Register"})
            }
            
          }else{
            res.send({"status": "faild", "message": "password and confirm password does't match"})
          }
        }
     else {
      res.send({"status": "failed", "message": "All fields are required"})
      }
  }
  }

  static userLogin = async (req, res) => {
    try {
      const {email, password} = req.body
      if(email && password){
          const user = await UserModel.findOne({email: email}) //to check email is resiter or not
          if(user != null) {
            const isMatch = await bcrypt.compare(password, user.password)
            if((user.email === email) && isMatch){
              //Generate jwt Token
              const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
              res.send({success:true, "message": "Login Successfully", "token": token})
            }else{
              res.send({success:false, "message": "Email or password is not valid"})
            }
          }
          else{
            res.send({success:false, "message": "You are not a rgister user"})

          }
      }else{
        res.send({"status": "faild", "message": "All fields are required"})
      }
    } catch (error) {
        console.log(error)
        res.send({"status": "faild", "message": "unable to login"})
    }
  }

}

export default UserController;