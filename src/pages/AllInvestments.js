import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import DefaultLayout from './../components/DefaultLayout';
import { showLoading, hideLoading } from './../redux/alertSlice';


const AllInvestments = () => {

    const [allInvestments, setAllInvestments] = useState([]);


    const dispatch = useDispatch();


    const fetchAllInvestments = async () => {

        try {

            dispatch(showLoading());

            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/allInvestments`, {}, {

                headers: {

                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            });

            dispatch(hideLoading());

            message.success(data?.message)

            setAllInvestments(data?.data);

        } catch (error) {

            dispatch(hideLoading());

            message.error(error?.response?.data?.message);

        }

    };

    useEffect(() => {
        fetchAllInvestments();
    }, []);

    return (
        <DefaultLayout>
            <div className='min-h-screen flex justify-center bg-gradient-to-bl from-violet-100 to-violet-200'>

                <div className='mt-28 w-11/12'>

                    <p className='mb-14 text-center text-3xl font-sans tracking-wider font-bold text-violet-500'>Your Investments</p>

                    <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-12'>

                        {allInvestments.map((investment) => (
                            <div className='flex items-center justify-center flex-col gap-6 px-24 py-20 bg-gradient-to-bl from-violet-400 to-violet-500 rounded-lg shadow-2xl text-white mb-6' key={uuidv4()}>

                                <p className='text-lg lg:text-xl text-center font-sans font-semibold tracking-wider'>Expenditure Amount: Rs. {investment.investmentAmount ? investment.investmentAmount : 0}</p>

                                <p className='text-lg lg:text-xl text-center font-sans font-semibold tracking-wider'>Company on which expenditure is done:  {investment.companyOnWhichInvested ? investment.companyOnWhichInvested : 'No Company Name Available'}</p>

                            </div>
                        ))}

                    </div>


                </div>

            </div>
        </DefaultLayout >
    )
};

export default AllInvestments;