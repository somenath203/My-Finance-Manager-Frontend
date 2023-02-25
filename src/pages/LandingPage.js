import { NavLink } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';


const LandingPage = () => {
    return (
        <div className="min-h-screen flex items-center text-center justify-center flex-col gap-12 bg-gradient-to-bl from-violet-200 to-violet-300">

            <p className="text-4xl tracking-wide font-mono font-bold">

                <Typewriter
                    words={['Personal Finance Manager', 'Manage your finance like never before']}
                    loop={5}
                    cursor
                    cursorStyle='|'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1300}
                />

            </p>

            <NavLink to='/register'>
                <button className='py-4 px-12 bg-violet-600 text-2xl font-semibold text-white tracking-wide border-none outline-none shadow-lg rounded-lg'>Get Started</button>
            </NavLink>

        </div>
    )
};

export default LandingPage;
