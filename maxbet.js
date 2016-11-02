/**
 * Created by kangqinmou on 16-10-23.
 */


$(function(){
    if(window.location.href.indexOf('maxbet.com') >= 0){
        console.log('hello world');
        setTimeout(function(){
            // todo 业务逻辑 begin

            /**
             * part1 登陆，只登陆第1个账号
             */
            var accounts = [
                {'username':'', 'password':''},
                {'username':'', 'password':''},
                {'username':'', 'password':''}
            ];
            var url = 'http://www.maxbet.com/Default.aspx?fromMode=Desktop';
            for(var i=0; i<accounts.length; i++){
                $('#txtID').val(accounts[i].username);
                $('#txtPW').val(accounts[i].password);
                $('.largeBtn[title="LOGIN"]').trigger('click');
                break;
            }

            /**
             * part2 获取数据
             */
            $('.flatBtn.secondary').trigger('click');
            $('.betTypeName:contains("Match Odds 1X2")').trigger('click');

            setInterval(function(){
                var data = [];
                $('.leagueGroup:has(".score"):has(".timeInfo")').each(function(){
                    $(this).find('.matchArea').each(function(){
                        var $unit = $(this);
                        var unit  = {};

                        // 球队
                        var $teams = $unit.find('.event .team .text');
                        unit.team_main = $($teams[0]).text();
                        unit.team = $($teams[1]).text();

                        // 比分
                        var $score = $unit.find('.time .score span');
                        var score = '';
                        $score.each(function(){
                            score += $(this).text();
                        });
                        unit.score = score;

                        // 时间
                        var $time = $unit.find('.time .timeInfo .timePlaying span').first();
                        unit.time = $time.text();

                        // 赢平输
                        var $odds = $unit.find('.odds');
                        var fields = ['win', 'draw', 'lost', 'half_win', 'half_draw', 'half_lost'];
                        for(var i=0; i<6; i++){
                            var $temp = $($odds[i]).find('span');
                            if($temp.length > 0){
                                unit[fields[i]] = $temp.text();
                            }else{
                                unit[fields[i]] = '';
                            }
                        }

                        data.push(unit);
                    });

                });
                console.log(data);
                $.ajax(
                    {
                        data:{'net_name':'maxbet','data':JSON.stringify(data)},
                        type:'post',
                        url:'http://192.168.106.128:2280',
                        dataType : 'jsonp',
                        jsonp:"jsoncallback",
                        success  : function(data) {
                            console.log(data);
                        },
                        error : function() {
                            // alert('fail');
                        }
                    }
                );
            }, 1000);

            // todo 业务逻辑 end
        }, 3000);
    }
});