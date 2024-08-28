import axios from "axios"

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return true;  
      } else {
        console.error('Login failed:', response.statusText);
        return false;  
      }
    } catch (error) {
      console.log(error);
      return false;  
    }
};

export const signupUser = async (name, email, password) => {
  try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      if (response.status === 201) {
          return true;
      } else {
          console.error('Signup failed:', response.statusText);
          return false;  
      }
  } catch (error) {
      console.error('Signup failed:', error);
      return false;  
  }
};

export const fetchUsers = async () => {
  try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.status === 200;
  } catch (error) {
      console.error('Failed to update user:', error);
      return false;
  }
};

export const deleteUser = async (userId) => {
  try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.status === 200;
  } catch (error) {
      console.error('Failed to delete user:', error);
      return false;
  }
};