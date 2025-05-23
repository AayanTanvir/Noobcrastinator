import React from 'react'

const BlockedSiteApp = () => {

    const blockedMessages = [
        "Nuh uhh! Forbidden destination!",
        "This site is blocked by your friendly neighborhood extension.",
        "Too bad you cannot visit...",
        "Maybe later.",
        "You thought I would let you pass?",
        "Looks like somebody needs to have some self-control",
        "You should have better things to do.",
        "No.",
        "Woahhh! You blocked this site. VERY HYPOCRITIC MATE",
        "You are not allowed to visit this site.",
        "I give up... Just go through... JUST KIDDING.",
        "Go do something else.",
        "You don't need to visit this site right now.",
        "You are better than this...",
        "Stop it.",
        "You think you are clever, huh?",
        "Don't come here, its just time waste",
        "Procrastinating again?",
        "✋ You cannot go further than this.",
        "We meet again...",
        "How many times have I told you not to stop coming to this site?",
        "🤨",
        "I think you should take a break.",
        "I'm... inevitable.",
        "You should have gone for the HEAD.",
        "*Noobcrastinator is gone to get some coffee*",
        "*Noobcrastinator is sleeping, he cannot message you*",
        "Great.. Do I have to threaten your family to stop you?",
        "Buddy, you shouldn't be here",
        "Your making me angry, stop.",
        "Might want to call your relatives to see if they're okay...",
        "Go to a therapist.",
        "Are you okay?",
        "There is nothing to see here.",
        "You thought I wouldn't notice didn't you?",
        "Look outside your window...",
        "*I'm gone, leave a messsage. SIKE YOU CAN'T HAHAHAH*",
        "Oh my God.. You again? How many times have I stopped you?",
        "*Noobcrastinator is currently busy focusing on other things*",
        "I.... AM NOOB *dynamic sound effect*",
        "CHICKEN JOCKEY!? HAHAHAHAHAHAH",
        "You talk too much...",
    ]

    const getMessage = () => {
        return blockedMessages[Math.floor(Math.random() * blockedMessages.length)];
    }

    return (
        <div className='absolute top-0 left-0 w-full h-full bg-neutral-800 p-2 gap-2'>
            <h1 className='text-3xl cursor-default text-center absolute top-4 left-4'><span className='text-lime-400'>Noob</span>crastinator</h1>
            <div className='relative w-full h-full p-4 flex flex-col justify-center items-center'>
                <h1 className='text-5xl text-center w-full text-wrap whitespace-break-spaces text-gray-300 leading-relaxed'>{getMessage()}</h1>
                <p className='text-md text-gray-300 absolute bottom-2'>Configure your blocked URLs in the extension.</p>
            </div>
        </div>
    )
}

export default BlockedSiteApp;
