const requireApi = require.context('.', true, /.js$/);		// 使用webpack的方法进行抓取 主要是用来针对端口数据过多的情况，还有就是好分类

let moudle = {};	// 抓取的都在这个里面

requireApi.keys().forEach((key, index)=> {	//key是每一项名字requireApi(key)就是对象中对应名字的每一项
	if(key == './index.js') return 		//	遇见自己就跳过
	
	// 反之， 向moudle里面进行合并
	Object.assign(module, requireApi(key))		//	对象拼接		前面的是存放位置，后面的是存放数据, 类似于...
})

export default module		//	最后导出