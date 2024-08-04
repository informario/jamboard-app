import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api

let my_ids = []
let fetched = 0;

export const getElement = async() =>{
    try{
        const response = await api.get(`/getelement/${fetched}`)
        console.log(fetched)
        if(Object.keys(response.data).length){
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
        const response = await api.post('/postelement', data)
        if(response.status === 200){
            my_ids.push(response.data.id)
        }
        console.log(my_ids)
        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
export const fetchAll = async() =>{
    try{
        //const data = {user_id: localStorage.getItem('user_id')}
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
        const response = await api.delete(`/element/${my_ids[my_ids.length-1]}`)
        if(response.status === 200){
            my_ids.pop()
        }
        return response.data
    }
    catch(err){
        console.error(err);
        throw err;
    }
}