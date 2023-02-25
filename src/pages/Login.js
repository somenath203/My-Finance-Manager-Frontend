import { Form, message } from "antd";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import DefaultLayout from "../components/DefaultLayout";
import { showLoading, hideLoading } from './../redux/alertSlice';


const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmitForm = async (formDetails) => {

    try {

      dispatch(showLoading());

      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/login`, formDetails);

      localStorage.setItem('token', data.data.token);

      dispatch(hideLoading());

      message.success(data?.message);

      navigate('/home');

    } catch (error) {

      dispatch(hideLoading());

      message.error(error?.response?.data?.message);

    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen flex justify-center bg-gradient-to-bl from-violet-100 to-violet-200">

        <div className="mt-20 flex flex-col w-10/12 lg:w-5/12">

          <p className="text-violet-500 tracking-wider text-3xl uppercase font-bold text-center mb-14">LOGIN</p>

          <Form layout="vertical" className="flex flex-col" onFinish={onSubmitForm}>

            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'please enter your email' }]}>
              <input type="email" className="w-full p-4 border-none outline-none shadow-lg rounded-lg" placeholder="enter your email address" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'please enter your password' }]}>
              <input type="password" className="w-full p-4 border-none outline-none shadow-lg rounded-lg" placeholder="enter a password" />
            </Form.Item>

            <button className="w-full p-4 mt-3 rounded-lg outline-none border-none bg-violet-500 text-white text-xl tracking-wider uppercase font-mono font-bold flex items-center justify-center shadow-lg transition-all duration-500 hover:text-white hover:bg-violet-700"><span>LOGIN</span></button>

          </Form>

          <NavLink to='/register'>
            <p className="text-center mt-9 text-xl text-violet-800 font-semibold">Don't have an account? Register</p>
          </NavLink>

        </div>

      </div>
    </DefaultLayout>
  )
};

export default Login;