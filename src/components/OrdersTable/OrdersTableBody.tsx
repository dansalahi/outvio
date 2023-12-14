import {FC} from 'react';
import {Order} from '../../domain/Order/OrderModel';
import {OrderTablesRow} from './OrdersTableRow';
import Loading from '../UI/Loading';
import NoResultsFound from '../UI/NoResultFound';

export const TableBody: FC<{items: Order[]; isLoading: boolean}> = ({items, isLoading}) => {
  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan={6}>
            <Loading />
          </td>
        </tr>
      ) : items.length === 0 ? (
        <tr>
          <td colSpan={6}>
            <NoResultsFound />
          </td>
        </tr>
      ) : (
        <>
          {items.map((order, index) => (
            <OrderTablesRow key={index} {...order} />
          ))}
              <tr className="auto-height"></tr>
        </>
      )}
    </tbody>
  );
};
