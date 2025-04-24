import React from 'react'
import Browser from 'webextension-polyfill'

const PopupApp = () => {

    return (
        <div className='w-full h-full absolute top-0 left-0 flex flex-col items-center justify-start p-2 gap-2'>
            <h1 className='text-3xl cursor-default'><span className='text-lime-400'>Noob</span>crastinator</h1>
            <button onClick={() => Browser.runtime.sendMessage({ action: "openBlockedSites" })} className='w-40 h-12 bg-neutral-600 
            shadow-[0_0_8px_rgba(132,208,0,0.5)] transition duration-150 
            ease-out hover:scale-[103%]
            rounded-md mt-4 mb-2 cursor-pointer border-2
            border-lime-500 hover:border-red-500 hover:shadow-[0_0_8px_#fb2c36]'>
                <h1 className='text-lg font-semibold text-gray-300 text-nowrap'>Blocked Sites</h1>
            </button>
        </div>
    )
}

export default PopupApp
