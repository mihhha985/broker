"use client"
import {useEffect} from "react";
import MainMenu from "@/component/mainMenu";
import { useAppSelector } from "@/store/hooks"; 
import './globals.css';

export type AppTheme = 'light' | 'dark';

export default function Template({ children }: { children: React.ReactNode }) {

  const {theme} = useAppSelector(state => state.theme);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    if(theme === 'light') body.className = 'light-theme';
    if(theme === 'dark') body.className = 'dark-theme';
    console.log(theme);
  }, [theme]);

  return(
    <>
      <MainMenu />
      {children}
    </>
  );
}