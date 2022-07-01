import React, { useState } from 'react';
import { useQuery } from 'react-query';
import AddBillOnModal from './AddBillOnModal';
import BillsRow from './BillsRow';
import DeleteBillOnModal from './DeleteBillOnModal';
import EditBillOnModal from './EditBillOnModal';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import './layout.css';

let totalPaid;

const Layout = () => {

    // const [billingList, setBillingList] = useState([]);
    const [forModalPopUp, setForModalPopUp] = useState(null);
    const [deleteBill, setDeleteBill] = useState(null);
    const [editBillID, setEditBillId] = useState(null);
    const navigate = useNavigate();

    /* pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemPerPage] = useState(10);
    const pages = [];
    const indexofLastItem = currentPage * itemsPerPage;
    const indexofFirstItem = indexofLastItem - itemsPerPage;
    let currentItems = [];

    /* pagination next and pervius button contorl */
    const [pageNumberLimit, setPageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);


    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }


    const { data: billingList, isLoading, refetch } = useQuery('users', () => fetch(`http://localhost:5000/billing_list`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
    }).then(res => {
        // console.log("res", res);
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accesstoken');
            navigate('/login');
            // console.log("problem found");
        } else if (res.status)
            return res.json()
    }));;

    if (isLoading) {
        return <Loading></Loading>
    }

    if (billingList) {
        console.log(billingList);
        totalPaid = billingList.map(item => item.paid_amount).reduce((prev, curr) => prev + curr, 0);


        /* pagination */
        for (let i = 1; i <= Math.ceil(billingList.length / itemsPerPage); i++) {
            pages.push(i);
        }
        currentItems = billingList.slice(indexofFirstItem, indexofLastItem);
        console.log(indexofFirstItem);
        console.log(indexofLastItem);
        console.log('here', billingList);
        console.log(currentItems);

    }
    // const currentItems =billingList.slice(indexofFirstItem, indexofFirstItem);

    const renderPageNumbers = [pages?.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage == number ? 'active' : null}
                >
                    {number}
                </li>
            )
        }
    })]

    const handleNextButton = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handlePrevButton = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    // let pageIncrementBtn = null;
    // if (pages.length > maxPageNumberLimit) {
    //     pageIncrementBtn = <li onClick={handlePrevButton} disabled={currentPage == pages[0] ? true : false}>&hellip;</li>
    // }
    // let pageDecrementBtn = null;
    // if (pages.length > maxPageNumberLimit) {
    //     pageDecrementBtn = <li onClick={handleNextButton} disabled={currentPage == pages[pages.length - 1] ? true : false} >&hellip;</li>
    // }

    return (
        <>
            {/* navbar */}
            <div className="bg-base-300">
                <div className='navbar max-w-7xl mx-auto'>
                    <div className="flex-1">
                        <button className="btn btn-ghost normal-case text-xl" >Logo</button>
                    </div>
                    <div className="flex-none">
                        <p className="font-bold">Paid Total :$<span className='text-red-500'>{totalPaid}</span> </p>
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

            <div className="overflow-x-auto max-w-7xl mx-auto mt-10 table-container">
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
                            currentItems?.map((bill, index) => <BillsRow
                                key={bill._id}
                                bill={bill}
                                index={index}
                                setDeleteBill={setDeleteBill}
                                setEditBillId={setEditBillId}
                            ></BillsRow>)
                        }

                    </tbody>
                </table>
            </div>

            {/* pagination page number rendeing */}
            <div className='w-full '>
                <ul className='pageNumbers'>
                    <li>
                        <button onClick={handlePrevButton} disabled={currentPage == pages[0] ? true : false}>
                            prev
                        </button>
                    </li>
                    {/* {pageIncrementBtn} */}
                    {renderPageNumbers}
                    {/* {pageDecrementBtn} */}
                    <li>
                        <button onClick={handleNextButton} disabled={currentPage == pages[pages.length - 1] ? true : false}>
                            next
                        </button>
                    </li>
                </ul>
            </div>

        </>

    );
};

export default Layout;