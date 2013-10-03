<?php

require_once 'vendor/autoload.php';

$api = new NetDNA("alias","key","secret");

$id = 'zone_id';
$api->delete('/zones/pull.json'.$id.'/cache');

?>