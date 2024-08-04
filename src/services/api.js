import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api

let fetched = 0;
const username = Math.random()

export const getElement = async() =>{
    try{
        const response = await api.get(`/getelement/${fetched}`)
        console.log(response.status)
        if(response.status !== 204){
            fetched++
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
export const fetchAll = async() =>{
    try{
        const response = await api.post('/fetchall')
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
export const restartCounting = async() => {
    //let my_ids = []
    fetched = 0
}