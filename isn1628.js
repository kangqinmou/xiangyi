/**
 * Created by kangqinmou on 16-10-23.
 */


$(function(){
    if(window.location.href.indexOf('isn1628.com') >= 0){
        console.log('hello world');
        setTimeout(function(){
            // todo 业务逻辑 begin

            /**
             * part1 (暂无)登陆，只登陆第1个账号
             */
            var accounts = [
                {'username':'', 'password':''},
                {'username':'', 'password':''},
                {'username':'', 'password':''}
            ];
            var url = 'http://isn1628.com/membersite/zh-CN/login.jsp';
            for(var i=0; i<accounts.length; i++){
                break;
            }

            /**
             * part2 获取数据
             */
            $('#market-2-1').trigger('click');

            setInterval(function(){
                var data = [];
                var $table = $('table.tablecontent.normal tbody:has(".red-bold")').first();
                var $tr = $table.find('tr.td-center.togglerow');
                $tr.each(function(){
                    var $td = $(this).find('td');
                    var unit = {};

                    // 比分，时间
                    var $td0 = $($td[0]);
                    var score = $td0.find('span').first().text();
                    var time  = $td0.find('span').last().text();
                    // console.log(score + '  ' + time);

                    // 主队，客队
                    var $td1 = $($td[1]);
                    var team_main = $td1.find('span.team-name span.team-name-wrap[title]').first().text();
                    var team = $td1.find('span.team-name span.team-name-wrap[title]').last().text();
                    unit.team_main = team_main;
                    unit.team = team;
                    unit.score = score;
                    unit.time = time;
                    // console.log(team_main + '  ' + team);

                    // 赢平输
                    var $td4 = $($td[4]);
                    var fields = ['win', 'draw', 'lost'];
                    for(var i=0; i<3; i++){
                        if($($td4.find('a')[i]).length > 0){
                            unit[fields[i]] = $($td4.find('a')[i]).text();
                        }else{
                            unit[fields[i]] = '';
                        }
                    }
                    // console.log(unit.win + '  ' + unit.draw + '  ' + unit.lost);

                    var $td7 = $($td[7]);
                    var half_fields = ['half_win', 'half_draw', 'half_lost'];
                    for(var j=0; j<3; j++){
                        if($($td7.find('a')[j]).length > 0){
                            unit[half_fields[j]] = $($td7.find('a')[j]).text();
                        }else{
                            unit[half_fields[j]] = '';
                        }
                    }
                    //console.log(unit.half_win + '  ' + unit.half_draw + '  ' + unit.half_lost);

                    data.push(unit);
                });
                console.log(data);
                // 刷新
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
                var $btn = $('a.button-lgrey.refreshEvents');
                if($btn.is(':has(img[src="images/icon-refresh.png"])')){
                    $btn.trigger('click');
                }

            }, 5000);

            // todo 业务逻辑 end
        }, 3000);
    }
});