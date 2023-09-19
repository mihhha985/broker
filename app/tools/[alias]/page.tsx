"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import LightweightCharts from '@/component/lightweightCharts/LightweightCharts';
import GlassQuotes from '@/component/glassQuotes/GlassQuotes';
import { useAppSelector } from '@/store/hooks';
import { AppTheme } from '@/app/template';
import styled from 'styled-components';

const ChartsContainer = styled.div<{$theme: AppTheme}>`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 90px 2fr 1fr;
  gap:2px;
  background-color: ${props => props.$theme === 'light' ? 'rgb(238, 240, 242)' : 'rgb(37, 41, 48)'};
  color: ${props => props.$theme === 'light' ? 'rgb(30, 35, 41)' : 'rgb(234, 236, 239)'}; 
  grid-template-areas: "info info tools"  
                       "glass chart tools"  
                       "glass order transaction";

  div{
    background-color: ${props => props.$theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(22, 26, 30)'};
  }
`;

const ChartInfo = styled.div<{$theme: AppTheme}>`
  grid-area: info;
  display: flex;
  align-items: center;

  h3{
    margin: 0;
    padding: 20px;
    color: ${props => props.$theme === 'light' ? 'rgb(30, 35, 41)' : 'rgb(234, 236, 239)'}; 
    border-right: ${props => props.$theme === 'light' ? '2px solid rgb(238, 240, 242)' : '2px solid rgb(37, 41, 48)'};
  }
`;

const ChartGlass = styled.div<{$theme: AppTheme}>`
  grid-area: glass;
`;

const LightCharts = styled.div<{$theme: AppTheme}>`
  grid-area: chart;
`;

const ToolList = styled.div<{$theme: AppTheme}>`
  grid-area: tools;
`;

const OrderBox = styled.div<{$theme: AppTheme}>`
  grid-area: order;
`;

const TransactionBox = styled.div<{$theme: AppTheme}>`
  grid-area: transaction;
`;

export default function Page({ params }: { params: { alias: string } }) {
  const searchParams = useSearchParams()
  const exchange = searchParams.get('exchange')
  const {theme} = useAppSelector(state => state.theme);
  return (
    <ChartsContainer $theme={theme}>
      <ChartInfo $theme={theme}>
        <h3>{exchange}:{params.alias}</h3>
      </ChartInfo>
      <ToolList $theme={theme}>ToolList</ToolList>
      <ChartGlass $theme={theme}>
        <GlassQuotes />
      </ChartGlass>
      <LightCharts $theme={theme}>
        <LightweightCharts name={params.alias} />
      </LightCharts>
      <OrderBox $theme={theme}>OrderBox</OrderBox>
      <TransactionBox $theme={theme}>TransactionBox</TransactionBox>
    </ChartsContainer>
  );
}
