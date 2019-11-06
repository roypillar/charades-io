import axios from 'axios';
import * as addresses from './addresses';

export function getArticles(from,to) {
    return axios.get(addresses.ARTICLES_ADDRESS+`?_start=${from}&_end=${to}`)//returns a promise of course
}

export function getTeams() {
    return axios.get(addresses.TEAMS_ADDRESS)//returns a promise of course
}