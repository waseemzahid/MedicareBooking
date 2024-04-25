import User from '../models/UserSchema.js'
import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const updateUser = async (req, res) => {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({success: true, message: 'User Successfully Updated', data:updatedUser})

    } catch (err) {
        res.status(500).json({success: false, message: 'Failed to Updated'})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        await User.findByIdAndDelete(id)

        res.status(200).json({success: true, message: 'User Successfully Deleted'})

    } catch (err) {
        res.status(500).json({success: false, message: 'Failed to Delete'})
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select("-password")

        res.status(200).json({success: true, message: 'User Found', data:user})

    } catch (err) {
        res.status(404).json({success: false, message: 'User Not Found'})
    }
}

export const getAllUser = async (req, res) => {
    const id = req.params.id

    try {
        const users = await User.find({}).select("-password")

        res.status(200).json({success: true, message: 'Users Found', data:users})

    } catch (err) {
        res.status(404).json({success: false, message: 'Not Found'})
    }
}

export const getUserProfile = async (req, res) => {
    const userId = req.userId

    try {
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({success:false, message: 'User not Found'})
        }
        const {password, ...rest} = user._doc
        return res.status(200).json({success:true, message: 'Profile info Found', data:{...rest}})
    } catch (err) {
        res.status(500).json({success: false, message: 'Something went wrong, can not get'}) 
    }
}

export const getMyAppointments = async (req, res) => {
    try {
        //step: 1 - retrieve appointments from booking for specific user
        const bookings = await Booking.find({user:req.userId})
        //step: 2 - retrieve doctor ids from appointment booking
        const doctorIds = bookings.map(el=>el.doctor.id)
        //step: 3 - retrieve doctor useing doctor ids
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')

        return res.status(200).json({success:true, message: 'Appointments Found', data:doctors})
    } catch (err) {
        res.status(500).json({success: false, message: 'You do not book any doctor yet!'}) 
    }
}