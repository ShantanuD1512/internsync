import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerStudent = createAsyncThunk('student/register', async (formData, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:8082/api/student/register', {
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

const studentSlice = createSlice({
  name: 'student',
  initialState: { loading: false, error: null, success: false },
  reducers: {
    resetStudentStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetStudentStatus } = studentSlice.actions;
export default studentSlice.reducer;
