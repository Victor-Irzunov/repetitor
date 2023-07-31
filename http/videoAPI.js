import { $host } from "./index"



export const getVideoGroup = async (group) => {
	const { data } = await $host.get('/api/video', {
		params: {
			group
		}
	})
	return data
}
