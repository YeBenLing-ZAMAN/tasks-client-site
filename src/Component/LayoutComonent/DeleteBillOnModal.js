import React from 'react';

const DeleteBillOnModal = ({deleteBill, setDeleteBill, refetch}) => {
    console.log(deleteBill);
    const {email,full_name,paid_amount,phone,_id}= deleteBill;
    const handleDelete = (_id) => {
        // console.log('i clicked');
        console.log(_id);
        fetch(`http://localhost:5000/deletebilling/${_id}`, {
            method: 'DELETE',
            headers: {

            }
        })
            .then(res => res.json())
            .then(data => {
                //  console.log(data);
                if (data.deletedCount) {
                    console.log(`bill items is deleted`);
                    refetch();
                }
            })

        setDeleteBill(null);
        console.log(deleteBill);

    }
    return (
        <div>
            <input type="checkbox" id="bill-delete-model-popup" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-xl text-red-500 capitalize text-center mb-8">Are you sure to delete this Bill</h3>
                    {/* table  */}
                    <table class="table w-full">
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

                    <p class="py-4 text-primary mt-10 capitalize">if your confirm then press delete button otherwise press cancel</p>
                    <div class="modal-action mt-[-5px]">
                        <button onClick={() => handleDelete(_id)} className='btn btn-warning'>Confirm Delete</button>
                        <label onClick={()=>setDeleteBill(null)} htmlFor="bill-delete-model-popup" class="btn btn-error">Canecl</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteBillOnModal;