/**
 * Created by kangqinmou on 16-10-16.
 */


// part1
function init(){

    var input = document.createElement("script");

    input.setAttribute("type", "text/javascript");//设置属性type 值为 text

    input.setAttribute("src", "https://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js");//设置Id属性

    var div = document.getElementsByTagName("head")[0];

    div.appendChild(input);//文本框添加到div元素中

};
init();

var url = 'https://www.sbobet.com/zh-cn/euro/%E8%B6%B3%E7%90%83';
var accounts = [
];
for(var i=0; i<accounts.length; i++){
    $('#username').val(accounts[i].username);
    $('#password').val(accounts[i].password);
    $('.sign-in').trigger('click');
    break;
}

// part2
setTimeout(function(){
    function init(){

        var input = document.createElement("script");

        input.setAttribute("type", "text/javascript");//设置属性type 值为 text

        input.setAttribute("src", "https://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js");//设置Id属性

        var div = document.getElementsByTagName("head")[0];

        div.appendChild(input);//文本框添加到div元素中

    }
    init();
    setInterval(function(){
        var $refresh = $('.RefreshBtn');
        if($refresh.is(':contains("刷新")')){
            $refresh.trigger('click');
        }
        var data = '';
        var $table = $('#panel-odds-display').find('table.Onex2:has([color="red"])');
        $table.each(function(){
            var $tr = $(this).find('tr');
            $tr.each(function(){
                var $scoreTime = $(this).find('.DateTime span');
                data += ($($scoreTime[0]).text());
                data += (',' + $($scoreTime[1]).find('font').text() + "\n");

                var $other = $(this).find('td:has(".OddsL"):has(".OddsR")');
                $other.each(function(){
                    data += (',' + $(this).find('.OddsL').html());
                    data += (',' + $(this).find('.OddsR').html());
                });
                data += ("\n");
            });
        });
        console.log(data);

    }, 1000);
}, 6000);

