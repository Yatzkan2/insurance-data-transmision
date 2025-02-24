
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { generatePagination, pageNumberInvalid } from "@/app/lib/utils";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { clsx } from "clsx";
  
  export function MyPagination({totalPages}:{totalPages:number}) {
    const router = useRouter();
    const createPageURL = (pageNumber: number | string) => {
          const params = new URLSearchParams();
          params.set('page', pageNumber.toString());
          return `${pathname}?${params.toString()}`;
        };
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;

    // if(pageNumberInvalid(currentPage,totalPages)) {
    //     console.log(`current page is ${currentPage}`)
    //    router.push(createPageURL(1));
    //    return null;
    // } else {
    //     console.log(`current page is fine`)
    // }
    const paginationArray = generatePagination(currentPage, totalPages);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage <= 1 ? <></> : <PaginationPrevious href={createPageURL(currentPage-1)} />}
          </PaginationItem>

            {paginationArray.map((p, index) => {
                return (
                    <PaginationItem key={index}>
                        {(p === '...') ? 
                        <PaginationEllipsis /> :
                        <PaginationLink className={clsx({"bg-gray-50":p === currentPage})} href={createPageURL(p)}>{p}</PaginationLink>
                        } 
                    </PaginationItem>
                )
            })}

          <PaginationItem>
            {currentPage >= totalPages ? <></> :<PaginationNext href={createPageURL(currentPage+1)} />}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  
  export function PaginationSkeleton() {
    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button Skeleton */}
                <PaginationItem>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                </PaginationItem>

                {/* Page Number Skeletons */}
                {Array(5).fill(null).map((_, index) => (
                    <PaginationItem key={index}>
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    </PaginationItem>
                ))}

                {/* Next Button Skeleton */}
                <PaginationItem>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
