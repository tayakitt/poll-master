$(document).ready(function(){

	//get polls and groups
	pollList();
	groupList();

	//table filter
	$('.btn-filter').on('click', function () {
		var $target = $(this).data('target');

		if ($target != 'all') {
			$('.table tr-filter').css('display', 'none');
			$('.table tr-filter[data-status="' + $target + '"]').fadeIn('slow');
		} else {
			$('.table tr-filter').css('display', 'none').fadeIn('slow');
		}
	});

	//update favourite
	$('.star').on('click', function () {
		if($(this).hasClass('star-checked')){
			var action='delete';
		}else{
			var action='insert';
		}

		//$(this).toggleClass('star-checked');

		var favsid=$(this).closest('tr').data('sid');
		//UPDATE or DELETE?
		$.ajax({
			url: 'php/updateFav.php',
			type: 'POST',
			dataType: 'json',
			data: {
				userid: '1',
				sid: favsid,
				action: action
			},
			success: function(){
				$(this).toggleClass('star-checked');
			},
			error: function(){
				console.log("error in updateFav.php");
			}
		})
	});

	//add poll
	$('button[data-target="addPoll"]').on('click', function(){
		//pass uid
		//redirect to next page
	});

	//add group
	$('button[data-target="addGroup"]').on('click', function(){
		//pass uid
		//redirect to next page
	});

	//click on a poll or group
	$('.table-filter tbody tr').on('click', function(){
		//find if it's from pollList or GroupList
		//pass sid, gid, uid
	});


});

//global var
var username='';

//display pollList on home page
function pollList(){
	//ajax call get all poll questions from specific user
	$.ajax({
		url: 'php/getPolls.php',
		type: 'GET',
		dataType: 'json',
		data: {
			//userid: global.user.id;
			userid: '1'
		},
		success: function(data){
			var html='';
			$.each(data, function(index,val){
				html+='<tr class="tr-filter" data-status="'+val.status+'" data-sid='+val.sid+'>';
				html+='<td><a href="javascript:;" class="star '+ ((val.fave=='T')?'star-checked':'')+'"><i class="glyphicon glyphicon-star"></i></a></td>';
				html+='<td><div class="media">';
				html+='<a href="#" class="pull-left"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" class="media-photo"></a>';
				html+='<div class="media-body">';
				html+='<span class="media-meta pull-right">Febrero 13, 2016</span><h4 class="title">'+val.sq;
				html+='<span class="pull-right '+val.status+'">'+val.status+'</span></h4>';
				html+='<p class="summary">Group Memebers</p>';
				html+='</div></div></td></tr>';				
			});
			$('tbody#pollQuest').append(html);
		},
		error: function(){
			console.log('error in getPolls.php');
		}
	});
};

//display groupList on home page
function groupList(){
	$.ajax({
		url: 'php/getGroups.php',
		type: 'GET',
		dataType: 'json',
		data: {
			userid: '1'
		},
		success: function(data){
			var html='';
			$.each(data, function(index,val){
				html+='<tr data-gid='+val.gid+'>';
				html+='<td><div class="media"><div class="media-body">';
				html+='<span class="media-meta pull-right">'+((val.admin=='T')?'(Admin)':'')+'</span>';
				html+='<h4 class="title">'+val.gname+'</h4>';
				html+='<p class="media-meta">'+val.gmem+'</p>';
				html+='</div></div></td></tr>';
			});
			$('tbody#group').append(html);
		},
		error: function(){
			console.log('error in getGroups.php');
		}
	});
};
