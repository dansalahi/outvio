import {FC, useState} from 'react';
import {useOrders} from '../../hooks/useOrders';
import {SortField, useSort} from '../../hooks/useSort';
import {Order} from '../../domain/Order/OrderModel';
import {useFilter} from '../../hooks/useFilter';
import OrderModal from '../OrderModal';
import {usePagination} from '../../hooks/usePagination';
import {TableFooter} from './OrdersTableFooter';
import {TableHead} from './OrdersTableHead';
import {TableBody} from './OrdersTableBody';

const filterOrders = (order: Order, query: string) => {
  return (
    order.id.toString().includes(query) ||
    order.status.toLowerCase().includes(query.toLowerCase()) ||
    order.total.toString().includes(query) ||
    order.quantity.toString().includes(query) ||
    order.date.toLowerCase().includes(query.toLowerCase()) ||
    order.status.toLowerCase().includes(query.toLowerCase())
  );
};

const OrdersTable: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const {orders, addOrder, isLoading} = useOrders();
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredOrders = useFilter(orders, filterQuery, filterOrders);
  const {sortedOrders, sortOrders, getSortIcon} = useSort(filteredOrders);
  const {paginatedItems, currentPage, setCurrentPage, maxPage} = usePagination(sortedOrders, 10);

  const handleSort = (field: SortField) => sortOrders(field);
  const handleQueryChange = (query: string) => setFilterQuery(query);
  const handleAddOrder = (orderData: Order) => {
    addOrder(orderData);
    setModalOpen(false);
  };
  const handleAddOrderClick = () => setModalOpen(true);

  return (
    <div className="w-2/3 pb-0 ">
      {renderTableOrMessage({
        items: paginatedItems,
        handleSort,
        getSortIcon,
        currentPage,
        setCurrentPage,
        maxPage,
        filterQuery,
        onQueryChange: handleQueryChange,
        onAddOrderClick: handleAddOrderClick,
        isLoading,
      })}

      <OrderModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAddOrder={handleAddOrder} />
    </div>
  );
};

type RenderTableOrMessageProps = {
  items: Order[];
  handleSort: (field: SortField) => void;
  getSortIcon: (field: SortField) => string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxPage: number;
  onAddOrderClick: () => void;
  onQueryChange: (query: string) => void;
  filterQuery: string;
  isLoading: boolean;
}

const renderTableOrMessage: FC<RenderTableOrMessageProps> = ({
  items,
  handleSort,
  getSortIcon,
  currentPage,
  setCurrentPage,
  maxPage,
  onAddOrderClick,
  onQueryChange,
  filterQuery,
  isLoading,
}) => {
  return (
      <table className="mt-4 h-full w-full min-w-full table-auto rounded-none border border-[#C8C8C8] bg-white leading-normal shadow">
        <TableHead
          filterQuery={filterQuery}
          onQueryChange={onQueryChange}
          handleSort={handleSort}
          getSortIcon={getSortIcon}
          onAddOrderClick={onAddOrderClick}
        />
        <TableBody items={items} isLoading={isLoading} />
        <TableFooter currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage} />
      </table>
  );
};

export default OrdersTable;
