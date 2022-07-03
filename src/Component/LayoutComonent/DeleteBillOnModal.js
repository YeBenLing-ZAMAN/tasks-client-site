import React from 'react';

const DeleteBillOnModal = ({deleteBill, setDeleteBill, refetch,setReLoadChecked}) => {
    // console.log(deleteBill);
    const {email,full_name,paid_amount,phone,_id}= deleteBill;
    const handleDelete = (_id) => {
        // // console.log('i clicked');
        // console.log(_id);
        fetch(`http://localhost:5000/delete_billing/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                //  // console.log(data);
                if (data.deletedCount) {
                    // console.log(`bill items is deleted`);
                    // refetch();
                    setReLoadChecked(true);
                }
            })

        setDeleteBill(null);
        // console.log(deleteBill);

    }
    return (
        <div>
            <input type="checkbox" id="bill-delete-model-popup" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-red-500 capitalize text-center mb-8">Are you sure to delete this Bill</h3>
                    {/* table  */}
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
                            <tr>
                                <th>Full Name</th>
                                <td>{full_name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <th>Paid Amount</th>
                                <td>{paid_amount}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{phone}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="py-4 text-primary mt-10 capitalize">if your confirm then press delete button otherwise press cancel</p>
                    <div className="modal-action mt-[-5px]">
                        <button onClick={() => handleDelete(_id)} className='btn btn-warning'>Confirm Delete</button>
                        <label onClick={()=>setDeleteBill(null)} htmlFor="bill-delete-model-popup" className="btn btn-error">Canecl</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteBillOnModal;