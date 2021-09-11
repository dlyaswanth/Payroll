/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom'
import SideBar from "./SideBar";
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
let weekDay = [
  { day: 'Monday', Check: false },
  { day: 'Tuesday', Check: false },
  { day: 'Wednesday', Check: false },
  { day: 'Thursday', Check: false },
  { day: 'Friday', Check: false },
  { day: 'Saturday', Check: false },
  { day: 'Sunday', Check: false }
];
export default function PaySchedule() {
  const refer = useRef();
  let history=useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  let setDate = '';
  const onSubmit = data => {
    let weekDays = [];
    const updatedDay = weekDay.filter((day) => {
      if (day.Check === true) weekDays.push(day.day);
      console.log()
    });
    data.day = weekDays;
    if (
      data.hoursWork === '' ||
      data.payDate === '' ||
      data.payDateFrom === ''
    ) {
      alert('Fill all the Details');
      return;
    }
    const updateDate = data.payDate
      .split('-')
      .reverse()
      .join('-');
    data.payDate = updateDate;
    const updateDateFrom = data.payDateFrom
      .split('-')
      .reverse()
      .join('-');
    data.payDateFrom = updateDateFrom;
    setDate = data.payDateFrom;
    console.log(data);
    
    const update = () => {
      return <h4>Submitted</h4>;
    };


    //api integration
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
              payDate : data.payDate,
              payRollStartFrom :data.payDateFrom,
              workdays : data.day,
              workHours: data.hoursWork
      })
  };
  fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
      .then(console.log(localStorage.getItem('company_id')))
      .then(response => response.json())
      .then (data => {
        console.log(data)
        if (!data)
        toast.error("ERROR",{autoClose:2500})
        else
        {
            toast.success(data.message,{autoClose:2500})
            window.open("/statutory","_self")
            // history.push('/statutory')
        }
      })
    //api integration

    
    update();
    return data;
  };
  return (
    <>
     <SideBar />
     <ToastContainer />
    <div className="form">
      {/* style={{ maxWidth: 680, marginLeft: 350}} */}
      <h1 className="text-light bg-dark p-4 ">Pay Schedule</h1>
      <form
        className="form-group m-5 p-2 px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>It's Time to set up your Pay Schedule</h2>
        <small className="form-text text-muted">
          tell us when and how when you pay your employees. We'll make they will
          be paid on time
        </small>
        <br />
        <label className="mt-4 mb-2" htmlFor="workWeek">
          Select Work Week <span className="text-danger ">*</span>
        </label>
        {weekDay.map((day, i) => {
          return (
            <>
              <br />
              <input
                className="form-check-input"
                key={day.day}
                type="checkbox"
                htmlFor="day"
                onChange={() => {
                  weekDay[i].Check = !weekDay[i].Check;
                }}
                name={{ day }}
                value={{ day }}
              />
              <label className="form-check-label" for="day">
                {' '}
                &nbsp; {day.day}
              </label>
            </>
          );
        })}
        <br />
        <br />
        <label htmlFor="hoursWork">
          Working Hours <span className="text-danger ">*</span>{' '}
        </label>
        <input
          className="form-control"
          {...register('hoursWork', { required: true })}
          type="hours"
          placeholder="Enter Week Hours"
          name="hoursWork"
        />
        {errors.hoursWork && (
          <p className="text-danger">*Working Hours is required.</p>
        )}
        <br />
        <label htmlFor="payDate">
          Pay Date <span className="text-danger ">*</span>{' '}
        </label>
        <input
          className="form-control"
          {...register('payDate', { required: true })}
          type="date"
          name="payDate"
        />
        {errors.payDate && <p className="text-danger">*Pay Date is required.</p>}
        <br />
        <label htmlFor="payDateFrom">
          Pay Date From <span className="text-danger ">*</span>
        </label>
        <input
          className="form-control"
          {...register('payDateFrom', { required: true })}
          type="date"
          name="payDateFrom"
        />
        {errors.payDateFrom && (
          <p className="text-danger">*Pay Date From is required.</p>
        )}
        <br />
        {/* <span className="bg-secondary text-light p-1 rounded ">
          Salary for the month of {setDate}
        </span> */}
        {/* <br />
        <br /> */}
        <button
          className="form-control btn btn2 btn-primary"
          type="submit"
          value="Save & Continue →"
        >
          Save & Continue →
        </button>
      </form>
    </div>
    </>
  );
}