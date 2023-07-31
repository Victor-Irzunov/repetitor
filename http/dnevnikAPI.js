import { $host } from "./index"


export const dataDnevnik = async (group) => {
	const { data } = await $host.get('/api/dnevnik', {
		params: {
			group
		}
	})
	return data
}


export const dataOneUserDnevnik = async (id) => {
	const { data } = await $host.get('/api/dnevnik/one/' + id)
	return data
}
