'use client'

import { useState, useEffect } from "react"
import { InsuranceDetails } from "../lib/definitions"
import { MsgsTable, TableSkeleton } from "@/components/ui/msgsTable"
import { fetchMessageHistory } from "../lib/actions"
import { Button } from "@/components/ui/button"
import { MyPagination, PaginationSkeleton } from "@/components/ui/myPagination"
import { RefreshCcw } from "lucide-react" 
import { rowsPerTable } from "../lib/data"

export default function HistoryPage() {
    const [msgs, setMsgs] = useState<InsuranceDetails[] | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const asyncSetMsgs = async () => {
            setLoading(true);
            const msgsList = await fetchMessageHistory();
            setMsgs(msgsList);
            setLoading(false);
        }

        asyncSetMsgs()
    }, [])

    const refreshData = async () => {
        setLoading(true);
        const msgsList = await fetchMessageHistory();
        setMsgs(msgsList);
        setLoading(false);
    };
    {`flex flex-col justify-center items-center`}
    return (
        <div className="flex flex-col justify-center items-center md:grid md:place-items-center min-h-screen bg-gradient-to-b from-amber-100 to-amber-50 p-6">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Message History</h2>
                <p className="text-gray-600 text-sm">Review past insurance messages.</p>
            </div>

            <div className="bg-gradient-to-b from-cyan-50 to-cyan-100 p-8 rounded-xl shadow-xl w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4 min-h-full">
                    <h3 className="text-xl font-semibold text-gray-700">Messages</h3>
                    <Button 
                        variant="outline" 
                        onClick={refreshData} 
                        className="flex items-center gap-2 text-blue-600 border-blue-500 hover:bg-blue-100 transition"
                    >
                        <RefreshCcw className="w-4 h-4" /> Refresh
                    </Button>
                </div>

                {loading ? <TableSkeleton rowsPerPage={rowsPerTable}/> : (!msgs || msgs.length == 0) ? <p className="text-gray-500 text-center">No messages available.</p> : <MsgsTable msgs={msgs} rowsPerPage={rowsPerTable}/>}
                <div className="p-2">
                    {loading ? <PaginationSkeleton></PaginationSkeleton> : <MyPagination totalPages={!msgs ? 0 : Math.ceil(msgs.length/rowsPerTable)}></MyPagination>}
                </div>
                {`${msgs && msgs.length+" clients"}`}
            </div>
        </div>
    )
}
