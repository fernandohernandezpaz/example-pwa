import {createSlice} from '@reduxjs/toolkit'

export const userSlide = createSlice({
    name: 'user',
    initialState: {
      // value: {
          id: null,
          token: null,
          email: null,
          username: ''
      // }
    },
    reducers: {
        setUserData: (state, action) => {
            state = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlide.actions

export default userSlide.reducer