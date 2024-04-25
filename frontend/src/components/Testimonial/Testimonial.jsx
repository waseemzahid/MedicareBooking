import {Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import patientAvatar from '../../assets/images/patient-avatar.png'
import {HiStar} from 'react-icons/hi'

const Testimonial = () => {
  return (
    <div className='mt-[30px] lg:[55px]'>
        <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{clickable:true}} 
        breakpoints={{
            640: {
                slidesPerView: 1,
                spaceBetween:0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween:20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween:30,
            },
        }}>
            <SwiperSlide>
                <div className='py-[30px] px-5 rounded-[13px]'>
                    <div className='flex items-center gap-[13px]'>
                        <img src={patientAvatar} alt='' />
                        <div>
                            <h4 className='text-[18px] leading-7 font-semibold text-headingColor'>Shahbaz Ali</h4>
                            <div className='flex item-center gap-[2px]'>
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                            </div>
                        </div>
                    </div>
                    <p className='text-[16px] leading-7 mt-4 font-[400] text-textColor'>
                        I have taken medical services from them. They treat so well and they are provding the best medical services.
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='py-[30px] px-5 rounded-[13px]'>
                    <div className='flex items-center gap-[13px]'>
                        <img src={patientAvatar} alt='' />
                        <div>
                            <h4 className='text-[18px] leading-7 font-semibold text-headingColor'>Waseem Zahid</h4>
                            <div className='flex item-center gap-[2px]'>
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                            </div>
                        </div>
                    </div>
                    <p className='text-[16px] leading-7 mt-4 font-[400] text-textColor'>
                    I recently received medical services from them, and I must say, their treatment was exceptional.
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='py-[30px] px-5 rounded-[13px]'>
                    <div className='flex items-center gap-[13px]'>
                        <img src={patientAvatar} alt='' />
                        <div>
                            <h4 className='text-[18px] leading-7 font-semibold text-headingColor'>Nabeel Shahzad</h4>
                            <div className='flex item-center gap-[2px]'>
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                            </div>
                        </div>
                    </div>
                    <p className='text-[16px] leading-7 mt-4 font-[400] text-textColor'>
                    The level of care and attention to detail they provide is truly commendable. From the moment I stepped in, I felt welcomed and cared for.
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='py-[30px] px-5 rounded-[13px]'>
                    <div className='flex items-center gap-[13px]'>
                        <img src={patientAvatar} alt='' />
                        <div>
                            <h4 className='text-[18px] leading-7 font-semibold text-headingColor'>Junaid Ashiq</h4>
                            <div className='flex item-center gap-[2px]'>
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                            </div>
                        </div>
                    </div>
                    <p className='text-[16px] leading-7 mt-4 font-[400] text-textColor'>
                    Their dedication to providing the best medical services shines through in every interaction. I highly recommend them to anyone in need of top-notch medical care.
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='py-[30px] px-5 rounded-[13px]'>
                    <div className='flex items-center gap-[13px]'>
                        <img src={patientAvatar} alt='' />
                        <div>
                            <h4 className='text-[18px] leading-7 font-semibold text-headingColor'>Shahbaz Ali</h4>
                            <div className='flex item-center gap-[2px]'>
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                                <HiStar className='text-yellowColor w-[18px] h-5' />
                            </div>
                        </div>
                    </div>
                    <p className='text-[16px] leading-7 mt-4 font-[400] text-textColor'>
                        I have taken medical services from them. They treat so well and they are provding the best medical services.
                    </p>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default Testimonial