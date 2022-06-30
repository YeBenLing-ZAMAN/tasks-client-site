import React, { useState } from 'react';
import { useQuery } from 'react-query';
import AddBillOnModal from './AddBillOnModal';
import BillsRow from './BillsRow';
import DeleteBillOnModal from './DeleteBillOnModal';
import EditBillOnModal from './EditBillOnModal';

const Layout = () => {

    // const [billingList, setBillingList] = useState([]);
    const [forModalPopUp, setForModalPopUp] = useState(null);
    const [paidTotal, setPaidTotal] = useState(0);
    const [deleteBill, setDeleteBill] = useState(null);
    const [editBillID, setEditBillId] = useState(null);


    const { data: billingList, refetch } = useQuery('users', () => fetch(`http://localhost:5000/billing_list`, {
        method: "GET",
        headers: {
            // authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
    }).then(res => res.json()));

    /* paid total add and set to navbar for display 
    billingList?.forEach(bill => {
        console.log(bill.paid_amount);
        let temp = (parseFloat(bill.paid_amount));
        // setPaidTotal(paidTotal + temp);
        console.log(temp);
    });
    */

    // console.log(billingList);
    return (
        <>
            {/* navbar */}
            <div className="bg-base-300">
                <div className='navbar max-w-7xl mx-auto'>
                    <div className="flex-1">
                        <button className="btn btn-ghost normal-case text-xl">Logo</button>
                    </div>
                    <div className="flex-none">
                        <p className="font-bold">Paid Total :${paidTotal} </p>
                    </div>
                </div>
            </div>


            {/* bill added nad search section top of the table */}

            <div className='mt-10'>
                <div className="navbar bg-base-300 max-w-7xl mx-auto">
                    <div className="flex-1">
                        <p className="normal-case text-xl font-bold mr-5">Billngs: </p>
                        <div className="form-control w-full max-w-xs">
                            <input type="text" placeholder="Search" className="input input-bordered" />
                        </div>
                    </div>
                    <div className="flex-none gap-2">
                        <label htmlFor="my-modal-6" onClick={() => setForModalPopUp(true)} className="btn btn-primary modal-button">Add New Bill</label>
                    </div>
                </div>
            </div>

            {/* add new bill item button click on BillsRow handle and getting with a modal */}
            {
                forModalPopUp && <AddBillOnModal
                    setForModalPopUp={setForModalPopUp}
                    forModalPopUp={forModalPopUp}
                    refetch={refetch}
                ></AddBillOnModal>
            }

            {/* delete one bill item button click on BillsRow handle and getting with a modal */}
            {
                deleteBill && <DeleteBillOnModal
                    setDeleteBill={setDeleteBill}
                    deleteBill={deleteBill}
                    refetch={refetch}
                ></DeleteBillOnModal>
            }

            {/* edit one bill item button click on BillsRow handle and getting with a modal */}
            {
                editBillID && <EditBillOnModal
                setEditBill={setEditBillId}
                editBillID={editBillID}
                    refetch={refetch}
                ></EditBillOnModal>
            }

            {/* all bill information stored and showing on list */}

            <div className="overflow-x-auto max-w-7xl mx-auto mt-10">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Billin ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billingList?.map((bill, index) => <BillsRow
                                key={bill._id}
                                bill={bill}
                                paidTotal={paidTotal}
                                setPaidTotal={setPaidTotal}
                                index={index}
                                setDeleteBill={setDeleteBill}
                                setEditBillId={setEditBillId}
                            ></BillsRow>)
                        }
                    </tbody>
                </table>
            </div>




        </>

    );
};

export default Layout;