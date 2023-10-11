import ajax from '../../http.js'

//获取文章列表
export const get_current_version = data => ajax ({
	name: 'get_current_version',
	data
})