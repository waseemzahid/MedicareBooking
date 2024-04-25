import signupImg from '../assets/images/signup.gif'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import uploadImageToCloudinary from '../../utils/uploadCloudinary'
import { BASE_URL } from '../config'
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const Signup = () => {
  const [selectedFile, setSeletecFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: selectedFile,
    gender: '',
    role: 'patient'
  })

  const navigate = useNavigate();
  const handleInputChange = e=> {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    //later we use cloudinary to upload
    const data = await uploadImageToCloudinary(file);
    setPreviewUrl(data.url)
    setSeletecFile(data.url)
    setFormData({...formData, photo:data.url})
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const {message} = await res.json()

      if(!res.ok){
        throw new Error(message)
      }
      setLoading(false)
      toast.success(message);
      navigate('/login')
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ============Img Box============ */}
          <div className="hidden lg:block rounded-l-lg bg-primaryColor">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className='w-full rounded-l-lg' />
            </figure>
          </div>
          {/* ============Sign Up Form============ */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-[22px] text-headingColor font-bold leading-9 mb-10">
              Create An <span className="text-primaryColor">Account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input type="text" 
                name="name" placeholder="Full Name" 
                value={formData.name} onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid
                border-[#0066ff34] focus:outline-none outline-border-b-primaryColor 
                text-[16px] leading-7 text-headingColor placeholder:text-textColor" required />
              </div>
              <div className="mb-5">
                <input type="email" 
                name="email" placeholder="Enter Your Email" 
                value={formData.email} onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid
                border-[#0066ff34] focus:outline-none outline-border-b-primaryColor 
                text-[16px] leading-7 text-headingColor placeholder:text-textColor" required />
              </div>
              <div className="mb-5">
                <input type="password" 
                name="password" placeholder="Password" 
                value={formData.password} onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid
                border-[#0066ff34] focus:outline-none outline-border-b-primaryColor 
                text-[16px] leading-7 text-headingColor placeholder:text-textColor" required />
              </div>

              {/* <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold leading-7 text-[16px]">Are you a:</label>
                <select name="role" className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                  <option value='patient'>Patient</option>
                  <option value='doctor'>Doctor</option>
                </select>

                <label className="text-headingColor font-bold leading-7 text-[16px]">Gender</label>
                <select name="gender" className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                  <option value=''>Select</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div> */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center">
                  <label className="text-headingColor font-bold text-lg mr-4">Are you a:</label>
                  <select name="role" 
                    value= {formData.role} onChange={handleInputChange}
                    className="text-textColor font-semibold text-lg px-3 py-2 border border-[#0066ff34] rounded-md focus:outline-none">
                    <option value='patient'>Patient</option>
                    <option value='doctor'>Doctor</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <label className="text-headingColor font-bold text-lg mr-4">Gender:</label>
                  <select name="gender" 
                    value= {formData.gender} onChange={handleInputChange} 
                    className="text-textColor font-semibold text-lg px-3 py-2 border border-[#0066ff34] rounded-md focus:outline-none">
                    <option value=''>Select</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div>
              </div>

              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className='flex items-center justify-center w-16 h-16 rounded-full border-2 border-solid border-primaryColor overflow-hidden'>
                    <img src={previewUrl} alt='Uploaded' className='w-full h-full object-cover' />
                  </figure>
                )}
                <div className="relative w-32 h-12">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-3 py-2 text-sm leading-6 overflow-hidden bg-blue-300 text-blue-900 font-semibold rounded-lg cursor-pointer">
                    Upload Photo
                  </label>
                </div>
              </div>
              
              <div className="mt-7">
                <button disabled = {loading && true} type="submit" 
                className='px-4 py-3 w-full bg-primaryColor text-white rounded-lg text-[18px] leading-7'>
                  {loading ? <HashLoader size={25} color='#ffffff' /> : 'Sign Up'}
                </button>
              </div>
              <p className="text-center mt-5 text-textColor">
                Already have an account? <Link to="/login" className="text-primaryColor ml-1 font-semibold">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup