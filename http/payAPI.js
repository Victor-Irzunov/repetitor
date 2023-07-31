import { $host } from "./index"

export const getPayUser = async (id) => {
	const { data } = await $host.get('/api/pay/' + id)
	return data
}
