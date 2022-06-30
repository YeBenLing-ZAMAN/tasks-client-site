import React from 'react';

const BillsRow = ({index,bill,setPaidTotal,paidTotal,setDeleteBill}) => {
    const {phone,paid_amount,email,full_name,_id}= bill; 
    // console.log(bill);   
    return (
        <tr>
        <th>{_id}</th>
        <td>{full_name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>${paid_amount}</td>
        <td>
            <button className='btn btn-xs btn-info mr-2'>edit</button>
            <label for="bill-delete" onClick={() =>setDeleteBill(bill)} className='btn btn-xs btn-warning'>delete</label>
        </td>
    </tr>
    );
};

export default BillsRow;