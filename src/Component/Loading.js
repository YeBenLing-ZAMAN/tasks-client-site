import React from 'react';

const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center '>
            <div className="w-24 h-24 border-t-8 border-b-2 border-primary rounded-full animate-spin">
            </div>
            <p className='mx-1 text-xl font-bold text-primary'>Loading...</p>
        </div>
    );
};

export default Loading;