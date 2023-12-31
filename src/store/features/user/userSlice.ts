import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserApi } from '../../../typescript/interfaces/user.interface'

const initialState: UserApi = {
  user: null,
  isAuthenticated: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserApi>) => {
      state.user = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
    }
  }
})

export const { setUserData } = userSlice.actions
export default userSlice.reducer
