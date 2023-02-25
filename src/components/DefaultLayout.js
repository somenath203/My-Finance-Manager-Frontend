import Tippy from "@tippyjs/react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";


const DefaultLayout = ({ children }) => {


    const navigate = useNavigate();


    const { userData } = useSelector((state) => state.userAllData);


    const logout = () => {

        localStorage.removeItem('token');

        message.success('you have been logged out successfully');

        navigate('/login');

    };


    return (
        <>
            <header className="text-center lg:flex lg:justify-between items-center p-8 bg-violet-100 shadow-xl">

                <p className="text-3xl text-violet-600 font-sans font-bold tracking-wider">My Expense Manager</p>

                <nav className="mt-5 lg:flex lg:items-center lg:justify-center lg:gap-6 text-2xl tracking-wider text-violet-800 font-sans font-semibold">

                    {localStorage.getItem('token') ? <>

                        <Tippy content='Home'>
                            <NavLink className="transition-all duration-500 hover:border-b-8 hover:border-violet-300" to='/home'>
                                <p className="mb-3">Home</p>
                            </NavLink>
                        </Tippy>

                        <Tippy content='Add Savings'>
                            <NavLink className="transition-all duration-500 hover:border-b-8 hover:border-violet-300" to='/savings'>
                                <p className="mb-3">Savings</p>
                            </NavLink>
                        </Tippy>

                        <Tippy content='Add Expenditures'>
                            <NavLink className="transition-all duration-500 hover:border-b-8 hover:border-violet-300" to='/expenditure'>
                                <p className="mb-3">Expenditures</p>
                            </NavLink>
                        </Tippy>

                        <Tippy content='Add Investments'>
                            <NavLink className="transition-all duration-500 hover:border-b-8 hover:border-violet-300" to='/investment'>
                                <p className="mb-3">Investments</p>
                            </NavLink>
                        </Tippy>

                        <Tippy content=<span>{userData?.fullname}'s profile</span>>
                            <NavLink className="transition-all duration-500 hover:border-b-8 hover:border-violet-300" to='/user-profile'>
                                <p className="mb-3">{userData?.fullname.split(' ')[0]}</p>
                            </NavLink>
                        </Tippy>

                        <Tippy content='Logout'>
                            <div className="transition-all duration-500 hover:border-b-8 hover:border-violet-300 cursor-pointer" onClick={logout}>
                                <p className="mb-3">Logout</p>
                            </div>
                        </Tippy>
                    </> : <></>}

                </nav>

            </header>

            {children}
        </>
    )
};

export default DefaultLayout;