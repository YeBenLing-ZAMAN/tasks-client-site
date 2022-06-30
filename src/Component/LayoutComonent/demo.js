import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';


const EditBillOnModal = ({ editBillID, setEditBill, refetch }) => {
    // React.memo()
    const [bill, setBill] = useState([])
    const [updateName, setUpdateName] = useState('');
    // const { email, full_name, paid_amount, phone, _id } = editBillID;
    console.log(editBillID);
    const id = editBillID;

    
    useEffect(() => {
        const loadData = async () => {
            await fetch(`http://localhost:5000/billing_list/${id}`)
            .then(res => res.json())
            .then(data => setBill(data))
        }
        loadData()
    }, [id])
    const { email, full_name, paid_amount, phone, _id } = bill;
    // setUpdateName(full_name);
    console.log(updateName);


    const { register, formState: { errors }, handleSubmit, control, reset, setValue } = useForm();
    console.log('re-render done');
    const onSubmit = async (data, event) => {
        event.preventDefault();
        console.log(data);

    }
    const handleEdit = () => {


    }


    setValue('name', full_name);
    setValue('email', email);
    setValue('amount', paid_amount);
    setValue('phone', phone);
    return (
        <div>
            <input type="checkbox" id="bill-edit-model-popup" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-red-500 capitalize text-center mb-8">Are you sure to delete this Bill</h3>
                    {/* table  */}



                    <form onSubmit={handleSubmit(onSubmit)}>

                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th>Headding</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{_id}</td>
                                </tr>


                                {/* full name enter */}
                                <tr>
                                    <th>
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                    </th>
                                    <td>
                                        <input
                                            type="name"
                                            placeholder="Enter Your Name"
                                            className="input input-bordered w-full max-w-xs"

                                            {...register("name", {
                                                required: {
                                                    value: false,
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
                                    <td>
                                        <input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            className="input input-bordered w-full max-w-xs"
                                            {...register("email", {
                                                required: {
                                                    value: false,
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


                        <input className='btn w-full max-w-xs text-white mt-10' type="submit" value="add" />
                    </form>


                    <p className="py-4 text-primary mt-10 capitalize">if your confirm then press edit button otherwise press cancel</p>
                    <div className="modal-action mt-[-5px]">
                        <button onClick={() => handleEdit()} className='btn btn-warning'>Confirm edit</button>
                        <label htmlFor="bill-edit-model-popup" className="btn btn-error">Canecl</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBillOnModal;