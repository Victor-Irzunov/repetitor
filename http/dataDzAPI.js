import { $host } from "./index"


export const dataDzStudent = async (obj) => {
	const { data } = await $host.post('/api/dz/user', obj)
	return data
}
export const getDzStudent = async (group) => {
	const { data } = await $host.get('/api/dz/user', {
		params: {
			group
		}
	} )
	return data
}
export const getAllAdminDzStudents = async (group) => {
	const { data } = await $host.get('/api/dz/user/all', {
		params: {
			group
		}
	} )
	return data
}