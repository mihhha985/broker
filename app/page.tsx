"use client"
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { AppTheme } from '@/app/template';
import { useAppSelector } from '@/store/hooks';
import styled from 'styled-components';
import axios from 'axios';

type DataType = {
  exchange: string,
  name: string,
  title: string,
  source: string
}

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto; 
  padding: 40px 5%;
`;

const GridItem = styled.div`
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  align-items: center;

  p{
    padding-left: 10px;
    margin: 0;
  }
`;

const GridHeadBox = styled(GridItem)<{$theme: AppTheme}>`
  height: 40px;
  background-color:${props => props.$theme === 'light' ?  'rgb(238, 240, 242)' : 'rgb(37, 41, 48)'};
  color: :${props => props.$theme === 'light' ?  'rgb(30, 35, 41)' : 'rgb(37, 41, 48)'};
`;

const GridItemRow = styled(GridItem)<{$theme: AppTheme}>`
  height: 60px;
  border-bottom: ${props => props.$theme === 'light' ? '1px solid rgba(0,0,0,.1)' : '1px solid rgba(255,255,255,.1)'};
  transition: background-color .2s;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$theme === 'light' ? 'rgba(0,0,0,.1)' : 'rgba(255,255,255,.1)'};
  }
`;


export default function Home() {
  const router = useRouter();
  const {theme} = useAppSelector(state => state.theme);
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
    <GridContainer>
      <GridHeadBox $theme={theme}>
        <p>Наименование</p>
        <p>Цена</p>
        <p>Изменение</p>
        <p>Объём %</p>
        <p>Капитализация</p>
      </GridHeadBox>
      {data?.map((row:DataType) => (
        <GridItemRow 
          $theme={theme}
          onClick={() => router.push(`/tools/${row.name}?exchange=${row.exchange}`)}
          key={row.name}
        >
          <p>{row.exchange}:{row.name}</p>
          <p>192.1</p>
          <p>0.06%</p>
          <p>0.1%</p>
          <p>0.16</p>
        </GridItemRow>
      ))}
    </GridContainer>
  )
}
