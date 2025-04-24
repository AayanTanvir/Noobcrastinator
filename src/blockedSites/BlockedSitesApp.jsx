import React from 'react'
import Browser from 'webextension-polyfill';

const BlockedSitesApp = () => {

    const handleSubmitURL = (event) => {
        event.preventDefault();
        const url = event.target.url.value;
        if (url && url.includes(".")) {
            Browser.runtime.sendMessage({ action: "blockURL", url: url }).then((response) => {
                if (response.success) {
                    console.log("Saved URL");
                } else {
                    alert(`Failed to block ${url}`);
                }
            })
            event.target.url.value = '';
        } else {
            alert("Please enter a valid URL");
        }
    }

    return (
        <div className='w-full h-full absolute top-0 left-0 flex flex-col items-center justify-start p-2 gap-2'>
            <h1 className='text-3xl cursor-default'><span className='text-lime-400'>Noob</span>crastinator</h1>
            <h1 className='text-xl font-semibold text-gray-300 text-nowrap mb-4'>Blocked Sites</h1>
            <div className='w-[80%] h-[80%] flex flex-col items-center justify-start p-2 gap-2 rounded-md border-lime-500 shadow-[0_0_8px_rgba(132,208,0,0.5)] overflow-y-scroll'>
                <form onSubmit={(event) => handleSubmitURL(event)} className='w-full h-[2rem] flex justify-center items-center mt-2 relative'>

                    <input type="text" className='w-[80%] h-full rounded-full bg-gray-300 pl-5 text-neutral-800 outline-none border-none' name='url' placeholder='URL e.g. website.com'/>
                    <button type="submit" className='bg-neutral-900 font-semibold text-gray-300 rounded-full h-full absolute right-[9.9%] w-[6rem] cursor-pointer transition duration-200 ease-out hover:text-red-400'>Block</button>

                </form>
            </div>
        </div>
    )
}

export default BlockedSitesApp
