"use client"
import { useState, useEffect, useRef, useMemo } from 'react';
import { createChart } from 'lightweight-charts';
import config from '@/config/lightweight-charts.json';
import axios from 'axios';
import { AppTheme } from '@/app/template';
import { TimeframeType, FormatDataType, DataType } from '@/types/lightweight-charts';
import { useAppSelector } from '@/store/hooks';
import styled from 'styled-components';
const now:number = Math.ceil(Date.now() / 1000);

const ChartsContainer = styled.div<{$theme: AppTheme}>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40px 1fr;
`;

const ChartControl = styled.div<{$theme: AppTheme}>`
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding:0 5px;
  border-bottom: ${props => props.$theme === 'light' ? '2px solid rgb(238, 240, 242)' : '2px solid rgb(37, 41, 48)'};
`;

const Span = styled.span<{$theme: AppTheme}>`
  cursor: pointer;
  color: ${props => props.$theme === 'light' ? 'rgb(30, 35, 41)' : 'rgb(234, 236, 239)'}; 

  &.active{
    color: ${props => props.$theme === 'light' ? 'rgb(201, 148, 0)' : 'rgb(240, 185, 11)'};
  }

  &:hover{
    color: ${props => props.$theme === 'light' ? 'rgb(201, 148, 0)' : 'rgb(240, 185, 11)'};
  }
`;

function LightweightCharts({name}:{name:string}) {
  const {theme} = useAppSelector(state => state.theme);
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
      containerRef.current.innerHTML = '';
      const response = await axios.get(process.env.serverUrl + '/sources/alor/market_data', {
        params: {
          symbol__name:name,
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

        let chartTheme = theme === 'light' ? config.light : config.dark;
        const chart = createChart(containerRef.current, chartTheme as any);
        const candlestickSeries = chart.addCandlestickSeries(config.candlestickSeries);
        candlestickSeries.setData(formatArray);

        setInterval(async () => {
          const response = await axios.get(process.env.serverUrl + '/sources/alor/market_data', {
            params: {
              symbol__name:name,
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

    /*
    window.addEventListener('resize', () => {
      containerRef.current.innerHTML = '';
      getData(now, dategap);
    });
    */
    getData(now, dategap);
    
  },[timeFrame, theme]);

  const changeTimeFrame = (time:TimeframeType):void => {
    if(time !== timeFrame){
      containerRef.current.innerHTML = '';
      setTimeFrame(time);
    }
  }

  return (
    <ChartsContainer $theme={theme}>
      <ChartControl $theme={theme}>
        <p>Время</p>
        <Span 
          $theme={theme} 
          className={timeFrame === 60 ? 'active' : ''}
          onClick={() => changeTimeFrame(60)}
          color="secondary">1m</Span>
        <Span 
          $theme={theme} 
          className={timeFrame === 300 ? 'active' : ''}
          onClick={() => changeTimeFrame(300)}
          color="secondary">5m</Span>
        <Span
          $theme={theme} 
          className={timeFrame === 900 ? 'active' : ''}
          onClick={() => changeTimeFrame(900)}   
          color="secondary">15m</Span>
        <Span
          $theme={theme} 
          className={timeFrame === 3600 ? 'active' : ''}
          onClick={() => changeTimeFrame(3600)}  
          color="secondary">1h</Span>
        <Span
          $theme={theme} 
          className={timeFrame === 86400 ? 'active' : ''}
          onClick={() => changeTimeFrame(86400)} 
          color="secondary">1d</Span>
      </ChartControl>
      <div style={{width:'100%', height:'100%'}} ref={containerRef}></div>
    </ChartsContainer>
  );
}

export default LightweightCharts;