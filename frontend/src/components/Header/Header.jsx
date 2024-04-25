import {useEffect, useRef, useContext} from 'react'
import logo from '../../assets/images/logo.png'
import {Link, NavLink} from 'react-router-dom'
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext';

const navLinks = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/doctors',
        display: 'Find a Doctor'
    },
    {
        path: '/services',
        display: 'Services'
    },
    {
        path: '/contact',
        display: 'Contact'
    },
]

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const{ user, role, token} = useContext(authContext)

    const handleStickyHeader = () => {
        window.addEventListener('scroll', () => {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add('sticky_header');
            }
            else{
                headerRef.current.classList.remove('sticky_header');
            }
        })
    }

    useEffect(() => {
        handleStickyHeader();

        return () => window.removeEventListener('scroll', handleStickyHeader)
    })

    const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

    return (
        <header className='header flex items-center' ref={headerRef}>
            <div className='container'>
                <div className='flex items-center justify-between'>
                    {/* ============LOGO============ */}
                    <div className='logo'>
                        <Link to='/'><img src={logo} alt='logo' /></Link>
                    </div>
                    {/* ============Menu============ */}
                    <div className='navigation' ref={menuRef} onClick={toggleMenu}>
                        <ul className='menu flex items-center gap-11'>
                            {
                                navLinks.map((link, index) => 
                                <li key={index}>
                                    <NavLink to= {link.path} className={navClass => navClass.isActive ? 
                                        'text-primaryColor text-[16px] leading-7 font-[600]' : 
                                        'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'}>
                                        {link.display}
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                    {/* ============NAV RIGHT============ */}
                    <div className='flex items-center gap-4'>
                        {token && user ? (
                            <div className="flex items-center">
                            <Link to={role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'} className="flex items-center">
                                <figure className='w-9 h-9 rounded-full cursor-pointer mr-2 overflow-hidden'>
                                <img src={user?.photo} className='rounded-full w-full h-full object-cover' alt='' />
                                </figure>
                                <h2 className="text-lg font-semibold text-headingColor">{user?.name}</h2>
                            </Link>
                            </div>
                        ) : (
                            <Link to='/login'>
                            <button 
                                className='py-2 px-6 bg-primaryColor text-white font-semibold h-11 flex items-center justify-center rounded-full'>
                                Login
                            </button>
                            </Link>
                        )}
                        
                        <span className='md:hidden' onClick={toggleMenu}>
                            <BiMenu className='h-6 w-6 cursor-pointer' />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header