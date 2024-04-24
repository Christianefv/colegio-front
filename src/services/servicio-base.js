import axios from 'axios'
import configService from './config'

const servicio = axios.create({
	baseURL: configService.apiUrl,
})

servicio.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		console.error('Ocurrió un error al realizar la petición al servidor:', error);
		return Promise.reject(error);
	}
);

servicio.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		console.error('Ocurrió un error al procesar la petición del servicio:', error);
		return Promise.reject(error);
	}
);

export default servicio;