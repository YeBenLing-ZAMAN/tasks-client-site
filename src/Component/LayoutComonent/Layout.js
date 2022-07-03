import React, { useEffect, useState } from 'react';
import AddBillOnModal from './AddBillOnModal';
import BillsRow from './BillsRow';
import DeleteBillOnModal from './DeleteBillOnModal';
import Loading from '../Loading';
import './layout.css';
import EditBillingOnModal from './EditBillingOnModal';

let totalPaid;

const Layout = () => {

    const [billingList, setBillingList] = useState([]);
    const [reLoadchecked, setReLoadChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [forModalPopUp, setForModalPopUp] = useState(null);
    const [deleteBill, setDeleteBill] = useState(null);
    const [editBillID, setEditBillId] = useState(null);
    const [addmodalPopUpSuccesMessage, setaddmodalPopUpSuccesMessage] = useState(true);
    const [editmodalPopUpSuccesMessage, setEditmodalPopUpSuccesMessage] = useState(true);
    const [searchItem, setSearchItem] = useState('');

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
    const clicksModalPopUpSuccesMessagehandle = () => {
        setaddmodalPopUpSuccesMessage(true);
        setForModalPopUp(true);
    }


    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
            await fetch("http://localhost:5000/billing_list", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setBillingList(data);
                    setReLoadChecked(false);
                    setIsLoading(false);
                });
        }
        loadData();
    }, [reLoadchecked]);

    if (isLoading) {
        return <Loading></Loading>
    }

    if (billingList) {
        // console.log(billingList);
        totalPaid = billingList?.map(item => item.paid_amount).reduce((prev, curr) => prev + curr, 0);

        /* to maintain the order */
        /* 
        */
        billingList.sort((a, b) => {
            // console.log('a', typeof(a.paid_amount));
            return b.paid_amount - a.paid_amount;
        })

        /* pagination */
        for (let i = 1; i <= Math.ceil(billingList.length / itemsPerPage); i++) {
            pages.push(i);
        }
        // currentItems = billingList.slice(indexofFirstItem, indexofLastItem);




        /* search function implement */
        const filterBill = billingList.filter((val) => {
            if (searchItem === '') {
                return val;
            } else if ((val.full_name.toLowerCase().includes(searchItem.toLowerCase())) || (val.email.toLowerCase().includes(searchItem.toLowerCase())) || (val.phone.toLowerCase().includes(searchItem.toLowerCase())) || (val.paid_amount.toString().toLowerCase().includes(searchItem.toLowerCase()))) {
                // console.log(val);
                return val;
            }
        })
        // console.log(filterBill);
        currentItems = filterBill.slice(indexofFirstItem, indexofLastItem);

    }

    /* pagination */
    const renderPageNumbers = [pages?.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? 'active' : null}
                >
                    {number}
                </li>
            )
        }
        return null;
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

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handlePrevButton} disabled={currentPage == pages[0] ? true : false}>&hellip;</li>
    }
    let pageDecrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageDecrementBtn = <li onClick={handleNextButton} disabled={currentPage == pages[pages.length - 1] ? true : false} >&hellip;</li>
    }

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
                        <p className="text-primary text-xl font-bold mr-5 uppercase">Bill Search: </p>
                        <div className="form-control w-full max-w-xs">
                            <input type="text" placeholder="Search . . ." onChange={(event) => setSearchItem(event.target.value)} className="input input-bordered" />
                        </div>
                    </div>
                    <div className="flex-none gap-2">
                        <label htmlFor="my-modal-6" onClick={() => clicksModalPopUpSuccesMessagehandle()} className="btn btn-primary modal-button">Add New Bill</label>
                    </div>
                </div>
            </div>

            {/* add new bill item button click on BillsRow handle and getting with a modal */}
            {
                forModalPopUp && <AddBillOnModal
                    setForModalPopUp={setForModalPopUp}
                    forModalPopUp={forModalPopUp}
                    setReLoadChecked={setReLoadChecked}
                    addmodalPopUpSuccesMessage={addmodalPopUpSuccesMessage}
                    setaddmodalPopUpSuccesMessage={setaddmodalPopUpSuccesMessage}
                ></AddBillOnModal>
            }

            {/* delete one bill item button click on BillsRow handle and getting with a modal */}
            {
                deleteBill && <DeleteBillOnModal
                    setDeleteBill={setDeleteBill}
                    deleteBill={deleteBill}
                    setReLoadChecked={setReLoadChecked}
                ></DeleteBillOnModal>
            }

            {/* edit one bill item button click on BillsRow handle and getting with a modal */}
            {
                editBillID && <EditBillingOnModal
                    setEditBill={setEditBillId}
                    editBillID={editBillID}
                    setReLoadChecked={setReLoadChecked}
                    setEditmodalPopUpSuccesMessage={setEditmodalPopUpSuccesMessage}
                    editmodalPopUpSuccesMessage={editmodalPopUpSuccesMessage}
                ></EditBillingOnModal>
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
                                setEditmodalPopUpSuccesMessage={setEditmodalPopUpSuccesMessage}
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
                    {pageIncrementBtn}
                    {renderPageNumbers}
                    {pageDecrementBtn}
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