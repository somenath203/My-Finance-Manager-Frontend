import { Form, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

import DefaultLayout from "../components/DefaultLayout";
import { showLoading, hideLoading } from './../redux/alertSlice';


const Savings = () => {

  const dispatch = useDispatch();

  const onSubmitForm = async (savingAmount) => {

    try {

      dispatch(showLoading());

      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/savings`, savingAmount, {

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

          <p className="text-4xl font-bold text-violet-500 text-center mb-14 uppercase tracking-wider">Savings</p>

          <Form layout="vertical" className="flex flex-col" onFinish={onSubmitForm}>

            <Form.Item name="saving" label="Saving Amount" rules={[{ required: true, message: 'saving amount is required' }]}>
              <input type="number" className="w-full p-4 border-none outline-none shadow-lg rounded-lg" placeholder="enter your saving amount" />
            </Form.Item>

            <button className="w-full p-4 mt-3 rounded-lg outline-none border-none bg-violet-500 text-white text-xl tracking-wider uppercase font-mono font-bold flex items-center justify-center shadow-lg transition-all duration-500 hover:text-white hover:bg-violet-700"><span>SAVE</span></button>

          </Form>

        </div>

      </div>

    </DefaultLayout>
  )
}

export default Savings;