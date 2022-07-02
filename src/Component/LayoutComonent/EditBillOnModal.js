import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import './editModal.css';


const EditBillOnModal = ({ editBillID, setEditBill, refetch,setReLoadChecked }) => {
    // React.memo()
    const [bill, setBill] = useState([]);
    const [successfulToggle, setSuccessfulToggle] = useState(false);
    // console.log(editBillID);
    const id = editBillID;


    useEffect(() => {
        const loadData = async () => {
            await fetch(`http://localhost:5000/billing_list/${id}`)
                .then(res => res.json())
                .then(data => setBill(data))
        }
        loadData();
        setSuccessfulToggle(false);
    }, [id])


    // const { data: bill, refetch: editModalRefetch } = useQuery('users', () => fetch(`http://localhost:5000/billing_list/${id}`, {
    //     method: "GET",
    //     headers: {
    //         // authorization: `Bearer ${localStorage.getItem('accesstoken')}`
    //     }
    // }).then(res => res.json()));

    const { email, full_name, paid_amount, phone, _id } = bill;


    const { register, formState: { errors }, handleSubmit, control, reset, setValue } = useForm();
    // console.log('re-render done');
    const onSubmit = async (data, event) => {
        event.preventDefault();
        // console.log(data);

        fetch(`http://localhost:5000/update_billing/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('update', data)
                // refetch();
                setReLoadChecked(true);
                reset()
                setSuccessfulToggle(true);
                // editModalRefetch();
            })

    }



    return (
        <>
            <input type="checkbox" id="bill-edit-model-popup" className="modal-toggle" />
            <div className="modal modal-bottom  sm:modal-middle">
                <div className="modal-area relative about-container border-2 border-red-400 card hero bg-slate-100" >
                    {/* modal content */}

                    {

                        !successfulToggle ? <div className='main-container-div'>
                            <div className="hero-content flex-col lg:flex-row-reverse  relative"></div>


                            <form onSubmit={handleSubmit(onSubmit)}>

                                <table className="table w-full">
                                    {/* <!-- head --> */}
                                    <thead>
                                        <tr>
                                            <th>Headding</th>
                                            <th>Previous Details</th>
                                            <th>Edit Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>ID</th>
                                            <td>{_id}</td>
                                            <td>{_id}</td>
                                        </tr>


                                        {/* full name enter */}
                                        <tr>
                                            <th>
                                                <label className="label">
                                                    <span className="label-text">Full Name</span>
                                                </label>
                                            </th>
                                            <td>{full_name}</td>
                                            <td>
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
                                            </td>
                                        </tr>


                                        {/* Email input and vaildation */}
                                        <tr>
                                            <th>
                                                <label className="label">
                                                    <span className="label-text">Email</span>
                                                </label>
                                            </th>
                                            <td>{email}</td>
                                            <td>
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
                                            </td>
                                        </tr>



                                        {/* phone number vaildation */}
                                        <tr>
                                            <th>
                                                <label className="label">
                                                    <span className="label-text">Paid amount</span>
                                                </label>

                                            </th>
                                            <td>{paid_amount}</td>
                                            <td>
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
                                            </td>
                                        </tr>


                                        {/* paid amount vaildation */}
                                        <tr>
                                            <th>
                                                <label htmlFor="phone">Phone Number</label>
                                            </th>
                                            <td>{phone}</td>
                                            <td>
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

                                                <div className='form-control w-full max-w-xs'>

                                                    {errors["phone"] && (
                                                        <p className="error-message label-text-alt text-red-500">Invalid Phone</p>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                <input className='btn w-full max-w-xs self-center text-white mt-10' type="submit" value="edit" />
                            </form>
                            <label htmlFor="bill-edit-model-popup" className="btn btn-error hidden md:block absolute text-center pt-4 right-5 top-2 my-10 rounded-lg text-white">X</label>
                        </div>
                            :
                            <div className=''>
                                <h1 className='text-xl text-red-500'>successfully Edit</h1>
                                <label  htmlFor="bill-edit-model-popup" className="btn btn-error text-white">Close!</label>
                            </div>
                    }

                </div>
            </div>
        </>
    );
};

export default EditBillOnModal;