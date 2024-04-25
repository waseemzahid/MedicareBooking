import { useContext, useState } from 'react'
import { authContext } from '../../context/AuthContext'
import MyBookings from './MyBookings'
import Profile from './Profile'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL, token } from '../../config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAccount = () => {
    const {dispatch} = useContext(authContext)
    const [tab, setTab] = useState('bookings')
    const navigate = useNavigate()
    const {data:userData, loading, error} = useGetProfile(`${BASE_URL}/users/profile/me`)
    console.log(userData, 'userdata');

    const handleLogout = () => {
        dispatch({type:'LOGOUT'})
    }
    const deleteProfileHandler = async (event) => {
        event.preventDefault();
      
        try {
          const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
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
    <section>
    <div className="px-5 mx-auto max-w-[1170px]">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error}/>}
        {
        !loading && !error &&
        <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
                <div className="flex items-center justify-center">
                    <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                        <img src={userData.photo} alt="" className='w-full h-full rounded-full' />
                    </figure>
                </div>
                <div className='mt-4 text-center'>
                    <h3 className='text-[18px] leading-7 font-bold text-headingColor'>{userData.name}</h3>
                    <p className='text-textColor text-[15px] leading-6 font-medium'>{userData.email}</p>
                    <p className='text-textColor text-[15px] leading-6 font-medium'>Blood Type: 
                    <span className='ml-2 text-headingColor leading-8 text-[20px]'>{userData.bloodType}</span></p>
                </div>

                <div className='mt-[50px] md:mt-[100px]'>
                    <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
                    <button onClick={deleteProfileHandler} className='w-full bg-red-600 p-3 mt-4 text-[16px] leading-7 rounded-md text-white'>Delete Account</button>
                </div>
            </div>

            <div className='md:col-span-2 md:px-[30px]'>
                <div>
                    <button onClick={() => setTab('bookings')} className={`${tab==='bookings' && 'bg-primaryColor text-white font-normal'} p-2 px-5 mr-5 rounded-md text-headingColor font-semibold
                     text-[16px] leading-7 border border-solid border-primaryColor`}>
                        My Bookings
                    </button>
                    <button onClick={() => setTab('settings')} className={`${tab==='settings' && 'bg-primaryColor text-white font-normal'} p-2 px-5 rounded-md text-headingColor font-semibold
                     text-[16px] leading-7 border border-solid border-primaryColor`}>
                        Profile Setting
                    </button>
                </div>
                {
                    tab === 'bookings' && <MyBookings />
                }
                {
                    tab === 'settings' && <Profile user={userData} />
                }
            </div>
        </div>
        }
    </div>
    </section>
  )
}

export default MyAccount