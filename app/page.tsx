"use client"
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHeadForm from '@/component/MainTable/TableHead';
import { styled } from '@mui/material/styles';
import axios from 'axios';

type DataType = {
  exchange: string,
  name: string,
  title: string,
  source: string
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  "&:hover": {
    cursor: "pointer",
    backgroundColor:theme.palette.action.hover,
  },
}));


export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const {data} = await axios.get(process.env.serverUrl + '/data/tools');
      if(data) setData(data.results);
    }

    getData();
    console.log(data);
  }, []);

  return (
    <Box sx={{ p:2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeadForm />
          <TableBody>
            {data?.map((row:DataType) => (
              <StyledTableRow 
                onClick={() => router.push(`/tools/${row.name}?exchange=${row.exchange}`)}
                key={row.name}>
                <TableCell component="th" scope="row">{row.exchange}:{row.name}</TableCell>
                <TableCell>180%</TableCell>
                <TableCell>1.0026</TableCell>
                <TableCell>192.1</TableCell>
                <TableCell>191.07</TableCell>
                <TableCell>21.07.2023</TableCell>
                <TableCell>0.06%</TableCell>
                <TableCell>0.1%</TableCell>
                <TableCell>0.16</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
