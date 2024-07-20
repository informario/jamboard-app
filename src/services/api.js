import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api

export const getElement = async(data) =>{
    try{
        //const data = {user_id: localStorage.getItem('user_id')}
        const response = await api.post('/getelement', data)
        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
export const postElement = async(data) =>{
    try{
        //data['user_id'] = localStorage.getItem('user_id')
        const response = await api.post('/postelement', data)
        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
export const hello = async()=>{
    try{
        const response = await api.get('/')
        localStorage.setItem("user_id", response.data.user_id)
        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}