import React from 'react';

const AddBillOnModal = ({setForModalPopUp,forModalPopUp}) => {
    return (
        <div>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Congratulations random Internet user! {forModalPopUp}</h3>
                    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div class="modal-action">
                        <label for="my-modal-6" class="btn">close!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBillOnModal;