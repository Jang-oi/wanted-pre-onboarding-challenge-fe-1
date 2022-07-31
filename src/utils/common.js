export const token = localStorage.getItem('token');

export const axiosHeader = {headers : {Authorization : token}};

