import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api

let fetched = 0;
const username = Math.random().toString()

export const getElement = async() =>{
    try{
        const response = await api.get(`/getelement/${fetched}`)
        if(response.status === 200){
            fetched = fetched + response.data.length
            //console.log(response.data.length)
            return response.data
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
    //let my_ids = []
    fetched = 0
}

export const update = async() =>{
    try{
        const response = await api.get(`/update/${username}`)
        return response.data
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