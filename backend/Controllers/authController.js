import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = user=> {
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d',
    })
}
export const signup = async (req, res) => {
    const {name, email, password, role, photo, gender} = req.body
  try {
    let user = null;

    if (role==='patient'){
       user = await User.findOne({email})
    }
    else if (role === 'doctor'){
        user = await Doctor.findOne({email})
    }
    
    //Check if user exist
    if (user){
        return res.status(400).json({message: 'User Already Exist.'})
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const HashPassword = await bcrypt.hash(password, salt)

    if(role === 'patient'){
        user = new User({
            name,
            email, 
            password:HashPassword,
            photo,
            gender,
            role
        })
    }

    if(role === 'doctor'){
        user = new Doctor({
            name,
            email, 
            password:HashPassword,
            photo,
            gender,
            role
        })
    }

    await user.save()
    res.status(200).json({success: true, message: 'User Successfully Created'})

  } catch (err) {
    res.status(500).json({success: false, message: 'Internal Server Error, Try again'})
  }
}

export const login = async (req, res) => {
    const {email} = req.body
    try {
        let user = null;

        const patient = await User.findOne({email});
        const doctor = await Doctor.findOne({email});

        if(patient){
            user = patient
        }
        if(doctor){
            user = doctor
        }

        //Check if user exist or not
        if (!user){
            return res.status(404).json({message: 'User Not Found'})
        }

        //Check password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordMatch){
            return res.status(400).json({status: false, message: 'Invalid Credentials'})
        }

        //Get Token
        const token = generateToken(user);

        const {password, role, appointments, ...rest} = user._doc
        return res.status(200).json({status: true, message: 'Successfully Login', token, data:{...rest}, role})

    } catch (err) {
        res.status(500).json({status: false, message: 'Failed to Login'})
    }
  }