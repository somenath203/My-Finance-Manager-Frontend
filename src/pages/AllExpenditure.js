import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import DefaultLayout from './../components/DefaultLayout';
import { showLoading, hideLoading } from './../redux/alertSlice';


const AllExpenditure = () => {

    const [allExpenditures, setAllExpenditures] = useState([]);


    const dispatch = useDispatch();


    const fetchAllExpenditures = async () => {

        try {

            dispatch(showLoading());

            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/all-expenditure`, {}, {

                headers: {

                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            });

            dispatch(hideLoading());

            message.success(data?.message)

            setAllExpenditures(data?.data);

        } catch (error) {

            dispatch(hideLoading());

            message.error(error?.response?.data?.message);

        }

    };

    useEffect(() => {
        fetchAllExpenditures();
    }, []);

    return (
        <DefaultLayout>
            <div className='min-h-screen flex justify-center bg-gradient-to-bl from-violet-100 to-violet-200'>

                <div className='mt-28 w-11/12'>

                    <p className='mb-14 text-center text-3xl font-sans tracking-wider font-bold text-violet-500'>Your Expenditures</p>

                    <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-12'>

                        {allExpenditures.map((expenditure) => (
                            <div className='flex items-center justify-center flex-col gap-6 px-24 py-20 bg-gradient-to-bl from-violet-400 to-violet-500 rounded-lg shadow-2xl text-white mb-6' key={uuidv4()}>

                                <p className='text-lg lg:text-xl text-center font-sans font-semibold tracking-wider'>Expenditure Amount: Rs. {expenditure.expenditureAmount ? expenditure.expenditureAmount : 0}</p>

                                <p className='text-lg lg:text-xl text-center font-sans font-semibold tracking-wider'>Item on which expenditure is done:  {expenditure.itemName ? expenditure.itemName : 'No Item Available'}</p>

                            </div>
                        ))}

                    </div>


                </div>

            </div>
        </DefaultLayout >
    )
};

export default AllExpenditure;