import React from 'react';

const BillsRow = ({index,billingList}) => {
    const {phone,paid_amount,email,full_name,id}= billingList;
    return (
        <tr>
        <th>{id}</th>
        <td>{full_name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{paid_amount}</td>
        <td>
            <button className='btn btn-xs btn-info mr-2'>edit</button>
            <button className='btn btn-xs btn-warning'>delete</button>
        </td>
    </tr>
    );
};

export default BillsRow;