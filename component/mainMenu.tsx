
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';
import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs';
import { AppTheme } from '@/app/template';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setTheme } from '@/store/features/themeSlice';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const MenuContainer = styled(FlexBox)<{$theme?:AppTheme}>`
  height: 90px;
  padding: 0 20px;
  color: ${props => props.$theme === 'light' ? 'rgb(30, 35, 41)' : 'rgb(238, 240, 242)'};
  border-bottom: ${props => props.$theme === 'light' ? '2px solid rgb(238, 240, 242)' : '2px solid rgb(37, 41, 48)'};

  a:hover {
    color: ${props => props.$theme === 'light' ? 'rgb(201, 148, 0)' : 'rgb(240, 185, 11)'};
  }
`;

const MenuLinkBox = styled(FlexBox)`
  margin-left: 40px;
`;

const MenuControlBox = styled(FlexBox)<{$theme:AppTheme}>`
  margin-left: auto;

  button {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`


function MainMenu() {
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.theme);
  const changeTheme = () => {
    if(theme === 'light') dispatch(setTheme('dark'));
    if(theme === 'dark') dispatch(setTheme('light'));
  }

  return ( 
    <MenuContainer $theme={theme}>
      <Image src={logo} alt="logo" width="100" />

      <MenuLinkBox>
        <Link href="/">Рынки</Link>
        <Link href="#">Торговля</Link>
        <Link href="#">Фьючерсы</Link>
        <Link href="#">Подробнее</Link>
      </MenuLinkBox>

      <MenuControlBox>
        <Link href="/login">Вход</Link>
        <Link href="/register">Регистрация</Link>
        <button onClick={changeTheme}>
          {theme === 'light' && <BsFillMoonFill size={16} color='rgb(30, 35, 41)' />}
          {theme === 'dark' && <BsFillSunFill size={24} color='rgb(238, 240, 242)' />}
        </button>
      </MenuControlBox>
    </MenuContainer>
  );
}

export default MainMenu;