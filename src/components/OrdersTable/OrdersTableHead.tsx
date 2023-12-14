import {FC} from 'react';
import {SortField} from '../../hooks/useSort';
import {Icon} from '@iconify/react';
import {twMerge} from 'tailwind-merge';

type TableHeadProps = {
  onAddOrderClick: () => void;
  onQueryChange: (query: string) => void;
  filterQuery: string;
  handleSort: (field: SortField) => void;
  getSortIcon: (field: SortField) => string;
};

const headerClasses = 'text-center align-middle px-5 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider';

const rowClasses = ' px-5 py-5 border-gray-200 bg-white text-sm';

export const TableHead: FC<TableHeadProps> = ({
  handleSort,
  getSortIcon,
  filterQuery,
  onQueryChange,
  onAddOrderClick,
}) => (
  <thead>
    <tr>
      <td colSpan={5} className={twMerge(rowClasses, 'pt-10')}>
        <div className="flex items-center justify-between w-full px-5 pb-4 border-b">
          <h1 className="text-2xl font-semibold">All orders</h1>
          <div className="flex items-center">
            <div className="relative">
              <button disabled={!filterQuery} onClick={() => onQueryChange('')}>
                <Icon
                  className={twMerge(
                    'absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer',
                    filterQuery ? 'opacity-100' : 'opacity-0'
                  )}
                  icon="material-symbols:close"
                  color="#8e8e8e"
                  width="20"
                  height="20"
                />
              </button>
              <input
                className="mr-2 rounded-none  border bg-[#EFEFEF] py-2 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="     Search"
                value={filterQuery}
                onChange={(e) => onQueryChange(e.target.value)}
              />
              <Icon
                className="absolute -translate-y-1/2 left-3 top-1/2"
                icon="gravity-ui:magnifier"
                color="#8e8e8e"
                width="20"
                height="20"
              />
            </div>

            <button className="ml-2 " onClick={onAddOrderClick}>
              <Icon icon="ic:baseline-plus" width={25} height={25} />
            </button>
          </div>
        </div>
      </td>
    </tr>
    <tr className="">
      <th className={twMerge(headerClasses, rowClasses)}>
        <SortButton field="id" handleSort={handleSort} getSortIcon={getSortIcon}>
          Order ID
        </SortButton>
      </th>
      <th className={twMerge(headerClasses, rowClasses)}>
        <SortButton field="date" handleSort={handleSort} getSortIcon={getSortIcon}>
          Order date
        </SortButton>
      </th>
      <th className={twMerge(headerClasses, rowClasses)}>
        <SortButton field="total" handleSort={handleSort} getSortIcon={getSortIcon}>
          Order Total
        </SortButton>
      </th>
      <th className={twMerge(headerClasses, rowClasses)}>
        <SortButton field="quantity" handleSort={handleSort} getSortIcon={getSortIcon}>
          Quantity
        </SortButton>
      </th>
      <th className={twMerge(headerClasses, rowClasses)}>
        <SortButton field="status" handleSort={handleSort} getSortIcon={getSortIcon}>
          Status
        </SortButton>
      </th>
    </tr>
  </thead>
);

const SortButton: FC<{
  field: SortField;
  handleSort: (field: SortField) => void;
  getSortIcon: (field: SortField) => string;
  children: React.ReactNode;
}> = ({field, handleSort, getSortIcon, children}) => (
  <button onClick={() => handleSort(field)}>
    {children}
    <Icon icon={getSortIcon(field)} className="inline" color="#8e8e8e" width="20" height="20" />
  </button>
);
