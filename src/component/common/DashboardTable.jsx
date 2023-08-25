import React from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';

const DashboardTable = ({ columns, data }) => {
  const defaultColumn = React.useMemo(
    () => ({
      // Default UI for filter
      Filter: () => null, // No individual column filter
    }),
    []
  );

  const totalItem = data.length;

  const handlePagination = (newPage) => {
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
    state: { pageIndex, pageSize },
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      initialState: { pageIndex: 0, pageSize: 5, sortBy: [{ id: columns[0].accessor, desc: true }] }, // Sort by the first column in descending order by default
    },
    useFilters, // useFilters hook
    useGlobalFilter, // useGlobalFilter hook
    useSortBy, // useSortBy hook
    usePagination // usePagination hook
  );

  return (
    <div>
      <table className="w-100 mt-3 table-theme-1" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div>
                    {column.render('Header')}

                    {/* Avoid setting sorting options for the last column */}
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
                {row.cells.map((cell, cellIndex) => (
                  <td {...cell.getCellProps()} style={{ border: '1px solid black' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
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

export default DashboardTable;
