import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import DefaultLayout from './../components/DefaultLayout';
import { showLoading, hideLoading } from './../redux/alertSlice';

const Home = () => {

  const dispatch = useDispatch();

  const [savingsTotal, setSavingsTotal] = useState();
  const [investmentTotal, setInvestmentTotal] = useState();
  const [expenditureTotal, setExpenditureTotal] = useState();

  const expenseData = [
    { title: 'Savings', total: savingsTotal },
    { title: 'Investments', total: investmentTotal },
    { title: 'Expenditures', total: expenditureTotal },
  ];

  const totalSavings = async () => {

    try {

      dispatch(showLoading());

      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/totalSavings`, {}, {

        headers: {

          Authorization: `Bearer ${localStorage.getItem('token')}`

        }

      });

      dispatch(hideLoading());

      setSavingsTotal(data?.data);

    } catch (error) {

      dispatch(hideLoading());

    }
  };

  const totalInvestmentAmount = async () => {

    try {

      dispatch(showLoading());

      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/totalInvestment`, {}, {

        headers: {

          Authorization: `Bearer ${localStorage.getItem('token')}`

        }

      });

      dispatch(hideLoading());

      setInvestmentTotal(data?.data);

    } catch (error) {

      dispatch(hideLoading());

    }
  };

  const totalExpenditureAmount = async () => {

    try {

      dispatch(showLoading());

      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/totalExpenditure`, {}, {

        headers: {

          Authorization: `Bearer ${localStorage.getItem('token')}`

        }

      });

      dispatch(hideLoading());

      setExpenditureTotal(data?.data);

    } catch (error) {

      dispatch(hideLoading());

    }
  }

  useEffect(() => {

    totalSavings();
    totalInvestmentAmount();
    totalExpenditureAmount();

  }, []);


  return (
    <DefaultLayout>

      <div className='min-h-screen flex justify-center bg-gradient-to-bl from-violet-100 to-violet-200'>

        <div className='mt-28 w-5/6'>

          <p className='mb-14 text-center text-3xl font-sans tracking-wider font-bold text-violet-500'>Your Expenses Details</p>

          <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-12'>

            {expenseData.map((expense) => (
              <div className='flex items-center justify-center flex-col gap-6 px-24 py-20 bg-gradient-to-bl from-violet-400 to-violet-500 rounded-lg shadow-2xl text-white mb-6' key={uuidv4()}>

                <p className='text-xl lg:text-2xl text-center font-sans font-semibold tracking-wider'>Total {expense.title}</p>

                <p className='text-2xl lg:text-4xl text-center font-sans font-bold tracking-wider'>Rs. {expense.total ? expense.total : 0}</p>

              </div>
            ))}

          </div>

          {savingsTotal === investmentTotal && investmentTotal === expenditureTotal && expenditureTotal === savingsTotal ? <></> : savingsTotal < expenditureTotal || savingsTotal < investmentTotal || savingsTotal < (investmentTotal + expenditureTotal) ? <div className='flex items-center justify-center flex-col text-center gap-5 lg:flex-row lg:gap-3 text-2xl mt-20 mb-10 p-6 bg-yellow-100 rounded-xl shadow-xl font-semibold tracking-wider'>
            <i className="ri-alarm-warning-line text-5xl"></i> <span>WARNING: Your savings are less than your expenditures and investments. Spend your money wisely.</span>
          </div> : <div className='flex items-center justify-center gap-5 flex-col text-center lg:flex-row lg:gap-3 text-2xl mt-20 mb-10 p-6 bg-green-100 rounded-xl shadow-xl font-semibold tracking-wider'>
            <i className="ri-magic-line text-5xl"></i> <span>GREAT!! Your savings are greater than your expenditure and investments.</span>
          </div>}

        </div>

      </div>

    </DefaultLayout>
  )
};

export default Home;
