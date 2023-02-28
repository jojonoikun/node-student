$(function(){
	//document.getElementById('tb')
	//将id为tb的元素渲染成一个bootstapTable组件
	$('#tb').bootstrapTable({
		url: 'http://localhost:9001/ld',//从后台请求数据的路径
		method: 'get',//请求方式(get和post)
		contentType: "application/x-www-form-urlencoded",
		dataType: 'json',
		toolbar: '',//工具栏的id
		striped: true,//是否显示斑马线
		cache: false,//是否使用缓存
		pagination: true,//是否显示分页工具栏
		sortable: false,//是否启用排序
		sortOrder: 'asc',//排序的方式:顺序排列asc和倒序排列desc
		queryParams: function(ps){//查询参数
			//获取右边输入框中输入的查询条件
			var sn = ps.search;
			var rows = ps.limit;//页面大小
			//console.log('每页显示' + rows + '条数据');
			var page = (ps.offset / rows) + 1;//页码
			//console.log('当前显示第' + page + '页的数据');
			return {//将数据传到后台程序中
				page,
				rows,
				search: sn
			};
		},
		sidePagination: 'server',//分页方式：client/server
		pageNumber: 1,//默认显示第几页的数据
		pageSize: 10,//每页显示几条数据
		pageList: [3,5,10],//提供一个可以选择每页显示几条数据的下拉框
		search: true,
		strictSearch: true,
		showColumns: true,//是否显示所有的列
		showRefresh: true, //是否显示刷新按钮
		minimumCountColumns: 2, //最少允许的列数
		clickToSelect: true, //是否启用点击选中行
		height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: 'id', //每一行的唯一标识，一般为主键列
		showToggle: true, //是否显示详细视图和列表视图的切换按钮
		cardView: false, //是否显示详细视图
		detailView: false, //是否显示父子表
		onClickRow: function (row) {//点击某一行时触发的函数
			
		},
		columns: [{
			checkbox: true
		}, {
			field: 'id',
			title: '编号'
		}, {
			field: 'sname',
			title: '姓名'
		}, {
			field: 'sex',
			title: '性别'
		}, {
			field: 'birth',
			title: '生日'
		}, {
			field: 'mobile',
			title: '手机'
		}]
	});
	//给日期控件绑定点击事件
	$('#birth').datetimepicker({
		format: 'YYYY-MM-DD',
		locale: moment.locale('zh-cn')
	});
	$('#addBtn').click(() => {
		//表单序列化获取表单中提交的数据
		let arr = $('.form-horizontal').serializeArray();
		let ps = arr.reduce((p,item) => {
			p[item.name] = item.value; 
			return p;
		},{});
//		console.log(arr);
//		console.log(ps);
		//提交ajax请求
		$.ajax({
			url: 'http://localhost:9001/save',
			method: 'post',
			dataType: 'json',
			data: ps,
			success: data => {
				if(data.ret > 0) {
					//关闭新增窗口
					$('#addModal').modal('hide');
					//刷新表格
					$("#tb").bootstrapTable('refresh');
				}
			}
		});
	});
	$('#toAdd').click(() => {
		//恢复表单初始内容
		$('.form-horizontal')[0].reset();
		$('#addModal').modal('show');
	});	
	$('#toUpate').click(() => {
		//判断是否选中了一条记录
		let rows = $('#tb').bootstrapTable('getSelections');
		if(rows.length === 1) {	
			//获取选中记录的id
			let id = rows[0].id;
			$.ajax({
				url: 'http://localhost:9001/detail',
				method: 'get',
				dataType: 'json',
				data: {id},
				success: data => {
					//将数据显示到表单中
					$('input[name="id"]').val(data.id);
					$('input[name="sname"]').val(data.sname);
					$('input[name="birth"]').val(data.birth);
					$('input[name="mobile"]').val(data.mobile);
					let sex = $('input[name="sex"]');
					$.each(sex, (i,s) => {
						if(data.sex === $(s).val()) {
							s.checked = true;
						}
					});
		            $('#addModal').modal('show');
				}
			});
		} else {
			alert('每次只能选择一条记录进行修改!');
		}
	});
	$('#delBtn').click(() => {
		let rows = $('#tb').bootstrapTable('getSelections');
		if(rows.length === 1) {
			let {id} = rows[0];
			$.ajax({
				url: 'http://localhost:9001/del',
				method: 'get',
				dataType: 'json',
				data: {id},
				success: data => {
					if(data.ret > 0) {
						$("#tb").bootstrapTable('refresh');
					}
				}
			});
		} else {
			alert('一次只能选择一条记录进行删除!');
		}
	});
})
