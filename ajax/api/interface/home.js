// 引入ajax
import ajax from '../../http.js'

// 从右向左一次赋值
export const get_label_list = data => ajax({ // 自定义的名字
	name: 'get_label_list', // 云函数的名字
	data
})

// 获取文章列表
export const get_article_list = data => ajax({
	name: 'get_article_list',
	data
})

//	添加/取消收藏
export const update_save_like = data => ajax({
	name: 'update_save_like',
	data
})

// 获取搜索文章内容
export const get_search_data = data => ajax({
	name: 'get_search_data',
	data
})

// 修改用户保存的选项卡标签
export const update_label_ids = data => ajax({
	name:'update_label_ids',
	data
})

// 获取文章详情
export const get_article_detail = data => ajax({
	name:'get_article_detail',
	data
})

// 修改文章评论内容
export const update_comment = data => ajax({
	name: 'update_comment',
	data
})

// 获取文章的评论列表
export const get_comments = data => ajax ({
	name: 'get_comments',
	data
})