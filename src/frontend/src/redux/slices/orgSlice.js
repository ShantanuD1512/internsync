import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerOrg = createAsyncThunk('org/register', async (formData, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:8083/api/org/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const orgSlice = createSlice({
  name: 'org',
  initialState: { loading: false, error: null, success: false },
  reducers: {
    resetOrgStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerOrg.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetOrgStatus } = orgSlice.actions;
export default orgSlice.reducer;
