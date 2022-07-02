import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import "react-phone-number-input/style.css";

const AddBillOnModal = ({ setForModalPopUp, forModalPopUp, refetch, setaddmodalPopUpSuccesMessage, addmodalPopUpSuccesMessage, setReLoadChecked }) => {

    const { register, formState: { errors }, handleSubmit, control, reset } = useForm();
    const [addtoggle, setToggle] = useState(true);

    const onSubmit = async data => {
        // console.log(data);
        const bill_info = {
            full_name: data.name,
            email: data.email,
            paid_amount: parseFloat(data.amount),
            phone: data.phone
        }
        await fetch(`https://dry-chamber-27826.herokuapp.com/add_billing`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            },
            body: JSON.stringify(bill_info)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    // console.log('successfully added in db');
                    setReLoadChecked(true);
                    reset();
                    setToggle(false);
                    setaddmodalPopUpSuccesMessage(false);
                } else {
                    // console.log("failed to added in db");
                }
                // console.log("reuslt line 31 : ", inserted)
            })
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {/* modal head Line */}
                    <div className='flex justify-between items-center'>
                        <h3 className="font-bold text-xl text-primary text-center capitalize">Add Billing information! {forModalPopUp}</h3>
                        {/* modal close section */}
                        <div className="modal-action mt-[-3px]">
                            <label htmlFor="my-modal-6" className="btn btn-primary btn-circle btn-outline text-bold">X</label>
                        </div>
                    </div>


                    {/*Billing infomation form section*/}

                    {
                        addmodalPopUpSuccesMessage ? <div className="card w-96 bg-base-100 p-5 mx-auto">
                            <div className="card-body">

                                <form onSubmit={handleSubmit(onSubmit)}>


                                    {/* full name enter */}
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>

                                        <input
                                            type="name"
                                            placeholder="Enter Your Name"
                                            className="input input-bordered w-full max-w-xs"
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: 'Name is Required'
                                                }
                                            })}
                                        />

                                        <label className="label">
                                            {errors.name?.type === 'required' && <span
                                                className="label-text-alt text-red-500">
                                                {errors.name.message}
                                            </span>}
                                        </label>
                                    </div>

                                    {/* Email input and vaildation */}
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            className="input input-bordered w-full max-w-xs"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: 'Email is Required'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                    message: 'Enter Vaild Email Address'
                                                }
                                            })}
                                        />

                                        <label className="label">
                                            {errors.email?.type === 'required' && <span
                                                className="label-text-alt text-red-500">
                                                {errors.email.message}
                                            </span>}
                                            {errors.email?.type === 'pattern' && <span
                                                className="label-text-alt text-red-500">
                                                {errors.email.message}
                                            </span>}

                                        </label>
                                    </div>

                                    {/* phone number vaildation */}
                                    <div className='form-control w-full max-w-xs'>
                                        <label htmlFor="phone">Phone Number</label>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            rules={{
                                                validate: (value) => isValidPhoneNumber(value)
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <PhoneInput
                                                    value={value}
                                                    className="input input-bordered w-full max-w-xs"
                                                    onChange={onChange}
                                                    defaultCountry="TH"
                                                    id="phone"
                                                />
                                            )}
                                        />
                                        {errors["phone"] && (
                                            <p className="error-message label-text-alt text-red-500">Invalid Phone</p>
                                        )}
                                    </div>

                                    {/* paid amount vaildation */}
                                    <div className="form-control w-full max-w-xs mt-2">
                                        <label className="label">
                                            <span className="label-text">Paid amount</span>
                                        </label>

                                        <input
                                            type="number"
                                            placeholder="Enter Amount"
                                            className="input input-bordered w-full max-w-xs"
                                            {...register("amount", {
                                                required: {
                                                    value: true,
                                                    message: 'Paid Amount is Required'
                                                },
                                            })}
                                        />


                                        <label className="label">
                                            {errors.amount?.type === 'required' && <span
                                                className="label-text-alt text-red-500">
                                                {errors.amount.message}
                                            </span>}

                                        </label>
                                    </div>

                                    <input className='btn w-full max-w-xs text-white mt-10' type="submit" value="add" />
                                </form>
                            </div>
                        </div> : <h1 className='text-xl text-red-500'>successfully Add</h1>

                    }



                </div>
            </div>
        </div>
    );
};

export default AddBillOnModal;
