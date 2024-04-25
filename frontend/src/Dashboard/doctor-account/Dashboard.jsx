import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import Tabs from './Tabs'
import { useState } from 'react'
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from '../../pages/Doctors/DoctorAbout'
import Profile from './Profile'
import Appointments from './Appointments'

const Dashboard = () => {
  const {data, loading, error} = useGetProfile(`${BASE_URL}/doctors/profile/me`)
  const [tab, setTab] = useState('overview')
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error errMessage={error}/>}
        {
          !loading && !error &&
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} doctorData={data} />
            <div className='lg:col-span-2'>
              { data.isApproved === 'pending' && 
                <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                  <svg className='w-5 h-5 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"></path></svg>
                  <div className='ml-3 text-sm font-medium'>To get approval please complete your profile. We&apos;ll review manually and approve within 3 days</div>
                </div>
              }
              <div className='mt-8'>
                {tab==='overview' && <div>
                  <div className='flex items-center gap-5 mb-5'>
                  <figure className='w-60 h-60 border border-solid border-gray-200 rounded-lg overflow-hidden'>
                    <img src={data?.photo} alt='' className='w-full h-full object-cover' />
                  </figure>
                    <div> 
                      <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-8 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded capitalize">{data?.specialization}</span> 
                      <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{data?.name}</h3>
                      <div className='flex items-center gap-[6px]'>
                        <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                        <img src={starIcon} alt="" />{data?.averageRating}</span>
                        <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400px] text-textColor">({data?.totalRating})</span>
                      </div>
                      <p className='text_para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]'>{data?.bio}.</p>
                    </div>
                  </div>
                  <DoctorAbout name={data.name} about={data.about} qualifications={data.qualifications} 
                  experiences={data.experiences} />
                </div>}
                {tab==='appointments' && <Appointments appointments = {data.appointments} />}
                {tab==='settings' && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        }
      </div>
    </section>
    
  )
}

export default Dashboard