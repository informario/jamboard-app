import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api

let fetched = 0;
const username = localStorage.getItem('username')
let updateVersion = 0;

export const getElement = async() =>{
    try{
        const response = await api.get(`/getelement/${0}`)
        if(response.status === 200){
            fetched+=response.data.size
            return response.data.elements
        }
        return false
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
export const postElement = async(data) =>{
    try{
        const response = await api.post(`/postelement/${username}`, data)
        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
export const deleteElement = async() =>{
    try{
        const response = await api.delete(`/element/${username}`)

        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
export const deleteAll = async() =>{
    try{
        const response = await api.delete(`/deleteall`)

        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
export const restartCounting = () => {
    fetched = 0
}

export const update = async() =>{
    try{
        console.log(`awaiting update, version:${updateVersion}`)
        const response = await api.get(`/update/${username}/${updateVersion}`)
        updateVersion = response.data.version
        console.log(`received update, data: ${response.data.data}`)
        return response.data.data

    }
    catch(err){
        console.error(err);
        throw err;
    }
}
export const awake = async() =>{
    try{
        const response = await api.get(`/awake`)
        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}