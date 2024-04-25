import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'

export const updateDoctor = async (req, res) => {
    const id = req.params.id

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({success: true, message: 'Doctor Successfully Updated', data:updatedDoctor})

    } catch (err) {
        res.status(500).json({success: false, message: 'Failed to Updated'})
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id

    try {
        
        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.status(200).json({success: true, message: 'Doctor Successfully Deleted'})

    } catch (err) {
        res.status(500).json({success: false, message: 'Failed to Delete'})
    }
}

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id

    try {
        const doctor = await Doctor.findById(id).populate('reviews').select("-password")

        res.status(200).json({success: true, message: 'Dcotor Found', data:doctor})

    } catch (err) {
        res.status(404).json({success: false, message: 'Doctor Not Found'})
    }
}

export const getAllDoctor = async (req, res) => {

    try {
        const {query} = req.query
        let doctors;
        
        if(query){
            doctors = await Doctor.find({
                isApproved:'approved',
                $or: [
                {name: { $regex: query, $option: "i"}},
                {specialization: { $regex: query, $option: "i"}},
            ],
        }).select("-password");
        }
        else{
            doctors = await Doctor.find({isApproved:'approved'}).select("-password")
        }
        res.status(200).json({success: true, message: 'Doctors Found', data:doctors})

    } catch (err) {
        res.status(404).json({success: false, message: 'Not Found'})
    }
}

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId

    try {
        const doctor = await Doctor.findById(doctorId)

        if(!doctor){
            return res.status(404).json({success:false, message: 'Doctor not Found'})
        }
        const {password, ...rest} = doctor._doc
        const appointments = await Booking.find({doctor:doctorId})
        return res.status(200).json({success:true, message: 'Profile info Found', data:{...rest, appointments}})
    } catch (err) {
        res.status(500).json({success: false, message: 'Something went wrong, can not get'}) 
    }
}