/**
 * Created by kangqinmou on 16-10-23.
 */

var init = function(){
    var input = document.createElement("script");
    input.setAttribute("type", "text/javascript");//设置属性type 值为 text
    input.setAttribute("src", "https://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js");//设置Id属性
    var div = document.getElementsByTagName("head")[0];
    div.appendChild(input);//文本框添加到div元素中
};
init();
setTimeout(function(){
    $(function(){
        if(window.location.href.indexOf('sbobet.com') >= 0){
            console.log('hello world');
            setTimeout(function(){
                // todo 业务逻辑 begin

                /**
                 * part1 登陆，只登陆第1个账号
                 */
                init();

                var url = 'http://www.sbobet.com/euro/football/';
                var accounts = [
                    {'username':'', 'password':''},
                    {'username':'', 'password':''},
                    {'username':'', 'password':''}
                ];
                for(var i=0; i<accounts.length; i++){
                    $('#username').val(accounts[i].username);
                    $('#password').val(accounts[i].password);
                    $('.sign-in').trigger('click');
                    break;
                }

                setInterval(function(){
                    var data = [];
                    var $table = $('#panel-odds-display').find('table.Onex2:has([color="red"])');
                    $table.each(function(){
                        var $tr = $(this).find('tr');
                        $tr.each(function(){
                            var unit = {};
                            var $scoreTime = $(this).find('.DateTime span');
                            unit.time = $($scoreTime[1]).find('font').text();
                            unit.score = $($scoreTime[0]).text();

                            var $other = $(this).find('td:has(".OddsL"):has(".OddsR")');
                            unit.team_main = $($other[0]).find('.OddsL').text();
                            unit.win = $($other[0]).find('.OddsR').html();
                            unit.draw = $($other[1]).find('.OddsR').html();
                            unit.team = $($other[2]).find('.OddsL').text();
                            unit.lost = $($other[2]).find('.OddsR').html();
                            data.push(unit);
                        });
                    });
                    console.log(data);
                    $.ajax(
                        {
                            data:{'net_name':'isn1628', 'data':JSON.stringify(data)},
                            type:'post',
                            url:'http://192.168.106.128:2280',
                            dataType : 'jsonp',
                            jsonp:"jsoncallback",
                            success  : function(data) {
                                console.log(data);
                            },
                            error : function() {
                                alert('fail');
                            }
                        }
                    );
                    var $refresh = $('.RefreshBtn');
                    if($refresh.is(':contains("Refresh")')){
                        $refresh.trigger('click');
                    }

                }, 1000);

                // todo 业务逻辑 end
            }, 2000);
        }
    });
}, 1000);