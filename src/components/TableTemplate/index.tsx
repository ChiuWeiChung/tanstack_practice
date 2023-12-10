/* eslint-disable @typescript-eslint/no-unused-vars */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import { Table as TanstackTable, flexRender } from '@tanstack/react-table';
import {  Pagination, Stack, TablePagination, TablePaginationOwnProps } from '@mui/material';
import { UsePaginationProps } from '@mui/material/usePagination/usePagination';
import { useEffect } from 'react';

export type TableTemplate<T> = {
  table: TanstackTable<T>;
};
const TableTemplate = <T,>(props: TableTemplate<T>) => {
  const { table } = props;


  const onPageChange: TablePaginationOwnProps['onPageChange'] = (_target, pageNum) => {
    table.setPageIndex(pageNum);
  };

  const onRowsPerPageChange: TablePaginationOwnProps['onRowsPerPageChange'] = (e) => {
    table.setPageSize(parseInt(e.target.value, 10));
  };
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
      <Stack my={2}>
        {/* <Pagination count={10} page={3} onChange={onChange} showFirstButton showLastButton /> */}
        <TablePagination
          component="div"
          count={-1}
          onPageChange={onPageChange}
        //   rowsPerPageOptions={[2,4,6,8,10,12]}
          onRowsPerPageChange={onRowsPerPageChange}
          page={table.getState().pagination.pageIndex}
          rowsPerPage={table.getState().pagination.pageSize}
        />
      </Stack>
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </TableContainer>
  );
};

export default TableTemplate