/**
 * Created by kangqinmou on 16-10-15.
 */

$('<script type="text/javascript" src="http://www.kangqinmou.com/jquery.js"></script>').appendTo('head');
var data = '';
$('.event').each(function(){
    var $shuang = $(this).find('.btmarket__link-name span');
    $shuang.each(function(){
        data += (',' + $(this).html());
    });
    $(this).find('.betbutton__odds').each(function(){
        data += (',' + $(this).html());
    });
    data += "\n";
});
var data = 12;
$.ajax(
    {
        data:{'data':data},
        type:'post',
        url:'http://192.168.31.169',
        dataType : 'jsonp',
        //jsonp:"jsoncallback",
        success  : function(data) {
            console.log(data);
        },
        error : function() {
            alert('fail');
        }
    }
);
