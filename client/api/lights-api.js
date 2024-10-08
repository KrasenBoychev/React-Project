import * as api from './requester.js';

const host = api.settings.host;

export async function getLightById(id) {
    return await api.get(host + '/data/light/' + id);
}

export async function getCatalogLights() {
    return await api.get(host + '/data/catalog/' + api.adminId);
}

export async function getProfileLights() {
    const ownerId = localStorage.getItem('auth') !== null
        ? JSON.parse(localStorage.getItem('auth')).userId
        : 'noUser';
        
    return await api.get(host + '/data/profile/' + ownerId);
}

export async function getMarketplaceLights() {
    const ownerId = localStorage.getItem('auth') !== null
        ? JSON.parse(localStorage.getItem('auth')).userId 
        : 'noUser';

    return await api.get(host + '/data/marketplace/' + ownerId);
}

export async function createRecord(data) {
    return await api.post(host + '/data/light', data);
}

export async function editRecord(id, data) {
    return await api.put(host + '/data/light/' + id, data);
}

export async function deleteRecord(id) {
    return await api.del(host + '/data/light/' + id);
}

export async function decreaseQuantities(lightId) {
    return await api.post(host + '/data/light/decreaseQty/' + lightId);
}

export async function increaseQuantities(lightId) {
    return await api.post(host + '/data/light/increaseQty/' + lightId);
}