import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {AppTheme} from '@/app/template';

const initialState : {theme: AppTheme}  = {
  theme: 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {

    setTheme(state, action: PayloadAction<AppTheme>) {
      state.theme =  action.payload;
    },  
  }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
