<?php
session_start();
//echo 90;exit;
require_once('vendor/autoload.php');
set_time_limit(0);
//error_reporting(E_ALL);
error_reporting(0);
function getClient()
{
$client = new Google_Client();
$client->setApplicationName('Google Calendar API PHP Quickstart');
//$client->addScope(Google_Service_Calendar::CALENDAR_READONLY);
$client->addScope(Google_Service_Calendar::CALENDAR);
$client->setAuthConfig('client_secret.json');
$client->setAccessType('offline');
    $client->setApprovalPrompt ("force");
    $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/gapi/test1.php');

// Load previously authorized credentials from a file.
$credentialsPath = ('credentials.json');
if (file_exists($credentialsPath)) {
$accessToken = json_decode(file_get_contents($credentialsPath), true);
} else {
// Request authorization from the user.
$authUrl = $client->createAuthUrl();
//echo $authUrl;exit;
//header('location :'.$authUrl);
   if(count($_REQUEST)==0) header('Location: '.filter_var($authUrl, FILTER_SANITIZE_URL));
//printf("Open the following link in your browser:\n%s\n", $authUrl);
//print 'Enter verification code: ';
   // echo $authUrl;exit;
    if(@$_GET['code']){
        //echo 56;

        //exit;
        //;exit;
        $client->setAccessType('offline');
        $x=$client->authenticate($_GET['code']);
        $access_token = $client->getAccessToken();
        //print_r($client->getRefreshToken());
        if($access_token){
            $_SESSION["access_token"]=$access_token;
        }
        //print_r($x); //exit;
        echo "<pre>";
        print_r($_SESSION["access_token"]);

        echo "</pre>";
        $client->setAccessToken(json_encode($access_token));
        if ($client->isAccessTokenExpired()) {

            $access_token=GetRefreshedAccessToken('349613586986-tqsg9bc5m6q7oe3ib8pr94foivj6lj9j.apps.googleusercontent.com',$_SESSION["access_token"]['refresh_token'],'2rkEhEoYB-B78px6k4LFvWZf');
            $client->setAccessToken(json_encode($access_token));
            //print_r($x);exit;
            ///$client->refreshToken($_SESSION["access_token"]['refresh_token']);
            //print_r($client->getRefreshToken());
            //$client->authenticate('1/qy0kpspShpJsES9bYHRuNFgE-CIw6MpkqkLQoKJwVZo');
            //$access_token = $client->getAccessToken();
            echo "<pre>";
            print_r($access_token);
            echo "</pre>";
        }
        return $client;
    }
    else{
        return false;
    }
}

}


// Get the API client and construct the service object. this is common part for both things !
$client = getClient();
$service = new Google_Service_Calendar($client);

// Print the next 100 events on the user's calendar.
$calendarId = 'primary';
$optParams = array(
'maxResults' => 100,
'orderBy' => 'startTime',
'singleEvents' => true,
'timeMin' => date('c'),
);
$results = $service->events->listEvents($calendarId, $optParams);
echo "<pre>";
print_r($results);
echo "</pre>";

// create a new event;
$event = new Google_Service_Calendar_Event(array(
    'summary' => 'Google I/O 2015',
    'location' => '800 Howard St., San Francisco, CA 94103',
    'description' => 'A chance to hear more about Google\'s developer products.',
    'start' => array(
        'dateTime' => '2015-05-28T09:00:00-07:00',
        'timeZone' => 'America/Los_Angeles',
    ),
    'end' => array(
        'dateTime' => '2015-05-28T17:00:00-07:00',
        'timeZone' => 'America/Los_Angeles',
    ),
    'recurrence' => array(
        'RRULE:FREQ=DAILY;COUNT=2'
    ),
    'attendees' => array(
        array('email' => 'lpage@example.com'),
        array('email' => 'sbrin@example.com'),
    ),
    'reminders' => array(
        'useDefault' => FALSE,
        'overrides' => array(
            array('method' => 'email', 'minutes' => 24 * 60),
            array('method' => 'popup', 'minutes' => 10),
        ),
    ),
));

$calendarId = 'primary';
$event = $service->events->insert($calendarId, $event);
printf('Event created: %s\n', $event->htmlLink);

 function GetRefreshedAccessToken($client_id, $refresh_token, $client_secret) {
    $url_token = 'https://www.googleapis.com/oauth2/v4/token';

    $curlPost = 'client_id=' . $client_id . '&client_secret=' . $client_secret . '&refresh_token='. $refresh_token . '&grant_type=refresh_token';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url_token);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
    $data = json_decode(curl_exec($ch), true);	//print_r($data);
    $http_code = curl_getinfo($ch,CURLINFO_HTTP_CODE);
    if($http_code != 200)
        throw new Exception('Error : Failed to refresh access token');

    return $data;
}