import React, { useEffect, useState } from 'react'
import Browser from 'webextension-polyfill';

const BlockedSitesApp = () => {

    const getBlockedSites = async () => {
        const result = await Browser.storage.local.get('blockedSites');
        return result.blockedSites || null;
    }

    const [blockedSites, setBlockedSites] = useState([]);

    useEffect(() => {
        const fetchBlockedSites = async () => {
            const sites = await getBlockedSites();
            if (sites) {
                setBlockedSites(sites);
            }
        }
        fetchBlockedSites();
    }, [])

    const validateURL = (url) => {
        url = url.trim().toLowerCase();
        if (!url.includes(".")) {
            return null;
        }

        try {
            const parsedURL = new URL(url);
            return parsedURL.href;
        } catch (error) {
            try {
                const parsedURL = new URL(`https://${url}`);
                return parsedURL.href;
            } catch (error) {
                return null;
            }
        }
    }

    const handleSubmitURL = (event) => {
        event.preventDefault();
        const url = event.target.url.value;
        if (url && url.includes(".")) {
            event.target.url.value = '';
            const validatedURL = validateURL(url);
            
            if (!validatedURL) {
                alert("Please enter a valid URL");
                return;
            } else if (blockedSites.includes(validatedURL)) {
                alert("This site is already blocked");
                return;
            }

            setBlockedSites((prev) => [...prev, validatedURL]);
            Browser.storage.local.set({ blockedSites: [...blockedSites, validatedURL] })
            .catch((error) => {
                alert("Error updating blocked sites. Please try again.");
                console.error("Error updating blocked sites:", error);
            });

        } else {
            alert("Please enter a valid URL");
        }
    }

    return (
        <div className='w-full h-full absolute top-0 left-0 flex flex-col items-center justify-start p-2 gap-2'>
            <h1 className='text-3xl cursor-default'><span className='text-lime-400'>Noob</span>crastinator</h1>
            <h1 className='text-xl font-semibold text-gray-300 text-nowrap mb-4'>Blocked Sites</h1>
            <div className='w-[80%] h-[80%] flex flex-col items-center justify-start p-2 gap-2 rounded-md border-lime-500 shadow-[0_0_8px_rgba(132,208,0,0.5)] overflow-y-auto'>
                <form onSubmit={(event) => handleSubmitURL(event)} className='w-full h-[2rem] flex justify-center items-center mt-2 relative'>

                    <input type="text" className='w-[80%] h-full rounded-full bg-gray-300 pl-5 text-neutral-800 outline-none border-none' name='url' placeholder='URL e.g. website.com'/>
                    <button type="submit" className='bg-neutral-900 font-semibold text-gray-300 rounded-full h-full absolute right-[9.9%] w-[6rem] cursor-pointer transition duration-200 ease-out hover:text-red-400'>Block</button>

                </form>
                <div className='w-full flex-1 flex flex-col items-center justify-start gap-2 mt-4 p-4'>
                    {blockedSites.length > 0 && blockedSites.map((site, index) => (
                        <div key={index} className='w-full h-[2rem] flex justify-start items-center border-red-500 shadow-[0_0_4px_#fb2c36] rounded-full px-5 transition duration-300 ease-out hover:scale-[102%]'>
                            <p className='text-gray-200 font-semibold cursor-default'>{site}</p>
                        </div>
                    ))}
                    {blockedSites.length === 0 && <h1 className='text-gray-300 text-3xl mt-10'>You haven't blocked anything...</h1>}
                </div>
            </div>
        </div>
    )
}

export default BlockedSitesApp
