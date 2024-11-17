import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserRole} from './UserRole.type';

interface UserState {
    role: UserRole;
}

const initialState: UserState = {
    role: UserRole.ADMIN,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<UserState['role']>) => {
            state.role = action.payload;
        },
    },
});

export const { setRole } = userSlice.actions;
export default userSlice.reducer;