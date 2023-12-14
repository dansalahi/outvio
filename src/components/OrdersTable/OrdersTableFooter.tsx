import { FC } from "react"
import Button from "../UI/Button"
import { twMerge } from "tailwind-merge"

const classes =
'text-center align-middle px-5 py-5 border-b border-gray-200 bg-white text-sm'


export const TableFooter: FC<{currentPage: number; setCurrentPage: (page: number) => void; maxPage: number}> = ({
  currentPage,
  setCurrentPage,
  maxPage,
}) => (
  <tfoot>
    <tr className="">
      <td colSpan={5} className={twMerge(classes)}>
        <div className="flex items-center justify-center w-full gap-3 py-5">
          <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            First
          </Button>
          <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="mx-8">
            Page {currentPage} of {maxPage}
          </span>
          <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === maxPage || maxPage === 0}>
            Next
          </Button>
          <Button onClick={() => setCurrentPage(maxPage)} disabled={currentPage === maxPage || maxPage === 0}>
            Last
          </Button>
        </div>
      </td>
    </tr>
  </tfoot>
);