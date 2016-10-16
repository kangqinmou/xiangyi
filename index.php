<?php

file_put_contents(__DIR__.'/data.txt', $_GET['data']);

echo $_GET['jsoncallback'] . "(".json_encode(array('hello'=>'world')).")";