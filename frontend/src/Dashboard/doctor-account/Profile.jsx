/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import uploadImageToCloudinary from '../../../utils/uploadCloudinary'
import { BASE_URL, token } from '../../config'
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import {AiOutlineDelete} from 'react-icons/ai'

const Profile = ({doctorData}) => {
  console.log(doctorData);
  const [selectedFile, setSeletecFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    photo: null,
    gender: '',
    specialization:'',
    ticketPrice: 0,
    // qualifications: [{startingDate: "", endingDate: "", degree: "", university: ""}],
    // experiences: [{startingDate: "", endingDate: "", position: "", hospital: ""}],
    // timeSlots: [{day: "", startingTime: "", endingTime: ""}],
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about:'',
  })

  useEffect(() => {
    setFormData({name: doctorData?.name, email: doctorData?.email, phone:doctorData?.phone, bio:doctorData?.bio, photo: doctorData?.photo, 
        gender: doctorData?.gender, specialization: doctorData?.specialization, ticketPrice:doctorData?.ticketPrice, qualifications:doctorData?.qualifications,
        experiences:doctorData?.experiences, timeSlots:doctorData?.timeSlots, about:doctorData?.about
    })
  }, [doctorData]) 

  const navigate = useNavigate();
  // const handleInputChange = e  => {
  //   setFormData({...formData, [e.target.name]:e.target.value})
  // }
  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "gender") {
      setFormData(prevState => ({
        ...prevState,
        gender: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    //later we use cloudinary to upload
    const data = await uploadImageToCloudinary(file);
    setSeletecFile(data.url)
    setFormData({...formData, photo:data?.url})
  }

  const updateProfileHandler = async (event) => {
    event.preventDefault();
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const {message} = await res.json()

      if(!res.ok){
        throw new Error(message)
      }
      setLoading(false)
      toast.success(message);
      navigate('/doctors/profile/me')
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  }

  const addItem = (key, item) => {
    setFormData(prevFormData => ({...prevFormData, [key]:[...prevFormData[key], item]}))
  }
  const deleteItem = (key, index) => {
    setFormData(prevFormData => ({...prevFormData, [key]:prevFormData[key].filter((_,i)=>i !== index)}))
  }
  // reusable input change function
  const handleReusableInputChangeFunc = (key, index, event) => { 
    const { name, value } = event.target;
        
    setFormData(prevFormData => {
    const updateItems = [... prevFormData[key]];
    updateItems[index] [name] = value;
    return {
        ... prevFormData, 
        [key]: updateItems,
    };
    });
   };

  const addQualification = e  => {
    e.preventDefault()
    addItem('qualifications', {
        startingDate: "", endingDate: "", degree: "", university: ""
    })
  }
  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event)
  }
  const deleteQualification = (e, index) => {
    e.preventDefault()
    deleteItem('qualifications', index)
  }
  const addExperience = e  => {
    e.preventDefault()
    addItem('experiences', {
        startingDate: "", endingDate: "", position: "", hospital: ""
    })
  }
  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event)
  }
  const deleteExperience = (e, index) => {
    e.preventDefault()
    deleteItem('experiences', index)
  }
   const addTimeSlots = e  => {
    e.preventDefault()
    addItem('timeSlots', {
        day: "", startingTime: "", endingTime: ""
    })
  }
  const handleTimeSlotsChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event)
  }
  const deleteTimeSlots = (e, index) => {
    e.preventDefault()
    deleteItem('timeSlots', index)
  }
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-headingColor text-[24px] leading-9 mb-10'>Profile Information</h2>
        <form>
              <div className="mb-5">
                <p className='form_label'>Name*</p>
                <input type="text" 
                name="name" placeholder="Full Name" 
                value={formData.name} onChange={handleInputChange}
                className="form_input" required />
              </div>
              <div className="mb-5">
              <p className='form_label'>Email*</p>
                <input type="email" 
                name="email" placeholder="Enter Your Email" 
                value={formData.email} onChange={handleInputChange}
                className="form_input" aria-readonly readOnly disabled='true' />
              </div>

              <div className="mb-5">
              <p className='form_label'>Phone*</p>
                <input type="number" 
                name="phone" placeholder="Phone Number" 
                value={formData.phone} onChange={handleInputChange}
                className="form_input" />
              </div>

              <div className="mb-5">
                <p className='form_label'>Bio*</p>
                <input type="text" 
                name="bio" placeholder="Bio" maxLength={100}
                value={formData.bio} onChange={handleInputChange}
                className="form_input" required />
              </div>

              <div className="mb-5">                
                <div className="grid grid-cols-3 gap-5 mb-7">
                    <div>
                        <p className='form_label'>Gender*</p>
                        <select name="gender" 
                            value= {formData.gender}
                            onChange={handleInputChange} 
                            className="form_input py-3">
                                <option value=''>Select</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                        </select>
                    </div>
                    <div>
                        <p className='form_label'>Specialization*</p>
                        <select name="specialization" 
                            value= {formData.specialization}
                            onChange={handleInputChange} 
                            className="form_input py-3">
                                <option value=''>Select</option>
                                <option value='surgeon'>Surgeon</option>
                                <option value='neurologist'>Neurologist</option>
                                <option value='dermatologist'>Dermatologist</option>
                        </select>
                    </div>
                    <div>
                        <p className='form_label'>Ticket Price*</p>
                        <input type="number" 
                        name="ticketPrice" placeholder="100"
                        value={formData.ticketPrice} onChange={handleInputChange}
                        className="form_input" required />
                    </div>
                </div>
              </div>

              <div className='mb-5'>
                <p className='form_label'>Qualification*</p>
                {formData.qualifications?.map((item, index) => <div key={index}>
                    <div>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className='form_label'>Starting Date*</p>
                                <input type="date" 
                                name="startingDate" onChange={e => handleQualificationChange(e, index)}
                                value={item.startingDate}
                                className="form_input" />
                            </div>
                            <div>
                                <p className='form_label'>Ending Date*</p>
                                <input type="date" 
                                name="endingDate" onChange={e => handleQualificationChange(e, index)}
                                value={item.endingDate}
                                className="form_input" />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-5 mt-5'>
                            <div>
                                <p className='form_label'>Degree*</p>
                                <input type="text"  onChange={e => handleQualificationChange(e, index)}
                                name="degree" placeholder="Degree"
                                value={item.degree}
                                className="form_input" />
                            </div>
                            <div>
                                <p className='form_label'>University*</p>
                                <input type="text" onChange={e => handleQualificationChange(e, index)}
                                name="university" placeholder="University"
                                value={item.university}
                                className="form_input" />
                            </div>
                        </div>
                        <button onClick={e => deleteQualification(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-7 cursor-pointer'><AiOutlineDelete /></button>
                    </div>
                </div>)}
                <button onClick={addQualification} className='bg-black px-4 py-2 rounded text-white h-fit'>Add Qualification</button>
              </div>

              <div className='mb-5'>
                <p className='form_label'>Experience*</p>
                {formData.experiences?.map((item, index) => <div key={index}>
                    <div>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className='form_label'>Starting Date*</p>
                                <input type="date" onChange={e => handleExperienceChange(e, index)}
                                name="startingDate"
                                value={item.startingDate}
                                className="form_input" />
                            </div>
                            <div>
                                <p className='form_label'>Ending Date*</p>
                                <input type="date" onChange={e => handleExperienceChange(e, index)}
                                name="endingDate"
                                value={item.endingDate}
                                className="form_input" />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-5 mt-5'>
                            <div>
                                <p className='form_label'>Position*</p>
                                <input type="text" onChange={e => handleExperienceChange(e, index)}
                                name="position" placeholder="Position"
                                value={item.position}
                                className="form_input" />
                            </div>
                            <div>
                                <p className='form_label'>Hospital*</p>
                                <input type="text" onChange={e => handleExperienceChange(e, index)}
                                name="hospital" placeholder="Hospital"
                                value={item.hospital}
                                className="form_input" />
                            </div>
                        </div>
                        <button onClick={e => deleteExperience(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-7 cursor-pointer'><AiOutlineDelete /></button>
                    </div>
                </div>)}
                <button onClick={addExperience} className='bg-black px-4 py-2 rounded text-white h-fit'>Add Experience</button>
              </div>

              <div className='mb-5'>
                <p className='form_label'>Time Slots*</p>
                {formData.timeSlots?.map((item, index) => <div key={index}>
                    <div>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-7'>
                            <div>
                                <p className='form_label'>Day*</p>
                                <select className='form_input py-4' name='day' value={item.day} onChange={e => handleTimeSlotsChange(e, index)}>
                                    <option value="">Select</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                </select>
                            </div>
                            <div>
                                <p className='form_label'>Starting Time*</p>
                                <input type="time" onChange={e => handleTimeSlotsChange(e, index)}
                                name="startingTime"
                                value={item.startingTime}
                                className="form_input" />
                            </div>
                            <div>
                                <p className='form_label'>Ending Time*</p>
                                <input type="time" onChange={e => handleTimeSlotsChange(e, index)}
                                name="endingTime"
                                value={item.endingTime}
                                className="form_input" />
                            </div>
                            <div className='flex items-center'>
                                <button onClick={e => deleteTimeSlots(e, index)} className='bg-red-600 p-2 mt-6 rounded-full text-white text-[18px] cursor-pointer'><AiOutlineDelete /></button>
                            </div>
                        </div>
                    </div>
                </div>)}
                <button onClick={addTimeSlots} className='bg-black px-4 py-2 rounded text-white h-fit'>Add TimeSlot</button>
              </div>

              <div className='mb-5'>
                <p className='form_label'>About*</p>
                <textarea name="about"
                rows={5} placeholder='Write about yourself'
                value={formData.about} onChange={handleInputChange}
                className="form_input"></textarea>
              </div>

              <div className="mb-5 flex items-center gap-3">
                {formData.photo && <figure className='flex items-center justify-center w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor'>
                  <img src={formData.photo} alt='' className='w-full h-full rounded-full object-cover' />
                </figure>}
                <div className="relative w-[130px] h-[50px]">
                  <input
                  type="file"
                  name="photo"
                  id="customFile"
                  onChange={handleFileInputChange}
                  accept = ".jpg, .png"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                  <label htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex 
                    items-center justify-center px-3 py-2 text-[15px] leading-6 overflow-hidden bg-[#0066ff46]
                     text-headingColor font-semibold rounded-lg truncate cursor-pointer">
                    {selectedFile ? selectedFile.file : "Upload Photo" }
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button disabled = {loading && true} type="submit" onClick={updateProfileHandler} 
                className='px-4 py-3 w-full bg-primaryColor text-white rounded-lg text-[18px] leading-7'>
                  {loading ? <HashLoader size={25} color='#ffffff' /> : 'Update Profile'}
                </button>
              </div>
            </form>
    </div>
  )
}

export default Profile