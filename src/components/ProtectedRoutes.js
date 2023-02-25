import { message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from './../redux/userSlice';


const ProtectedRoutes = ({ children }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const getAuhenticatedUserData = async () => {

        try {

            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/getUserProfile`, {}, {

                headers: {

                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            });

            dispatch(setUser(data.data));

        } catch (error) {

            localStorage.removeItem('token');

            navigate('/login');

        }

    };

    useEffect(() => {
        getAuhenticatedUserData();
    }, []);

    return (
        <>
            {children}
        </>
    )

};


export default ProtectedRoutes;