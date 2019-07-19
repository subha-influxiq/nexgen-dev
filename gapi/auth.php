<?php
//session_start();
//echo 90; //exit;
global $AI;

/*$userdata = $AI->db->GetAll("SELECT * FROM `users` where userID=".$AI->user->userID);

echo "<pre>";
print_r($userdata[0]['google_auth_access_token']);
print_r($userdata[0]['address']);
echo "</pre>";*/
require_once('vendor/autoload.php');

set_time_limit(0);
error_reporting(E_ALL);
//error_reporting(0);
function getClient()
{
    global $AI;
    $client = new Google_Client();
    $client->setApplicationName('Nexmed Solutions');
//$client->addScope(Google_Service_Calendar::CALENDAR_READONLY);
    $client->addScope(Google_Service_Calendar::CALENDAR);
    $client->setAuthConfig('includes/gapi/client_secret.json');
    //echo 88;exit;
    $client->setAccessType('offline');
    $client->setApprovalPrompt ("force");
    $client->setRedirectUri('https://' . $_SERVER['HTTP_HOST'] . '/google-auth');
    $url= 'https://' . $_SERVER['HTTP_HOST'] . '/google-auth'; //exit;

// Load previously authorized credentials from a file.


// Request authorization from the user.
    $authUrl = $client->createAuthUrl();
 //   echo $authUrl;exit;
    //print_r($_REQUEST);exit;
//header('location :'.$authUrl);
    if(!isset($_REQUEST['code'])) header('Location: '.filter_var($authUrl, FILTER_SANITIZE_URL));
//printf("Open the following link in your browser:\n%s\n", $authUrl);
//print 'Enter verification code: ';
    // echo $authUrl;exit;
    if(@$_GET['code']){
        //print_r($client);
        $client->setAccessType('offline');
         $code=$_GET['code'];
         $authUrl = "https://accounts.google.com/o/oauth2/token";
        $curl = curl_init();
        curl_setopt_array($curl, array( CURLOPT_POST => true, CURLOPT_POSTFIELDS => array( 'code' => $code, 'client_id' => '269496509642-sl4plulmhvkkn1un8vov4latovhm0nub.apps.googleusercontent.com', 'client_secret' => '_lcHckWfZFKTbcaBWO0ojllf', 'redirect_uri' => $url, 'grant_type' => 'authorization_code' ), CURLOPT_URL => $authUrl, CURLOPT_SSL_VERIFYPEER => false, CURLOPT_RETURNTRANSFER => true ));
        $http_data = curl_exec($curl);
        curl_close($curl);
//        /print_r($http_data);
        //echo ("UPDATE users SET `google_auth_access_token`='".$http_data."' WHERE `userID`=".$AI->user->userID);
        db_query("UPDATE users SET `google_auth_access_token`='".$http_data."' WHERE `userID`=".$AI->user->userID);
        $redurl='https://' . $_SERVER['HTTP_HOST'] . '/manage-my-appoinments';
        header('Location: '.filter_var($redurl, FILTER_SANITIZE_URL));
        exit;
        $client->authenticate(@$_GET['code']);
        //print_r($client);


        echo 9;exit;
        $access_token = $client->getAccessToken();
        //print_r($client->getRefreshToken());
        if($access_token){
            echo "<pre>";
            print_r(json_encode($access_token));
            echo "</pre>";
            exit;
        }
        return $client;
    }
    else{
        return false;
    }
}


// Get the API client and construct the service object. this is common part for both things !
$client = getClient();
///$service = new Google_Service_Calendar($client);

