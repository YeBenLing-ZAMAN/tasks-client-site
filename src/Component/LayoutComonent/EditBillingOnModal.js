import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


const EditBillingOnModal = ({ editBillID, setReLoadChecked ,editmodalPopUpSuccesMessage,setEditmodalPopUpSuccesMessage}) => {
    const { register, formState: { errors }, handleSubmit, control, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [bill, setBill] = useState([]);
    const id = editBillID;


    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
            await fetch(`http://localhost:5000/billing_list/${id}`)
                .then(res => res.json())
                .then(data => {
                    setBill(data);
                    setIsLoading(false);
                })
        }
        loadData();
    }, [id])
    const { email, full_name, paid_amount, phone, _id } = bill;

    const handleChangeName = (event) => {
        const items = { email: email, full_name: full_name, paid_amount: paid_amount, phone: phone, _id: _id }
        items.full_name = event.target.value;
        setBill(items);
    }
    const handleChangeEmail = (event) => {
        const items = { email: email, full_name: full_name, paid_amount: paid_amount, phone: phone, _id: _id }
        items.email = event.target.value;
        setBill(items);
    }

    const handleChangePhone = (event) => {
        const items = { email: email, full_name: full_name, paid_amount: paid_amount, phone: phone, _id: _id }
        items.phone = event.target.value;
        setBill(items);
    }

    const handleChangePaidAmount = (event) => {
        const items = { email: email, full_name: full_name, paid_amount: paid_amount, phone: phone, _id: _id }
        items.paid_amount = event.target.value;
        setBill(items);
    }

    const onSubmit = async (event) => {
        console.log(bill);

        await fetch(`http://localhost:5000/update_billing/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            },
            body: JSON.stringify(bill)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('update', data)
                setReLoadChecked(true);
                setEditmodalPopUpSuccesMessage(false);
            })


    }



    return (
        <div>
            <input type="checkbox" id="bill-edit-model-popup" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {/* modal head Line */}
                    <div className='flex justify-between items-center'>
                        <h3 className="font-bold text-xl text-primary text-center capitalize">Edit Billing information!</h3>
                        {/* modal close section */}
                        <div className="modal-action mt-[-3px]">
                            <label htmlFor="bill-edit-model-popup" className="btn btn-primary btn-circle btn-outline text-bold">X</label>
                        </div>
                    </div>


                    {/*Billing infomation form section*/}
                    {
                        isLoading
                            ?
                            <progress className="progress h-6 w-56 progress-error mx-auto"></progress>
                            :
                            <div className="card w-96 bg-base-100 p-5 mx-auto">
                                <div className="card-body">

                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Full Name</span>
                                            </label>
                                            <input type="text" className="input input-bordered w-full max-w-xs"
                                                onChange={handleChangeName} value={full_name} required />
                                        </div>

                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input type="email" className="input input-bordered w-full max-w-xs"
                                                onChange={handleChangeEmail} value={email} required />
                                        </div>


                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Phone Number</span>
                                            </label>
                                            <input type="tel" className="input input-bordered w-full max-w-xs"
                                                onChange={handleChangePhone} value={phone} required />
                                        </div>

                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Paid Amount</span>
                                            </label>
                                            <input type="number" className="input input-bordered w-full max-w-xs"
                                                onChange={handleChangePaidAmount} value={paid_amount} required />
                                        </div>

                                        <input className='btn w-full max-w-xs text-white mt-10' type="submit" value="edit" />
                                    </form>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default EditBillingOnModal;
