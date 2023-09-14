// TradingViewWidget.jsx
"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

type DataType = {
  close_price: string,
  high_price: string,
  low_price: string,
  open_price: string,
  time_frame: number,
  timestamp: number,
  tool_market: string,
  tool_name: string,
  volume: string
}

type FormatDataType = {
  time: string,
  open: number,
  high: number,
  low:  number,
  close: number,
}

type TimeframeType = 60 | 300 | 900 | 3600 | 86400;

export default function TradingViewWidget({ params }: { params: { alias: string } }) {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [timeFrame, setTimeFrame] = useState<TimeframeType>(3600);
  //const time_frame = 60; //300; //900; //3600; //86400;
  //const timestamp__lte = 1693267200;
  //const timestamp__gte = 1627776000;
  useEffect(() => {
    async function getData() { 
      const now:number = Math.ceil(new Date().getTime() / 1000);
      const dategap:number = now - 60 * 60 * 24 * 30;
      /*
      if(timeFrame === 60) dategap = 60 * 60;
      if(timeFrame === 300) dategap = 60 * 60 * 24;
      if(timeFrame === 900) dategap = 60 * 60 * 24 * 2;
      if(timeFrame === 3600) dategap = 60 * 60 * 24 * 7;
      if(timeFrame === 86400) dategap = 60 * 60 * 24 * 30;
      */
      const response = await axios.get(process.env.serverUrl + '/sources/alor/market_data', {
        params: {
          symbol__name:params.alias,
          time_frame: timeFrame,
          timestamp__lte: now,
          timestamp__gte:dategap,
        }
      });
      
      if(response.status === 200){
       
        const formatArray = response.data.results
        .sort((a:DataType, b:DataType) => a.timestamp - b.timestamp)
        .map((item:DataType) => {
          return {
            time: item.timestamp,
            open: +item.open_price,
            high: +item.high_price,
            low: +item.low_price,
            close: +item.close_price,
          };
        });

        
        //console.log('now: ' + new Date(now * 1000).toISOString().slice(0, 10));
        //console.log('dategap: ' + new Date(dategap * 1000).toISOString().slice(0, 10));
        candlestickSeries.setData(formatArray);

        setInterval(async () => {
          const now:number = Math.ceil(Date.now() / 1000);
          const dategap:number = now - 60 * 60 * 24 * 30;
          console.log('date: ' + new Date().toISOString());
          console.log(formatArray[formatArray.length - 1]);
          const response = await axios.get(process.env.serverUrl + '/sources/alor/market_data', {
            params: {
              symbol__name:params.alias,
              time_frame: timeFrame,
              timestamp__lte: now,
              timestamp__gte:dategap,
            }
          });
          
          if(response.status === 200){
           
            const formatArray = response.data.results
            .sort((a:DataType, b:DataType) => a.timestamp - b.timestamp)
            .map((item:DataType) => {
              return {
                time: item.timestamp,
                open: +item.open_price,
                high: +item.high_price,
                low: +item.low_price,
                close: +item.close_price,
              };
            });

            candlestickSeries.update(formatArray[formatArray.length - 1]);  
          }
        }, 1000 * 60);

      
        chart.timeScale().fitContent();
      }
    }
    
    
    const chartOptions = { layout: { textColor: '#fff', background: {type:'solid', color: '#03a9f4'} } };
    const chart = createChart(containerRef.current, chartOptions as any);
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#fff', downColor: '#7b1fa2', borderVisible: true, borderColor: '#fff',
      wickUpColor: '#fff', wickDownColor: '#7b1fa2',
    });
    
    getData();
  },[timeFrame]);

  const changeTimeFrame = (time:TimeframeType):void => {
    if(time !== timeFrame){
      containerRef.current.innerHTML = '';
      setTimeFrame(time);
    }
  }

  return (
    <Box sx={{width:"980px", margin:"2rem auto"}}>
       <Breadcrumbs 
        sx={{marginBottom:"1rem"}}
        aria-label="breadcrumb">
        <Link href="/">
          Main
        </Link>
        <Typography color="text.primary">{params.alias}</Typography>
      </Breadcrumbs>
      <Grid display={'flex'} columnGap={1} mb={1}>
        <Button 
          onClick={() => changeTimeFrame(60)}
          variant={timeFrame === 60 ? "contained" : "outlined"} 
          color="secondary">1m</Button>
        <Button 
          onClick={() => changeTimeFrame(300)}
          variant={timeFrame === 300 ? "contained" : "outlined"}
          color="secondary">5m</Button>
        <Button
          onClick={() => changeTimeFrame(900)} 
          variant={timeFrame === 900 ? "contained" : "outlined"}  
          color="secondary">15m</Button>
        <Button
          onClick={() => changeTimeFrame(3600)} 
          variant={timeFrame === 3600 ? "contained" : "outlined"}  
          color="secondary">1h</Button>
        <Button
          onClick={() => changeTimeFrame(86400)} 
          variant={timeFrame === 86400 ? "contained" : "outlined"}  
          color="secondary">1d</Button>
      </Grid>
      <div style={{width:'100%', height:'500px'}} ref={containerRef}></div>
    </Box>
  );
}
