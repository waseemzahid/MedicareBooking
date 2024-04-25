import { Link } from 'react-router-dom'
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import featureImg from '../assets/images/feature-img.png'
import faqImg from '../assets/images/faq-img.png'
import { BsArrowRight } from "react-icons/bs";
import About from '../components/About/About'
import ServiceList from '../components/Services/ServiceList'
import DoctorList from '../components/Doctors/DoctorList'
import FaqList from '../components/Faq/FaqList'
import Testimonial from '../components/Testimonial/Testimonial'

const Home = () => {
  return <>
  {/* ============Hero Section============ */}
    <section className='hero_section pt-[60px] 2xl:h-[800px]'>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
          {/* ============Hero Content============ */}
          <div>
            <div className='lg:w-[570px]'>
              <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>We help patients live a healthy, longer life.</h1>
              <p className='text_para'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
              <button className='btn'>Request an Appointment</button>
            </div>
            {/* ============Hero Counter============ */}
            <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row gap-5 lg:gap-7'>
              <div>
              <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>30+</h2>
              <span className='w-[100px] h-2 bg-yellowColor block rounded-full mt-[-14px]'></span>
              <p className='text_para'>Years of experience</p>
              </div>

              <div>
              <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>15+</h2>
              <span className='w-[100px] h-2 bg-purpleColor block rounded-full mt-[-14px]'></span>
              <p className='text_para'>Clinic Location</p>
              </div>

              <div>
              <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>100%</h2>
              <span className='w-[100px] h-2 bg-irisBlueColor block rounded-full mt-[-14px]'></span>
              <p className='text_para'>Patient Satisfaction</p>
              </div>
            </div>
          </div>
          {/* ============Hero Image============ */}
          <div className='flex gap-[30px] justify-end'>
            <div>
              <img className='w-full' src={heroImg01} alt='' />
            </div>
            <div className='mt-[30px]'>
              <img className='w-full mb-[30px]' src={heroImg02} alt='' />
              <img className='w-full' src={heroImg03} alt='' />
            </div>
          </div>

        </div>
      </div>
    </section>
  {/* ============Hero Section End=========== */}
  {/* ============Services Section============ */}
    <section>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>Provided you the best medical services</h2>
          <p className='text_para text-center'>World-class care for everyone. Our health system offers unmatched, expert health care</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px">
          <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Doctor
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the client.
                </p>
                <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex 
                items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
          </div>
          <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Location
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the client.
                </p>
                <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex 
                items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
              </Link>
              </div>
          </div>
          <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Book Appointment
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the client.
                </p>
                <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex 
                items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
              </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  {/* ============Services Section End============ */}
  <About />
  {/* ============Services Section============ */}
    <section>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>Our medical services</h2>
          <p className='text_para text-center'>World-class care for everyone. Our health system offers unmatched, expert health care</p>
        </div>
        <ServiceList />
        </div>
    </section>
  {/* ============Services Section End============ */}
  {/* ============Feature Section============ */}
    <section>
      <div className='container'>
        <div className='flex items-center justify-between flex-col lg:flex-row'>
          <div className='xl:w-[670px]'>
            <h2 className='heading'>Get your virtual treatment <br /> anytime.</h2>
            <ul className="pl-4">
              <li className="text_para">1. Schedule the appointment directly</li>
              <li className="text_para">2. Search for your physicians here, and contact their office</li>
              <li className="text_para">3. View your physicians who are accepting new patients, use the online scheduling tool to select an appointment time </li>
            </ul>
            <Link to='/'>
                <button className='btn'>Learn More</button>
            </Link>
          </div>
          {/* ============Feature Img============ */}
          <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
            <img src={featureImg} alt='' className='w-3/4' />
          </div>
        </div>
      </div>
    </section>
  {/* ============Feature Section End============ */}
  {/* ============Doctors Section============ */}
  <section>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>Our great doctors</h2>
          <p className='text_para text-center'>World-class care for everyone. Our health system offers unmatched, expert health care</p>
        </div>
        <DoctorList />
        </div>
    </section>
  {/* ============Doctors Section End============ */}
  {/* ============FAQ's Section============ */}
  <section>
    <div className='container'>
      <div className='flex justify-between gap-[50px] lg:gap-6'>
        <div className='w-1/2 hidden md:block'>
          <img src={faqImg} alt='' />
        </div>
        <div className='w-full md:w-1/2'>
          <h2 className='heading'>Most questions by our beloved patients</h2>
          <FaqList />
        </div>
      </div>
    </div>
  </section>
  {/* ============FAQ's Section End============ */}
  {/* ============Testimonials Section============ */}
  <section>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>What our patients say</h2>
          <p className='text_para text-center'>World-class care for everyone. Our health system offers unmatched, expert health care</p>
        </div>
        <Testimonial />
        </div>
    </section>
  {/* ============Testimonials Section End============ */}
  </>
}

export default Home