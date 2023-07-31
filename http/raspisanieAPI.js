import { $host } from "./index"


export const getOneUserAllRaspisanie = async (group) => {
	const { data } = await $host.get('/api/raspisanie/all', {
		params: {
			group
		}
	})
	return data
}