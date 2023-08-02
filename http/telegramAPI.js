import axios from 'axios'
//мои
// const token = '5562126487:AAGqX2TBd3toX15OgSCQ2yW55RNfgtBWQko'
// const chat_id = '-1001794221917'

//клиент
// const token = '5562126487:AAGqX2TBd3toX15OgSCQ2yW55RNfgtBWQko'
// const chat_id = '-1001794221917'
// const uri_api = `https://api.telegram.org/bot${token}/sendMessage`



// export const sendOrderTelegram = async (obj) => {
// 	const { data } = await axios.post(uri_api, {
// 		chat_id,
// 		parse_mode: 'html',
// 		text: obj,
// 	})
// 	return data
// }

// const token = '6645910883:AAEkeCyV7n0QUJ6l-qItWQp-f7GN5nzNhgQ'
// const chat_id = '-906394776'
// const uri_api = `https://api.telegram.org/bot${token}/sendMessage`

export const sendOrderTelegram = async ({ text, token, chat_id }) => {
	const uri_api = `https://api.telegram.org/bot${token}/sendMessage`

	const { data } = await axios.post(uri_api, {
		chat_id,
		text,
		parse_mode: 'html'
	})

	return data
}




