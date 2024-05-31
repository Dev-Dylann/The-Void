"use client"

import { montserrat } from "../ui/fonts"
import { useState } from 'react'
import CreateVoid from "./CreateVoidForm";
import JoinVoid from "./JoinVoidForm";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Selection() {

    const [selectionState, setSelectionState] = useState<'home' | 'create' | 'join'>('home')

    function HomeContent() {
        return (
            <>
                <button onClick={() => setSelectionState('create')} className='w-full flex flex-col gap-2 text-xs text-left border rounded-lg p-4 bg- backdrop-blur hover:bg-white hover:text-darkBg'>
                    <span className={`${montserrat.className} text-sm font-semibold`}>Create New Void</span>
                    Create a new void and share the link for your friends to join
                </button>

                <button onClick={() => setSelectionState('join')} className='w-full flex flex-col gap-2 text-xs text-left border rounded-lg p-4 bg- backdrop-blur hover:bg-white hover:text-darkBg'>
                    <span className={`${montserrat.className} text-sm font-semibold`}>Join an Existing Void</span>
                    Enter the link given to you by Void owner to join
                </button>
            </>
        )
    }

    function BackButton() {
        return (
            <button onClick={() => setSelectionState('home')} className={`${montserrat.className} text-base font-semibold border p-2 rounded-lg flex justify-center gap-2`}>
                <ArrowLeftIcon className='h-5 w-5' />
                Back
            </button>
        )
    }

    return (
        <div className="py-6 px-6 flex flex-col gap-4 text-left">
            {selectionState === 'create'
                ? (
                    <>
                        <CreateVoid />
                        <BackButton />
                    </>
                )
                : selectionState === 'join'
                    ? (
                        <>
                            <JoinVoid />
                            <BackButton />
                        </>
                    )
                    : <HomeContent />}
        </div>
    )
}