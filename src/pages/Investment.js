import Tippy from "@tippyjs/react";
import { Form, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import DefaultLayout from "../components/DefaultLayout";
import { showLoading, hideLoading } from './../redux/alertSlice';


const Investment = () => {

    const dispatch = useDispatch();

    const onSubmitForm = async (investmentDetails) => {

        try {

            dispatch(showLoading());

            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/investment`, investmentDetails, {

                headers: {

                    Authorization: `Bearer ${localStorage.getItem('token')}`

                }

            });

            dispatch(hideLoading());

            message.success(data.message);

        } catch (error) {

            dispatch(hideLoading());

            message.error(error.response.data.message);

        }
    };

    return (
        <DefaultLayout>

            <div className='min-h-screen flex justify-center bg-gradient-to-bl from-violet-100 to-violet-200'>

                <div className="mt-24 lg:mt-32 w-10/12 lg:w-3/6">

                    <p className="text-4xl font-bold text-violet-500 text-center mb-14 uppercase tracking-wider">Investments</p>

                    <Form layout="vertical" className="flex flex-col" onFinish={onSubmitForm}>

                        <Form.Item name="investmentAmount" label="Investment Amount" rules={[{ required: true, message: 'investment amount is required' }]}>
                            <input type="number" className="w-full p-4 border-none outline-none shadow-lg rounded-lg" placeholder="enter your investment amount" />
                        </Form.Item>

                        <Form.Item name="companyOnWhichInvested" label="Company on which amount is investment" rules={[{ required: true, message: 'company name is required' }]}>
                            <input type="text" className="w-full p-4 border-none outline-none shadow-lg rounded-lg" placeholder="enter the name of the company on which the investment is done" />
                        </Form.Item>

                        <button className="w-full p-4 mt-3 rounded-lg outline-none border-none bg-violet-500 text-white text-xl tracking-wider uppercase font-mono font-bold flex items-center justify-center shadow-lg transition-all duration-500 hover:text-white hover:bg-violet-700"><span>SAVE</span></button>

                    </Form>

                    <Tippy content='Click here to see all your investments'>
                        <NavLink to='/all-investments'>
                            <p className="text-center my-12 text-2xl font-sans tracking-wide text-violet-500 hover:text-violet-700 transition-all duration-500 font-semibold">Click here to see all your Investments</p>
                        </NavLink>
                    </Tippy>

                </div>

            </div>

        </DefaultLayout>
    )
}

export default Investment;