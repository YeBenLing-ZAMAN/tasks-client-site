import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BillsRow from './BillsRow';

const Layout = () => {

    const [billingList, setBillingList] = useState([]); 

    useEffect(() => {
        fetch('fakedata.json')
            .then(res => res.json())
            .then(data => setBillingList(data));
    },[]);

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
                        <p className="font-bold">Paid Total : </p>
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

                        <button className="btn btn-primary">Add New Bill</button>
                    </div>
                </div>
            </div>


            {/* all bill information stored  */}

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
                            billingList?.map((billingList, index) => <BillsRow key={billingList.id} billingList={billingList} index={index} ></BillsRow>)
                        }
                    </tbody>
                </table>
            </div>




        </>

    );
};

export default Layout;