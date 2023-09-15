// TradingViewWidget.jsx
"use client"
import { useState, useEffect, useRef, useMemo } from 'react';
import { createChart } from 'lightweight-charts';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import config from '@/config/lightweight-charts.json';
import axios from 'axios';
import { TimeframeType, FormatDataType, DataType } from '@/types/lightweight-charts';
const now:number = Math.ceil(Date.now() / 1000);

export default function TradingViewWidget({ params }: { params: { alias: string } }) {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [timeFrame, setTimeFrame] = useState<TimeframeType>(3600);
  const now:number = Math.ceil(Date.now() / 1000);
  const dategap:number = useMemo(() => {
    let result;
    result = now - 60 * 60 * 24 * 30;
    if(timeFrame === 86400) result = now - 60 * 60 * 24 * 30 * 12;
    return result;
  },[timeFrame]);

  useEffect(() => {
    async function getData(now:number, dategap:number):Promise<void> {

      const response = await axios.get(process.env.serverUrl + '/sources/alor/market_data', {
        params: {
          symbol__name:params.alias,
          time_frame: timeFrame,
          timestamp__lte: now,
          timestamp__gte:dategap,
        }
      });
      
      if(response.status === 200){
       
        const formatArray:FormatDataType[] = response.data.results
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

        
        const chart = createChart(containerRef.current, config.chart as any);
        const candlestickSeries = chart.addCandlestickSeries(config.candlestickSeries);
        candlestickSeries.setData(formatArray);

        setInterval(async () => {
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
      }
    }
    
    getData(now, dategap);
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
