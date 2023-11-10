// const apiUrl = 'http://localhost:3001/auth';

// export const authProvider = {
//   login: async ({ username, password }) => {
//     const request = new Request(`${apiUrl}/login`, {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: new Headers({ 'Content-Type': 'application/json' }),
//     });

//     try {
//       const response = await fetch(request);


//       const { token } = await response.json();
//       localStorage.setItem('token', token);
//     } catch (error) {
//       throw new Error('Invalid credentials');
//     }
//   },

//   logout: () => {
//     localStorage.removeItem('token');
//     return Promise.resolve();
//   },

//   checkAuth: () => {
//     return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
//   },

//   checkError: (error) => {
//     const status = error.status;
//     if (status === 401 || status === 403) {
//       localStorage.removeItem('token');
//       return Promise.reject();
//     }
//     return Promise.resolve();
//   },

//   getIdentity: () => {
//     try {
//       const token = localStorage.getItem('token');
//       const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
//       return Promise.resolve({ id: payload.sub, fullName: payload.username });
//     } catch (error) {
//       return Promise.reject();
//     }
//   },
// };

