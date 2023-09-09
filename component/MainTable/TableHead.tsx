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
  
    if(type === 'mouseenter' && target.className === 'caption__text') 
      target.nextElementSibling.style.display = 'block';
      
    if(type === 'mouseleave' && target.className === 'caption__text')
      target.nextElementSibling.style.display = 'none';

  }

  return ( 
    <TableHead>
    <TableRow>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__text'>
          <text>Наименование</text>
          <BsPatchQuestion />
        </div>
        <div className='help__text'>Инструменты за которыми будем следить</div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__text'>
          <text>Абривиатура</text>
          <BsPatchQuestion />
        </div>
        <div className='help__text'>что смотрим</div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__text'>
          <text>Биржа</text>
          <BsPatchQuestion />
        </div>
        <div className='help__text'>биржа</div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__text'>
          <text>прибыль/%</text>
          <BsPatchQuestion />
        </div>
        <div className='help__text'>процент прибыли</div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__text'>
          <text>баланс/руб</text>
          <BsPatchQuestion />
        </div>
        <div className='help__text'>ползунок с данными какой у тебя капитал на какой бирже</div>
      </StyledTableCell>
      <StyledTableCell>ГО</StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__text'>
          <text>депозит/руб</text>
          <BsPatchQuestion />
        </div>
        <div className='help__text'>ползунок на депозит</div>
      </StyledTableCell>
      <StyledTableCell className='caption__box'>
        <div
          onMouseEnter={mouseOverHandler}
          onMouseLeave={mouseOverHandler} 
          className='caption__text'>
          <text>площпдка</text>
          <BsPatchQuestion />
        </div>
        <div className='help__text'>ползунок на площадке</div>
      </StyledTableCell>
      <StyledTableCell>Фандинг</StyledTableCell>
    </TableRow>
  </TableHead>   
  );
}

export default TableHeadForm;