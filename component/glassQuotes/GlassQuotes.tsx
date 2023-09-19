"use client"
import React from 'react';
import {useAppSelector} from '@/store/hooks';
import {AppTheme} from '@/app/template';
import styled from 'styled-components';

function GlassQuotes() {
  const {theme} = useAppSelector(state => state.theme);

  const GlassContainer = styled.div<{$theme: AppTheme}>`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    background: ${props => props.$theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(22, 26, 30)'};
  `;

  const GlassHead = styled.div<{$theme: AppTheme}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 16px!important;
    color: ${props => props.$theme === 'light' ? 'rgb(30, 35, 41)' : 'rgb(234, 236, 239)'};
    border-bottom: ${props => props.$theme === 'light' ? '2px solid rgb(238, 240, 242)' : '2px solid rgb(37, 41, 48)'};
  `;

  const GlassItem = styled.div<{$theme: AppTheme}>`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border-bottom: ${props => props.$theme === 'light' ? '1px solid rgb(238, 240, 242)' : '1px solid rgb(37, 41, 48)'};
  `;

  const GlassSpread = styled(GlassItem)<{$theme: AppTheme}>`
    padding: 20px;
    background: ${props => props.$theme === 'light' ? 'rgb(238, 240, 242)' : 'rgb(37, 41, 48)'}!important;
  `;

  const GlassItemSell = styled(GlassItem)<{$theme: AppTheme}>`
    .price{
      color: #ef5350;
    }
  `;

  const GlassItemBuy = styled(GlassItem)<{$theme: AppTheme}>`
    .price{
      color: #4caf50;
    }
  `;

  return ( 
    <GlassContainer $theme={theme}>
      <GlassHead $theme={theme}>
        <span>Цена(USDT)</span>
        <span>Сумма(USDT)</span>
      </GlassHead>
      <div>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
        <GlassItemSell $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemSell>
      </div>
      <GlassSpread $theme={theme}>
        <span>0.0975</span>
        <span>0.0975</span>
      </GlassSpread>
      <div>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
        <GlassItemBuy $theme={theme}>
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </GlassItemBuy>
      </div>
    </GlassContainer>
  );
}

export default GlassQuotes;