/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { BiMenu } from 'react-icons/bi'
import { authContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL, token } from '../../config'

const Tabs = ({tab, setTab, doctorData}) => {
    const {dispatch} = useContext(authContext)
    const navigate = useNavigate()
    console.log(doctorData);

    const handleLogout = () => {
        dispatch({type:'LOGOUT'})
        navigate('/')
    }

    const deleteProfileHandler = async (event) => {
        event.preventDefault();
      
        try {
          const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
      
          const { message } = await res.json();
      
          if (!res.ok) {
            throw new Error(message);
          }
          toast.success(message);
          dispatch({type:'LOGOUT'})
          navigate('/')
        } catch (err) {
          toast.error(err.message);
        }
    }
    
  return (
    <div>
        <span className='lg:hidden'>
            <BiMenu className="w-6 h-6 cursor-pointer"></BiMenu>
        </span>
        <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
            <button
            onClick={() => setTab('overview')} 
            className={`${tab==='overview' ? 'bg-indigo-100 text-primaryColor' : 
            'bg-transparent text-headingColor'} 
            w-full btn mt-0 rounded-md`}>
                Overview
            </button>
            <button
            onClick={() => setTab('appointments')}  
            className={`${tab==='appointments' ? 'bg-indigo-100 text-primaryColor' : 
            'bg-transparent text-headingColor'} 
            w-full btn mt-0 rounded-md`}>
                Appointments
            </button>
            <button
            onClick={() => setTab('settings')}  
            className={`${tab==='settings' ? 'bg-indigo-100 text-primaryColor' : 
            'bg-transparent text-headingColor'} 
            w-full btn mt-0 rounded-md`}>
                Profile
            </button>
            <div className='mt-[100px] w-full'>
                <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
                <button onClick={deleteProfileHandler} className='w-full bg-red-600 p-3 mt-4 text-[16px] leading-7 rounded-md text-white'>Delete Account</button>
            </div>
        </div>
    </div>
  )
}

export default Tabs