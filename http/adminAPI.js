import { $authHost } from "./index"


export const creatRaspisanie = async (obj) => {
	const { data } = await $authHost.post('/api/raspisanie', obj)
	return data
}

export const getOneRaspisanie = async (group) => {
	const { data } = await $authHost.get('/api/raspisanie', {
		params: {
			group
		}
	})
	return data
}

export const editRaspisanie = async (obj) => {
	const { data } = await $authHost.put('/api/raspisanie', obj)
	return data
}
export const deleteRaspisanie = async (id) => {
	const { data } = await $authHost.delete('/api/raspisanie', {
		params: {
			id: id
		}
	})
	return data
}

export const addAdminDz = async (obj) => {
	const { data } = await $authHost.post('/api/dz', obj)
	return data
}

export const deleteAdminDzOneUser = async (id) => {
	const { data } = await $authHost.delete('/api/dz/' + id)
	return data
}


export const dnevnikAdmin = async (obj) => {
	const { data } = await $authHost.post('/api/ocenka', obj)
	return data
}

export const addVideoAdmin = async (obj) => {
	const { data } = await $authHost.post('/api/video', obj)
	return data
}
export const deleteOneVideoAdmin = async (id) => {
	const { data } = await $authHost.delete('/api/video/' + id)
	return data
}


export const addPayAdmin = async (obj) => {
	const { data } = await $authHost.post('/api/pay', obj)
	return data
}
export const updatePayAdmin = async (obj) => {
	const { data } = await $authHost.put('/api/pay/update', obj)
	return data
}

export const getOneUserAdmin = async (name) => {
	const { data } = await $authHost.get('/api/user/info', {
		params: {
			name
		}
	})
	return data
}

