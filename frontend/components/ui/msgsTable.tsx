import { useSearchParams, usePathname } from "next/navigation"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { InsuranceDetails } from "@/app/lib/definitions"
import { fieldNames } from "@/app/lib/data"


export function MsgsTable({msgs, rowsPerPage}:{msgs:InsuranceDetails[] | undefined, rowsPerPage: number}) {
    if(!msgs){
        console.log("error") //need to create error.tsx
        return <TableSkeleton rowsPerPage={rowsPerPage}/>
    }

    const searchParams = useSearchParams();
    const currentPage:number = Number(searchParams.get('page')) || 1;

    return (
        <>
        
        {}
        <Table className="md:table-fixed x-full">
        <TableCaption>A list of your insurance clients.</TableCaption>
        <TableHeader>
            <TableRow>
            {[...Object.entries({...fieldNames, sentTimeStamp:"Time sent"})].map(([key, val], index) => {
                return (
                    <TableHead key={index}>{val}</TableHead>
                )
            })}

            </TableRow>
        </TableHeader>
        <TableBody>
            {msgs.slice((currentPage-1)*rowsPerPage, (currentPage-1)*rowsPerPage+rowsPerPage).map((msg, index) => (
                <TableRow key={index}>
                {Object.entries(msg).map(([key, val], index) => {
                    return (
                        <TableCell key={index}>{val}</TableCell>
                    )
                })}
            </TableRow>
            ))}
        </TableBody>
        
        </Table>
        </>
    )
    }
export function TableSkeleton({rowsPerPage}: {rowsPerPage:number}) {

    const skeletonRows = Array(rowsPerPage).fill(null)
    const numberOfColumns = Object.keys(fieldNames).length

    return (
        <Table>
        <TableCaption className="animate-pulse">
            <div className="h-4 w-48 bg-gray-200 rounded mx-auto" />
        </TableCaption>
        <TableHeader>
            <TableRow>
            {Object.entries(fieldNames).map(([key, val], index) => (
                <TableHead key={index}>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                </TableHead>
            ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {skeletonRows.map((_, rowIndex) => (
            <TableRow key={rowIndex}>
                {Array(numberOfColumns).fill(null).map((_, colIndex) => (
                <TableCell key={colIndex}>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                </TableCell>
                ))}
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}
