<?php

$fname = (isset($POST['fname']))) ? $_POST['fname'] : 'No name given';
$lname = (isset($POST['lname']))) ? $_POST['lname'] : 'No last name given';

$array = ['fname'=>$fname, 'lname'=>$lname, 'response'=>$somevalue];

echo json_encode($array);
?>
