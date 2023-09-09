// TradingViewWidget.jsx
"use client"
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

let tvScriptLoadingPromise;

export default function TradingViewWidget({ params }) {
  const onLoadScriptRef = useRef();
  useEffect(() => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_8b219') && 'TradingView' in window) {
          new window.TradingView.widget({
            width: 980,
            height: 610,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "ru",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_8b219"
          });
        }
      }
  },[]);

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
      <div id='tradingview_8b219' />
    </Box>
  );
}
