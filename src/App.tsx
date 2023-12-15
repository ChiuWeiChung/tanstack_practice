/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect,  useState } from 'react'
import './App.css'


import { createColumnHelper,  getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Box, Button, Typography } from '@mui/material';
import TableTemplate from './components/TableTemplate';
import { Person } from './FakeTableData/types';
import { defaultData } from './FakeTableData';
// import { makeData } from './components/SomethingElse/makeData';




const columnHelper = createColumnHelper<Person>();
// enum TEST{
//   'a'='aaaa',
//   'b'='bbbb'
// }
// console.log('TEST',Object.keys(TEST))

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    footer: (info) => {
      return info.column.id;
    },
  }),
  columnHelper.accessor('lastName', {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    id: 'actions',
    header: (headerProps) => {
      console.log('headerProps', headerProps);
      return <div>👇</div>;
    },
    cell: () => {
      return (
        <Box display="flex">
          <Button color="primary">Edit</Button>
          <Button color="error">Delete</Button>
        </Box>
      );
    },
  }),
];

function App() {
  const [data, _setData] = useState(() => [...defaultData]);
  // console.log('makeData', makeData(100,5,3));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel:getPaginationRowModel(),
    manualPagination:false
  });

  
  const currentPageIndex = table.getState().pagination.pageIndex;

  useEffect(() => {
    console.log('currentPageIndex', currentPageIndex);
  }, [currentPageIndex]);
  return (
    <>
    <Typography>hihi 1215</Typography>
    <TableTemplate<Person> table={table} />
    </>
  );
}

export default App
