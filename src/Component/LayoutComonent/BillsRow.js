import React from 'react';

const BillsRow = ({index,bill,setDeleteBill,setEditBillId,setEditmodalPopUpSuccesMessage}) => {
    const {phone,paid_amount,email,full_name,_id}= bill; 
    // // console.log(bill); 
    const handleEditbutton = (_id)=>{
        setEditBillId(_id);
        setEditmodalPopUpSuccesMessage(true);
    }  
    return (
        <tr>
        <th>{_id}</th>
        <td>{full_name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>${paid_amount}</td>
        <td>
            <label htmlFor="bill-edit-model-popup" onClick={() =>handleEditbutton(_id)} className='btn btn-xs btn-info mr-2'>edit</label>
            <label htmlFor="bill-delete-model-popup" onClick={() =>setDeleteBill(bill)} className='btn btn-xs btn-warning'>delete</label>
        </td>
    </tr>
    );
};

export default BillsRow;