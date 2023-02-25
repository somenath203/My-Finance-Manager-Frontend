import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { showLoading, hideLoading } from './../redux/alertSlice';
import DefaultLayout from './../components/DefaultLayout';


const UserProfile = () => {

    const dispatch = useDispatch();

    const [userFullName, setUserFullName] = useState();
    const [userEmail, setUserEmail] = useState();

    const loadUserProfile = async () => {

        try {

            dispatch(showLoading());

            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/getUserProfile`, {}, {

                headers: {

                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            });

            setUserFullName(data?.data?.fullname);

            setUserEmail(data?.data?.email)

            dispatch(hideLoading());

        } catch (error) {

            dispatch(hideLoading());

            message.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        loadUserProfile();
    }, []);

    return (
        <DefaultLayout>

            <div className="min-h-screen flex justify-center bg-gradient-to-bl from-violet-100 to-violet-200">

                <div className="mt-28 lg:mt-40 w-11/12 lg:w-8/12">

                    <p className="text-center text-violet-500 text-3xl font-bold mb-10">Your Profile</p>

                    <div className="w-full px-8 py-10 bg-gradient-to-bl from-purple-400 to-purple-600 rounded-lg shadow-xl flex flex-col justify-center items-center gap-5">
                        <p className="text-center text-xl lg:text-2xl font-bold text-slate-200 font-sans tracking-wider">Fullname: {userFullName}</p>
                        <p className="text-center text-xl lg:text-2xl font-bold text-slate-200 font-sans tracking-wider">Email: {userEmail}</p>
                    </div>

                </div>

            </div>

        </DefaultLayout>
    )
};

export default UserProfile;