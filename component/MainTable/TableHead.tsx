"use client";
import TableCell,  { tableCellClasses }  from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {BsPatchQuestion} from 'react-icons/bs';
import { styled } from '@mui/material/styles';
import './TableHead.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableHeadForm = () => {

  function mouseOverHandler(e: any){
    const target = e.currentTarget;
    const type = e.type;
  
    if(type === 'mouseenter' && target.className === 'caption__span') 
      target.nextElementSibling.style.display = 'block';
      
    if(type === 'mouseleave' && target.className === 'caption__span')
      target.nextElementSibling.style.display = 'none';

  }

  return ( 
    <TableHead>
    <TableRow>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__span'>
          <span>Наименование</span>
          <BsPatchQuestion />
        </div>
        <div className='help__span'>Инструменты за которыми будем следить</div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__span'>
          <span>доходность(% годовых)</span>
          <BsPatchQuestion />
        </div>
        <div className='help__span'>JОжидаемая доходность инструмента</div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div className='caption__span'>
          <span>текущая цена спреда</span>
        </div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div className='caption__span'>
          <span>текущая цена А</span>
        </div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div className='caption__span'>
          <span>текущая цена В</span>
        </div>
      </StyledTableCell>
      <StyledTableCell>дата экспирации</StyledTableCell>
      <StyledTableCell>косты по активу А</StyledTableCell>
      <StyledTableCell>косты по активу B</StyledTableCell>
      <StyledTableCell>сумарный актив</StyledTableCell>
    </TableRow>
  </TableHead>   
  );
}

export default TableHeadForm;