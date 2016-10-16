/**
 * Created by kangqinmou on 16-10-16.
 */

// part1
var accounts = [
];
var url = 'http://www.maxbet.com/Default.aspx?fromMode=Desktop';
for(var i=0; i<accounts.length; i++){
    $('#txtID').val(accounts[i].username);
    $('#txtPW').val(accounts[i].password);
    $('.largeBtn[title="LOGIN"]').trigger('click');
    break;
}

// part2
$('.flatBtn.secondary').trigger('click');
$('.betTypeName:contains("Match Odds 1X2")').trigger('click');
function sleep($seconds){
    var cid = setInterval(function(){
        console.log($seconds);
        $seconds--;
        if($seconds < 0){
            clearInterval(cid);
        }
    }, 1000);
}

setTimeout(function(){
    setInterval(function(){
        var data = '';
        $('.leagueGroup:has(".score"):has(".timeInfo")').each(function(){
            $(this).find('.matchArea').each(function(){
                var $unit = $(this);
                var $score = $unit.find('.time .score span');
                var score = '';
                $score.each(function(){
                    score += $(this).html();
                });
                var $time = $unit.find('.time .timeInfo .timePlaying span').first();
                var time = $time.html();
                data += (score + ',' + time + "\n");

                var $two = $unit.find('.event');
                $two.find('.team .text').each(function(){
                    data += (',' + $(this).html());
                });
                data += "\n";

                var $odds = $unit.find('.odds');
                $odds.find('span').each(function(){
                    data += (',' + $(this).html());
                });
                data += "\n";
            });

        });
        console.log(data);
    }, 1000);
}, 6000);







