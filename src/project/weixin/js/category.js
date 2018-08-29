var categorys;
function initCategory() {
	categorys =  [
		{id:"2569",name:"鲜花绿植",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/fcee122c-6bfa-4927-aa29-b19682509599.jpg",childrens:[
		]}
		,{id:"2571",name:"家居用品",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/7af959c3-7d14-425f-a8c8-7b6dd9692aab.jpg",childrens:[
		]}
		,{id:"2572",name:"日化用品",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/8d18af61-0d00-449b-a604-b4254a955488.jpg",childrens:[
		]}
		,{id:"2573",name:"粮油调味",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/987a8552-e695-438f-bc52-8b00ef86a00b.jpg",childrens:[
		]}
		,{id:"2565",name:"卤味特产",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/f32fe68e-3fe1-4602-91ce-e9730fa154e2.jpg",childrens:[
		]}
		,{id:"2566",name:"水果山珍",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/93104e01-5467-4bae-9f3e-b3a6601b946a.jpg",childrens:[
		]}
		,{id:"2558",name:"云南名产",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/bf1254ab-ca30-4a6c-986b-56687fbe5e6c.jpg",childrens:[
		]}
		,{id:"2559",name:"民族特产",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/13817187-d445-4a54-925d-9f8797b9a819.jpg",childrens:[
		]}
		,{id:"2560",name:"南亚特产",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/a7639452-a961-4597-b835-ea326d20989f.jpg",childrens:[
		]}
		,{id:"2561",name:"休闲零食",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/e5352cb2-176c-4de7-ae17-344be62f7617.jpg",childrens:[
		]}
		,{id:"2562",name:"酒水冲泡",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/1faba1a6-2ef0-4f45-88c1-e873507d1829.jpg",childrens:[
		]}
		,{id:"2563",name:"茶叶茶具",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/6f2e8872-8886-449a-ad64-eff1f17a4283.jpg",childrens:[
		]}
		,{id:"2564",name:"民族服饰",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/70dd2396-9bdb-4843-90c3-ae3876c6ecf4.jpg",childrens:[
		]}
		,{id:"2574",name:"创意礼品",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/68edc9a9-11d3-4ca0-8489-9a468fb56c3b.jpg",childrens:[
		]}
		,{id:"2575",name:"翡翠玉石",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/380ca983-f86e-4504-83e6-ad5be92af8a7.jpg",childrens:[
		]}
		,{id:"2576",name:"户外出行",tag:"0",image:"http://cdn.qicailiyou.com/upload/image/201704/c48631af-32c2-42d3-9684-4dc0d6f08d1b.jpg",childrens:[
		]}
	];
}

function getCategoryChildRens(id) {
	for(var i=0;i<categorys.length;i++)
	{
		if (categorys[i].id==id) {
			return categorys[i].childrens;
		}
	}
}
