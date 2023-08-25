import React, { useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';

// Sample data for the table
// const data = [
//   { id: 1, name: 'John Doe', age: 30, email: 'john.doe@example.com' },
//   { id: 2, name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
//   // Add more data as needed
// ];

const Table = ({columns, data}) => {

  const defaultColumn = React.useMemo(
    () => ({
      // Default UI for filter
      Filter: () => null, // No individual column filter
    }),
    []
  );

  const totalItem = data.length;

  const handlePagination = (newPage) => {
    // You can update the page index here and refetch data if needed
    // For simplicity, we'll just use the existing pagination functions
    if (newPage > pageIndex) {
      nextPage();
    } else if (newPage < pageIndex) {
      previousPage();
    }
  };


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      initialState: { pageIndex: 0, pageSize: 10, sortBy: [{ id: columns[0].accessor, desc: true }] }, // Initial page index and page size
    },
    useFilters, // useFilters hook
    useGlobalFilter, // useGlobalFilter hook
    useSortBy, // useSortBy hook
    usePagination // usePagination hook
  );

  return (
    <div>
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search from table"
        className="form-control input-new-table"
      />
      <table className="w-100 mt-3 table-theme-1" {...getTableProps()} >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map((column,columnIndex) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div >
                  {column.render('Header')}
                  {(columnIndex !== columns.length - 1) &&(columnIndex !== columns.length - 2) && (
                      column.isSorted ? (
                        column.isSortedDesc ? (
                          <span> 🔽</span>
                        ) : (
                          <span> 🔼</span>
                        )
                      ) : (
                        <span> ⬆️⬇️</span>
                      )
                    )}
                </div>
              </th>
            ))}
          </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid black' }}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
           {page.length === 0 && ( // Display a "no data found" row if there are no results to display
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                No data found.
              </td>
            </tr>
          )}

        </tbody>
      </table>

      {/* pagination two */}
   

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
        <PaginationControl
          page={pageIndex + 1}
          between={4}
          total={totalItem}
          limit={pageSize}
          changePage={(page) => {
            handlePagination(page - 1);
          }}
          ellipsis={1}
        />
      </div>
    </div>
  );
};

export default Table;