
# MaxCDN API Docs

[MaxCDN](http://www.maxcdn.com) is a Content Delivery Network service.

## Index

* [Overview](#overview)
* [Support](#support)
* [Changelog](#changelog)
* [Authentication](#authentication)
* [Account API](#account-api)
* [Users API](#users-api)
* [Zones API](#zones-api)
* [Reports API](#reports-api)
* [Clients API](#reports-by-file-name-api)


## Overview

1. Login to the [MaxCDN Control Panel](https://cp.maxcdn.com/account/api).

2. Create a [new application](https://cp.maxcdn.com/account/api/create).

3. Integrate with our RESTful API using your language wrapper:
  - Node (NPM) <https://github.com/maxcdn/node-maxcdn>
  - .NET <https://github.com/netdna/netdnarws-net>
  - Ruby <https://github.com/maxcdn/ruby-maxcdn>
  - Python <https://github.com/maxcdn/python-maxcdn>
  - PHP <https://github.com/netdna/netdnarws-php>
  - Perl <https://github.com/netdna/netdnarws-perl>

## Support

* Have a question? Check out our [Knowledge Base](http://support.maxcdn.com/) to see if your question has already been answered.
* Still need help?  Visit our [Contact Page](http://www.maxcdn.com/contact/) to get in touch.
* Found a Bug? Visit our [GitHub Issues](https://github.com/maxcdn/rws-bugs/issues?state=open) page to report it.
* Feel free to Tweet and follow us [@MaxCDNDeveloper](https://twitter.com/maxcdndeveloper) and [@MaxCDN](https://twitter.com/maxcdn).


## Changelog

  - **2014-03-05**  Firefox bug fixes.
  - **2014-03-05**  Added <a href="#get-all-zone-stats">stats per zone</a> reporting endpoint
  - **2014-03-03**  Documented `dns_check` property of Pull Zones
  - **2014-01-10**  Minor grammatical fixes
  - **2013-09-10**  Rebranded for MaxCDN
  - **2013-07-22**  Added JSON responses to SSL
  - **2013-07-09**  Added Authentication section
  - **2013-06-03**  Fixed formatting and display issues
  - **2013-06-02**  Added Ruby code examples
  - **2013-05-31**  Added Python code examples
  - **2013-05-29**  Added Node code examples
  - **2013-05-28**  Added response examples
  - **2013-05-25**  Added PHP code examples
  - **2013-03-29**  Added "Bad Request" for purges without file(s) parameter in body
  - **2013-03-14**  Added .ie to the TLD validation
  - **2013-03-12**  Added single file purge to use cURL multi
  - **2013-03-12**  Fixed SSL Update Bug
  - **2013-03-08**  cURL multi purge files
  - **2013-03-07**  Fix 3-legged OAuth restriction
  - **2013-01-16**  Fixed SSL bug
  - **2012-12-05**  Added 2xx_hit calculation to all `statuscodebyfilename` reports
  - **2012-02-27**  Released alpha Version of RWS API.

## Authentication

### Auth-Overview
The first thing to do in order to use the MaxCDN REST Web Service (RWS) is to register your application. Upon registration, your application will be issued a consumer key and secret which is similar to public and private keys used in ssh protocol. You will need to use this in conjunction with an OAuth library in the programming language of your choice.

<blockquote><p>OAuth defines three roles: client, server, and resource owner (nicknamed the OAuth Love Triangle by Leah Culver).</p></blockquote>

The MaxCDN RWS supports both 2-legged and 3-legged authentication.

3-legged OAuth is best used to allow 3rd party apps/services (e.g. [Leftronic](https://www.leftronic.com/services/maxcdn/)) access to a user's profile - the user just needs to grant access to the app.

2-legged OAuth is more limited in that it only allows a consumer access to resources that belong to it, which can be useful for building a 3rd party app, a control panel where the consumer is a reseller, or an account with sub-accounts (this means the reseller/main account also has access to sub-account resources). This does not require any user intervention in the process.

### 3-legged OAuth
3-legged OAuth describes the scenario for which OAuth was originally developed: a resource owner wants to give a client access to a server without sharing their credentials (i.e. username/password).
On a conceptual level it works in the following way:

* Client has signed up to the server and received their client credentials (also known as "consumer key and secret") ahead of time
* User wants to give the client access to their protected resources on the server
* Client retrieves the temporary credentials (also known as "request token") from the server
* Client redirects the resource owner to the server
* Resource owner grants the client access to their protected resources on the server
* Server redirects the user back to the client
* Client uses the temporary credentials to retrieve the token credentials (also known as "access token") from the server
* Client uses the token credentials to access the protected resources on the server

### 2-legged OAuth
2-legged OAuth describes a typical client-server scenario, without any user involvement. On a conceptual level 2-legged OAuth simply consists of the first and last steps of 3-legged OAuth:

* Client has signed up to the server and received their client credentials (also known as "consumer key and secret")
* Client uses their client credentials (and empty token credentials) to access the protected resources on the server

### Registering Your Application
Login and go to <https://cp.maxcdn.com/account/api/create>

### Signing Requests
All OAuth 1.0a requests use the same basic algorithm for creating a signature base string and a signature.

### Request Tokens
The first step to authenticating a user is to obtain a request token from MaxCDN.

The end point for requesting a token is: `https://rws.netdna.com/oauth/request_token`

### User Authorization
The User Authorization step sends the user to the MaxCDN RWS authorization page, which grants your application privileges to use their account with the API. You will need the oauth_token from the previous step to complete this.

The endpoint for the authorization url is: `https://rws.netdna.com/oauth/authorize`


### Key: Path Parameters

Parameter | Description |
--- | ---
`{companyalias}` | The alias used when creating the account |
`{zone_type}` | The type of zone you are making a request on — one of `pull`, `push`, `vod`, or `live` |
`{report_type}` | The format you want the reports summarized by — `hourly`, `daily`, or `monthly`. This value can be left blank to receive ungrouped totals |

# Account API

## Get Account

Gets account information

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/account.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Account ID |
`name` | The name of your account |
`address_id` | Address ID |
`alias` | Company Alias |
`ssl_credits` | SSL Credits |
`flex_credits` | Flex Location Credits |
`date_created` | Date Created |
`date_updated` | Date Updated |

### Code Samples

<ul class="nav nav-tabs" id="myTab1">
  <li class="active"><a href="#ruby1" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python1" data-toggle='tab'>Python</a></li>
  <li><a href="#php1" data-toggle='tab'>PHP</a></li>
  <li><a href="#node1" data-toggle='tab'>Node</a></li>
  <li><a href="#response1" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby1">
    <pre>
api.get("/account.json")</pre>
  </div>
  <div class="tab-pane" id="python1">
    <pre>api.get("/account.json")</pre>
  </div>
  <div class="tab-pane" id="php1">
    <pre>
$api->get('/account.json');</pre>
  </div>
  <div class="tab-pane" id="node1">
  <pre>
api.get('/account.json', callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response1">
    <pre>
{
    "code": 200,
    "data": {
        "account": {
            "alias": "aliasname",
            "date_created": "2013-05-15 17:32:30",
            "date_updated": "2013-05-15 19:43:36",
            "edgerules_credits": "0",
            "flex_credits": "-1",
            "id": "#####",
            "name": "MaxCDN sampleCode",
            "secure_token_pull_credits": "0",
            "server_id": "18",
            "ssl_credits": "1",
            "status": "2",
            "storage_quota": "107374182400",
            "storage_server_id": "11",
            "zone_credits": "-1"
        }
    }
}</pre>
  </div>
</div>


## Update Account

Updates account information

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/account.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`name` | - | <span class="label important">required</span><br />length: 1-30 chars | The name of your account |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Account ID |
`name` | The name of your account |
`address_id` | Address ID |
`alias` | Company Alias |
`ssl_credits` | SSL Credits |
`flex_credits` | Flex Location Credits |
`date_created` | Date Created |
`date_updated` | Date Updated |


### Code Samples

<ul class="nav nav-tabs" id="myTab2">
  <li class="active"><a href="#ruby2" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python2" data-toggle='tab'>Python</a></li>
  <li><a href="#php2" data-toggle='tab'>PHP</a></li>
  <li><a href="#node2" data-toggle='tab'>Node</a></li>
  <li><a href="#response2" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby2">
    <pre>
params={"name"=> "UserName"}
api.put('/account.json',params)</pre>
  </div>
  <div class="tab-pane" id="python2">
    <pre>
params={"name": "Monty"}
api.put('/account.json',params=params)</pre>
  </div>
  <div class="tab-pane" id="php2">
    <pre>
$params = array("name"=>"newName");
$api->put('/account.json',$params);</pre>
  </div>
  <div class="tab-pane" id="node2">
  <pre>
api.put('/account.json', { name: 'newName' }, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response2">
    <pre>
{
    "code": 200,
    "data": {
        "account": {
            "alias": "aliasname",
            "date_created": "2013-05-15 17:32:30",
            "date_updated": "2013-05-23 17:58:27",
            "edgerules_credits": "0",
            "flex_credits": "-1",
            "id": "#####",
            "name": "newName",
            "secure_token_pull_credits": "0",
            "server_id": "18",
            "ssl_credits": "-1",
            "status": "2",
            "storage_quota": "107374182400",
            "storage_server_id": "11",
            "zone_credits": "-1"
        }
    }
}</pre>
  </div>
</div>


## Get Account Address

Gets account address information

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/account.json/address</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Address ID |
`street1` | Street Address Line 1 |
`street2` | Street Address Line 2 |
`city` | City |
`state` | State |
`zip` | ZIP |
`country` | Country Code |
`date_created` | Date Created |
`date_updated` | Date Updated |


### Code Samples

<ul class="nav nav-tabs" id="myTab3">
  <li class="active"><a href="#ruby3" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python3" data-toggle='tab'>Python</a></li>
  <li><a href="#php3" data-toggle='tab'>PHP</a></li>
  <li><a href="#node3" data-toggle='tab'>Node</a></li>
  <li><a href="#response3" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby3">
    <pre>
api.get('/account.json/address')</pre>
  </div>
  <div class="tab-pane" id="python3">
    <pre>
api.get('/account.json/address')</pre>
  </div>
  <div class="tab-pane" id="php3">
    <pre>
$api->get('/account.json/address')</pre>
  </div>
  <div class="tab-pane" id="node3">
  <pre>
api.get('/account.json/address', callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response3">
    <pre>
{
    "code": 200,
    "data": {
        "address": {
            "city": "los angeles",
            "country": "US",
            "date_created": "0000-00-00 00:00:00",
            "date_updated": "2013-05-15 19:54:40",
            "id": "#####",
            "state": "CA",
            "street1": "123 Main Street",
            "street2": "apt 42",
            "zip": "90068"
        }
    }
}
</pre>
  </div>
</div>


## Update Account Address

Updates account address information

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/account.json/address</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`street1` | - | length: 1-200 chars | Street Address Line 1 |
`street2` | - | length: 1-200 chars | Street Address Line 2 |
`city` | - | length: 1-50 chars | City |
`state` | - | length: 1-50 chars | State |
`zip` | - | length: 3-5 chars; only digits accepted | ZIP |
`country` | - | length: 2 chars | Country Code |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Address ID |
`street1` | Street Address Line 1 |
`street2` | Street Address Line 2 |
`city` | City |
`state` | State |
`zip` | ZIP |
`country` | Country Code |
`date_created` | Date Created |
`date_updated` | Date Updated |


### Code Samples

<ul class="nav nav-tabs" id="myTab4">
  <li class="active"><a href="#ruby4" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python4" data-toggle='tab'>Python</a></li>
  <li><a href="#php4" data-toggle='tab'>PHP</a></li>
  <li><a href="#node4" data-toggle='tab'>Node</a></li>
  <li><a href="#response4" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby4">
    <pre>
params = {"street1"=> "1234 Main Street", "street2"=> "apt 42", "state"=> "CA"}
api.put('/account.json/address',params)</pre>
  </div>
  <div class="tab-pane" id="python4">
    <pre>
params = {"street1": "1234 Main Street", "street2": "apt 42", "state": "CA"}
api.put('/account.json/address',params=params)</pre>
  </div>
  <div class="tab-pane" id="php4">
    <pre>
$params = array("street1"=>"123 Main Street", "street2"=>"apt 42", "state"=>"CA");
$api->put('/account.json/address',$params);</pre>
  </div>
  <div class="tab-pane" id="node4">
  <pre>
api.put('/account.json/address', { street1: '123 Main Street', street2: 'apt 42', state: 'CA' }, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response4">
    <pre>
{
    "code": 200,
    "data": {
        "address": {
            "city": "los angeles",
            "country": "US",
            "date_created": "0000-00-00 00:00:00",
            "date_updated": "2013-05-23 18:01:29",
            "id": "#####",
            "state": "CA",
            "street1": "1234 Main Street",
            "street2": "apt 42",
            "zip": "90068"
        }
    }
}</pre>
  </div>
</div>

# Users API

## List Users

Returns a list of all users on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/users.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | User ID |
`email` | Email Address |
`firstname` | First Name |
`lastname` | Last Name |
`phone` | Phone Number |
`timezone` | User's Timezone |
`date_last_login` | The date and time the user last logged into the system |
`ip_last_login` | The IP for the user at the last login |
`date_created` | Date Created |
`date_updated` | Date Updated |
`roles` | An array of roles for the given user |

### Code Samples

<ul class="nav nav-tabs" id="myTab5">
  <li class="active"><a href="#ruby5" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python5" data-toggle='tab'>Python</a></li>
  <li><a href="#php5" data-toggle='tab'>PHP</a></li>
  <li><a href="#node5" data-toggle='tab'>Node</a></li>
  <li><a href="#response5" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby5">
    <pre>
api.get('/users.json')</pre>
  </div>
  <div class="tab-pane" id="python5">
    <pre>
api.get('/users.json')</pre>
  </div>
  <div class="tab-pane" id="php5">
    <pre>
$api->get('/users.json');</pre>
  </div>
  <div class="tab-pane" id="node5">
  <pre>
api.get('/users.json', callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response5">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 4,
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "total": 4,
        "users": [
            {
                "brand_id": "1",
                "date_created": "2013-05-15 17:32:30",
                "date_last_login": "2013-05-23 17:54:18",
                "date_updated": "2013-05-15 17:33:09",
                "default_company_id": "#####",
                "email": "name@domain.com",
                "firstname": "Given",
                "id": "33706",
                "ip_last_login": "12.13.90.183",
                "isadmin": "0",
                "isdisabled": "0",
                "lastname": "Family",
                "phone": "3235551400",
                "roles": [
                    "User",
                    "Account Owner"
                ],
                "timezone": "Europe/London"
            },
            {
                "brand_id": "1",
                "date_created": "2013-05-15 20:16:34",
                "date_last_login": null,
                "date_updated": "0000-00-00 00:00:00",
                "default_company_id": "19538",
                "email": "caphammer1@hamcave.com",
                "firstname": "Captain",
                "id": "33714",
                "ip_last_login": null,
                "isadmin": "0",
                "isdisabled": "0",
                "lastname": "Hammer",
                "phone": null,
                "roles": [
                    "User"
                ],
                "timezone": "Europe/London"
            },
            {
                "brand_id": "1",
                "date_created": "2013-05-15 20:20:03",
                "date_last_login": null,
                "date_updated": "2013-05-15 20:31:05",
                "default_company_id": "19538",
                "email": "drhorrible3@ele.net",
                "firstname": "Billy",
                "id": "33716",
                "ip_last_login": null,
                "isadmin": "0",
                "isdisabled": "0",
                "lastname": "Horrible",
                "phone": null,
                "roles": [
                    "User"
                ],
                "timezone": "Europe/London"
            }
        ]
    }
}</pre>
  </div>
</div>


## Create User

Creates a new user on the specified account

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/users.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`email` | - | <span class="label important">required</span><br />length: 6-200 chars; valid email address | Email Address |
`password` | - | <span class="label important">required</span><br />length: 5-30 chars | Password |
`firstname` | - | <span class="label important">required</span><br />length: 1-32 chars | First Name |
`lastname` | - | <span class="label important">required</span><br />length: 1-32 chars | Last Name |
`phone` | - | length: 7, 10, 11, or 14 chars; only digits considered | Phone Number |
`timezone` | - | valid::timezone | Valid timezone (see [List of Supported Timezones](http://php.net/manual/en/timezones.php)) |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | User ID |
`email` | Email Address |
`firstname` | First Name |
`lastname` | Last Name |
`phone` | Phone Number |
`timezone` | User's Timezone |
`date_last_login` | The date and time the user last logged into the system |
`ip_last_login` | The IP for the user at the last login |
`date_created` | Date Created |
`date_updated` | Date Updated |
`roles` | An array of roles for the given user |


### Code Samples

<ul class="nav nav-tabs" id="myTab6">
  <li class="active"><a href="#ruby6" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python6" data-toggle='tab'>Python</a></li>
  <li><a href="#php6" data-toggle='tab'>PHP</a></li>
  <li><a href="#node6" data-toggle='tab'>Node</a></li>
  <li><a href="#response6" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby6">
    <pre>
params={"email"=>"name44@domain.com","password"=>"password","firstname"=>"Given","lastname"=>"Family"}
api.post('/users.json',params )</pre>
  </div>
  <div class="tab-pane" id="python6">
    <pre>
params={'email':'name43@domain.com','password':'password','firstname':'Given','lastname':'Family'}
api.post('/users.json',data=params )</pre>
  </div>
  <div class="tab-pane" id="php6">
    <pre>
$params = array("email"=>"name@domain.com","password"=>"password","firstname"=>"Given","lastname"=>"Family");
$api->post('/users.json',$params );</pre>
  </div>
  <div class="tab-pane" id="node6">
  <pre>
api.post('/users.json', { email: 'name@domain.com', password: 'password', firstname: 'Given', lastname: 'Family' }, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response6">
    <pre>
{
    "code": 201,
    "data": {
        "user": {
            "brand_id": null,
            "date_created": "2013-05-23 18:22:11",
            "date_last_login": null,
            "date_updated": null,
            "default_company_id": "19538",
            "email": "name@domain.com",
            "firstname": "Given",
            "id": 33941,
            "ip_last_login": null,
            "isadmin": 0,
            "isdisabled": 0,
            "lastname": "Family",
            "phone": null,
            "roles": [
                "User"
            ],
            "timezone": "America/Los_Angeles"
        }
    }
}</pre>
  </div>
</div>


## Get User

Gets a user specified by the {user_id} parameter

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/users.json/{user_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | User ID |
`email` | Email Address |
`firstname` | First Name |
`lastname` | Last Name |
`phone` | Phone Number |
`timezone` | User's Timezone |


### Code Samples

<ul class="nav nav-tabs" id="myTab7">
  <li class="active"><a href="#ruby7" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python7" data-toggle='tab'>Python</a></li>
  <li><a href="#php7" data-toggle='tab'>PHP</a></li>
  <li><a href="#node7" data-toggle='tab'>Node</a></li>
  <li><a href="#response7" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby7">
    <pre>
id = '33706'
api.get('/users.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python7">
    <pre>
id = '33706'
api.get('/users.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php7">
    <pre>
$id = '33941';
$api->get('/users.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node7">
  <pre>
var id = '33941'
api.get('/users.json/' + id, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response7">
    <pre>
{
    "code": 200,
    "data": {
        "user": {
            "brand_id": "1",
            "date_created": "2013-05-23 18:22:11",
            "date_last_login": null,
            "date_updated": "0000-00-00 00:00:00",
            "default_company_id": "19538",
            "email": "name@domain.com",
            "firstname": "Given",
            "id": "33941",
            "ip_last_login": null,
            "isadmin": "0",
            "isdisabled": "0",
            "lastname": "Family",
            "phone": null,
            "roles": [
                "User"
            ],
            "timezone": "Europe/London"
        }
    }
}</pre>
  </div>
</div>


## Update User

Updates a user specified by the {user_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/users.json/{user_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`email` | - | length: 6-200 chars; valid email address | Email Address |
`firstname` | - | length: 1-32 chars | First Name |
`lastname` | - | length: 1-32 chars | Last Name |
`phone` | - | length: 7, 10, 11, or 14 chars; only digits considered | Phone Number |
`timezone` | - | valid::timezone | Valid timezone (see [List of Supported Timezones](http://php.net/manual/en/timezones.php)) |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | User ID |
`email` | Email Address |
`firstname` | First Name |
`lastname` | Last Name |
`phone` | Phone Number |
`timezone` | User's Timezone |

### Code Samples

<ul class="nav nav-tabs" id="myTab8">
  <li class="active"><a href="#ruby8" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python8" data-toggle='tab'>Python</a></li>
  <li><a href="#php8" data-toggle='tab'>PHP</a></li>
  <li><a href="#node8" data-toggle='tab'>Node</a></li>
  <li><a href="#response8" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby8">
  <pre>
id = '33706'
params={'firstname'=> 'name'}
api.put('/users.json/'+id,params)
</pre>
  </div>
  <div class="tab-pane" id="python8">
    <pre>
api.put('/users.json/'+id,params={'firstname': 'name'})</pre>
  </div>
  <div class="tab-pane" id="php8">
    <pre>
$id = '33941';
$params =  array("firstname"=>"Billy");
$api->put('/users.json/'.$id,$params);</pre>
</div>
  <div class="tab-pane" id="node8">
  <pre>
var id = '33941'
api.put('/users.json/' + id, { firstname: 'Billy' }, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response8">
    <pre>
{
    "code": 200,
    "data": {
        "user": {
            "brand_id": "1",
            "date_created": "2013-05-23 18:22:11",
            "date_last_login": null,
            "date_updated": "2013-05-23 19:10:09",
            "default_company_id": "19538",
            "email": "name@domain.com",
            "firstname": "Billy",
            "id": "33941",
            "ip_last_login": null,
            "isadmin": "0",
            "isdisabled": "0",
            "lastname": "Family",
            "phone": null,
            "roles": [
                "User"
            ],
            "timezone": "Europe/London"
        }
    }
}</pre>
  </div>
</div>


## Delete User

Deletes a user specified by the {user_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/users.json/{user_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab9">
  <li class="active"><a href="#ruby9" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python9" data-toggle='tab'>Python</a></li>
  <li><a href="#php9" data-toggle='tab'>PHP</a></li>
  <li><a href="#node9" data-toggle='tab'>Node</a></li>
  <li><a href="#response9" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby9">
    <pre>
id = '33706'
api.delete('/users.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python9">
    <pre>
id = '33706'
api.delete('/users.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php9">
    <pre>
$id = '33715';
$api->delete('/users.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node9">
  <pre>
var id = '33715'
api.delete('/users.json/' + id, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response9">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


# Zones API

## List Zones

Returns a list of all zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones.json</span></div>
</div>

### Code Samples  @

<ul class="nav nav-tabs" id="myTab10">
  <li class="active"><a href="#ruby10" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python10" data-toggle='tab'>Python</a></li>
  <li><a href="#php10" data-toggle='tab'>PHP</a></li>
  <li><a href="#node10" data-toggle='tab'>Node</a></li>
  <li><a href="#response10" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby10">
    <pre>
api.get('/zones.json')</pre>
  </div>
  <div class="tab-pane" id="python10">
    <pre>
api.get('/zones.json')</pre>
  </div>
  <div class="tab-pane" id="php10">
    <pre>
$api->get('/zones.json');</pre>
  </div>
  <div class="tab-pane" id="node10">
  <pre>
api.get('/zones.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response10">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 2,
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "total": 2,
        "zones": [
            {
                "cdn_url": "cdn.somedomain.com",
                "creation_date": "2013-05-15 20:45:44",
                "id": "#####",
                "inactive": "0",
                "label": "personal",
                "locked": "0",
                "name": "zoneName",
                "suspend": "0",
                "tmp_url": "zone.alias.netdna-cdn.com",
                "type": "2"
            },
            {
                "cdn_url": "newlivezone.somedomain.netdna-cdn.com",
                "creation_date": "2013-05-16 16:23:49",
                "id": "#####",
                "inactive": "0",
                "label": null,
                "locked": "0",
                "name": "newlivezone",
                "suspend": "0",
                "tmp_url": "newlivezone.alias.netdna-cdn.com",
                "type": "5"
            }
        ]
    }
}</pre>
  </div>
</div>


## Get Zone Summary

Gets a summarized count of all zone types on the specified
account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones.json/summary</span></div>
</div>


### Response Parameters

Parameter | Description |
--- | --- | ---
`pull` | The number of pull zones for your account |
`push` | The number of push zones for your account |
`vod` | The number of vod zones for your account |
`live` | The number of live zones for your account |


### Code Samples

<ul class="nav nav-tabs" id="myTab11">
  <li class="active"><a href="#ruby11" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python11" data-toggle='tab'>Python</a></li>
  <li><a href="#php11" data-toggle='tab'>PHP</a></li>
  <li><a href="#node11" data-toggle='tab'>Node</a></li>
  <li><a href="#response11" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby11">
    <pre>
api.get('/zones.json/summary')</pre>
  </div>
  <div class="tab-pane" id="python11">
    <pre>
api.get('/zones.json/summary')</pre>
  </div>
  <div class="tab-pane" id="php11">
    <pre>
$api->get('/zones.json/summary');</pre>
  </div>
  <div class="tab-pane" id="node11">
  <pre>
api.get('/zones.json/summary', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response11">
    <pre>
{
    "code": 200,
    "data": {
        "summary": {
            "live": 1,
            "pull": 1,
            "push": 1,
            "vod": 1
        }
    }
}</pre>
  </div>
</div>


## Get Zone Count

Counts all zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The total number of content zones for your account |



### Code Samples

<ul class="nav nav-tabs" id="myTab12">
  <li class="active"><a href="#ruby12" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python12" data-toggle='tab'>Python</a></li>
  <li><a href="#php12" data-toggle='tab'>PHP</a></li>
  <li><a href="#node12" data-toggle='tab'>Node</a></li>
  <li><a href="#response12" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby12">
    <pre>
api.get('/zones.json/count')</pre>
  </div>
  <div class="tab-pane" id="python12">
    <pre>
api.get('/zones.json/count')</pre>
  </div>
  <div class="tab-pane" id="php12">
    <pre>
$api->get('/zones.json/count');</pre>
  </div>
  <div class="tab-pane" id="node12">
  <pre>
api.get('/zones.json/count', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response12">
    <pre>
{
  "code":200,"data":
    {
      "count":"4"
    }
}</pre>
  </div>
</div>


# Pull Zone API

## List Pull Zones

Returns a list of all pull zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Pull Zone ID |
`name` | Pull Zone name |
`url` | Origin URL |
`port` | Port |
`ip` | IP address of the Origin URL |
`compress` | Enables on the fly GZip compression of your files from our edge servers for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`backend_compress` | Enables us to cache, from origin, GZip compressed versions of your files for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`queries` | Treat Query Strings as a separate cacheable item |
`set_host_header` | The URL sent as the Host in all HTTP Response Headers |
`cache_valid` | Ignore the origin Cache-Control Header and set every request to have a Max-Age of 1d, 7d, 1M or 12M |
`ignore_setcookie_header` | Ignore any cookies set by the origin in order to make the content consistently cacheable |
`ignore_cache_control` | Ignore any max age values set by the origin and use the CDN set value instead |
`use_stale` | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down or the file is not found |
`proxy_cache_lock` | When multiple requests for an uncached file are received, they will wait until the first response is received rather than sending each request back to the origin |
`label` | Something that describes your zone |
`valid_referers` | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`expires` | Set any request with a no "Cache-Control header" from the origin to stay on the server. Possible values are 1d, 7d, 1M, 12M |
`disallow_robots` | Enable robots.txt |
`disallow_robots_txt` | Use custom robots.txt |
`canonical_link_headers` | Pass the canonical URL in the Link HTTP Header |
`content_disposition` | Force files to download |
`pseudo_streaming` | Enable the zone for pseudo streaming content |
`sslshared` | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab13">
  <li class="active"><a href="#ruby13" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python13" data-toggle='tab'>Python</a></li>
  <li><a href="#php13" data-toggle='tab'>PHP</a></li>
  <li><a href="#node13" data-toggle='tab'>Node</a></li>
  <li><a href="#response13" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby13">
    <pre>
api.get('/zones/pull.json')</pre>
  </div>
  <div class="tab-pane" id="python13">
    <pre>
api.get('/zones/pull.json')</pre>
  </div>
  <div class="tab-pane" id="php13">
    <pre>
$api->get('/zones/pull.json');</pre>
  </div>
  <div class="tab-pane" id="node13">
  <pre>
api.get('/zones/pull.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response13">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 3,
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "pullzones": [
            {
                "backend_compress": "0",
                "cache_valid": "1d",
                "canonical_link_headers": "0",
                "cdn_url": "cdn.somedomain.com",
                "compress": "1",
                "content_disposition": "0",
                "creation_date": "2013-05-15 20:45:44",
                "disallow_robots": "0",
                "disallow_robots_txt": null,
                "dns_check": "1",
                "expires": null,
                "hide_setcookie_header": "0",
                "id": "96061",
                "ignore_cache_control": "0",
                "ignore_setcookie_header": "0",
                "inactive": "0",
                "ip": "205.134.255.49",
                "label": "personal",
                "locked": "0",
                "name": "somedomain",
                "port": "80",
                "proxy_cache_lock": "0",
                "pseudo_streaming": "0",
                "queries": "1",
                "server_id": "18",
                "set_host_header": null,
                "sslshared": "0",
                "suspend": "0",
                "tmp_url": "somedomain.alias.netdna-cdn.com",
                "type": "2",
                "upstream_enabled": "0",
                "url": "http://somedomain.net",
                "use_stale": "0",
                "valid_referers": null
            },
            <...>,
            {
                "backend_compress": "0",
                "cache_valid": "1d",
                "canonical_link_headers": "0",
                "cdn_url": "newpullzone3.alias.netdna-cdn.com",
                "compress": "0",
                "content_disposition": "0",
                "creation_date": "2013-05-24 16:18:19",
                "disallow_robots": "0",
                "disallow_robots_txt": null,
                "dns_check": "1",
                "expires": null,
                "hide_setcookie_header": "0",
                "id": "97312",
                "ignore_cache_control": "0",
                "ignore_setcookie_header": "0",
                "inactive": "0",
                "ip": "205.134.255.49",
                "label": null,
                "locked": "0",
                "name": "newpullzone3",
                "port": "80",
                "proxy_cache_lock": "0",
                "pseudo_streaming": "0",
                "queries": "1",
                "server_id": "18",
                "set_host_header": null,
                "sslshared": "0",
                "suspend": "0",
                "tmp_url": "newpullzone3.alias.netdna-cdn.com",
                "type": "2",
                "upstream_enabled": "0",
                "url": "http://somedomain.net",
                "use_stale": "0",
                "valid_referers": null
            }
        ],
        "total": 3
    }
}</pre>
  </div>
</div>


## Create Pull Zone

Creates a new pull zone

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`name` | - | <span class="label important">required</span><br />length: 3-32 chars; only letters, digits, and dash (-)accepted | Pull Zone Name |
`url` | - | <span class="label important">required</span><br />length: 4-100 chars; only valid URLs accepted | Origin URL |
`port` | 80 | length: 1-5 chars; only digits accepted | Port |
`dns_check` | 1 | only 0 or 1 accepted | This field determines how your Origin resolves. When set to 1, we automatically grab the origin's IP using DNS. Setting it to 0 allows you explicitly provide the IP of the origin. |
`ip` | - | length: 1-10 chars, only digits accepted | Valid IP address of the Origin URL. Be sure to set `dns_check` to 0 to prevent this value from being overwritten. |
`compress` | 0 | only 0 or 1 accepted | Enables on the fly GZip compression of your files from our edge servers for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`backend_compress` | 0 | only 0 or 1 accepted | Enables us to cache, from origin, GZip compressed versions of your files for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`queries` | 0 | only 0 or 1 accepted | Treat Query Strings as a separate cacheable item |
`set_host_header` | - | length: 4-100 chars; only valid URLs accepted | The URL to send as the Host in all HTTP Response Headers |
`cache_valid` | 1d | length: 1-30 chars; must be a number followed by one of s, m, h, d, M, or Y | Ignore the origin Cache-Control Header and set every request to have a Max-Age of 1d, 7d, 1M or 12M |
`ignore_setcookie_header` | 0 | only 0 or 1 accepted | Ignore any cookies set by the origin in order to make the content consistently cacheable |
`ignore_cache_control` | 0 | only 0 or 1 accepted | Ignore any max age values set by the origin and use the CDN set value instead |
`use_stale` | 0 | only 0 or 1 accepted | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down or the file is not found |
`proxy_cache_lock` | 0 | only 0 or 1 accepted | When multiple requests for an uncached file are received, they will wait until the first response is received rather than sending each request back to the origin |
`label` | - | length: 1-255 chars | Something that describes your zone |
`valid_referers` | - | length: 1-100 chars | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`expires` | 1d | length: 1-32 chars | Set any request with a no "Cache-Control header" from the origin to stay on the server. Possible values are 1d, 7d, 1M, 12M |
`disallow_robots` | 0 | only 0 or 1 accepted | Enable robots.txt |
`disallow_robots_txt` | - | length 1-255 chars | Use custom robots.txt |
`canonical_link_headers` | 1 | only 0 or 1 accepted | Pass the canonical URL in the Link HTTP Header |
`content_disposition` | 0 | only 0 or 1 accepted | Force files to download |
`x_forward_for` | 0 | only 0 or 1 accepted | Add X-Forwarded-For (XFF) HTTP Header |
`pseudo_streaming` | 0 | only 0 or 1 accepted | Enable the zone for pseudo streaming content |
`secret` | - | length: 1 - 32 chars | Use a secret to protect your files from unwanted visitors |
`sslshared` | 0 | only 0 or 1 accepted | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Pull Zone ID |
`name` | Pull Zone name |
`url` | Origin URL |
`port` | Port |
`ip` | IP address of the Origin URL |
`compress` | Enables on the fly GZip compression of your files from our edge servers for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`backend_compress` | Enables us to cache, from origin, GZip compressed versions of your files for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`queries` | Treat Query Strings as a separate cacheable item |
`set_host_header` | The URL sent as the Host in all HTTP Response Headers |
`cache_valid` | Ignore the origin Cache-Control Header and set every request to have a Max-Age of 1d, 7d, 1M or 12M |
`ignore_setcookie_header` | Ignore any cookies set by the origin in order to make the content consistently cacheable |
`ignore_cache_control` | Ignore any max age values set by the origin and use the CDN set value instead |
`use_stale` | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down or the file is not found |
`proxy_cache_lock` | When multiple requests for an uncached file are received, they will wait until the first response is received rather than sending each request back to the origin |
`label` | Something that describes your zone |
`valid_referers` | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`expires` | Set any request with a no "Cache-Control header" from the origin to stay on the server. Possible values are 1d, 7d, 1M, 12M |
`disallow_robots` | Enable robots.txt |
`disallow_robots_txt` | Use custom robots.txt |
`canonical_link_headers` | Pass the canonical URL in the Link HTTP Header |
`content_disposition` | Force files to download |
`x_forward_for` | Add X-Forwarded-For (XFF) HTTP Header |
`pseudo_streaming` | Enable the zone for pseudo streaming content |
`sslshared` | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab14">
  <li class="active"><a href="#ruby14" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python14" data-toggle='tab'>Python</a></li>
  <li><a href="#php14" data-toggle='tab'>PHP</a></li>
  <li><a href="#node14" data-toggle='tab'>Node</a></li>
  <li><a href="#response14" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby14">
    <pre>
params = {"name"=>"newPullZone6","url"=>"http://somedomain.com"}
api.post('/zones/pull.json',params)</pre>
  </div>
  <div class="tab-pane" id="python14">
    <pre>
params = {"name":"newPullZone5","url":"http://somedomain.net"}
api.post('/zones/pull.json',data=params)</pre>
  </div>
  <div class="tab-pane" id="php14">
    <pre>
$params =  array("name"=>"newPullZone2","url"=>"http://somedomain.net");
$api->post('/zones/pull.json',$params);</pre>
  </div>
  <div class="tab-pane" id="node14">
  <pre>
api.post('/zones/pull.json', { name: 'newPullZone2', url: 'http://somedomain.net' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response14">
    <pre>
{
    "code": 201,
    "data": {
        "pullzone": {
            "backend_compress": 0,
            "cache_valid": "1d",
            "canonical_link_headers": 1,
            "cdn_url": "newpullzone3.alias.netdna-cdn.com",
            "compress": 0,
            "content_disposition": 0,
            "creation_date": "2013-05-24 16:18:19",
            "disallow_robots": 0,
            "disallow_robots_txt": null,
            "dns_check": 0,
            "expires": null,
            "hide_setcookie_header": 0,
            "id": 97312,
            "ignore_cache_control": 0,
            "ignore_setcookie_header": 0,
            "inactive": 0,
            "ip": "205.134.255.49",
            "label": null,
            "locked": 0,
            "name": "newpullzone3",
            "port": 80,
            "proxy_cache_lock": 0,
            "pseudo_streaming": 0,
            "queries": "1",
            "server_id": "18",
            "set_host_header": 1,
            "sslshared": null,
            "suspend": 0,
            "tmp_url": "newpullzone3.alias.netdna-cdn.com",
            "type": 2,
            "upstream_enabled": 0,
            "url": "http://somedomain.net",
            "use_stale": 0,
            "x_forward_for": 0,
            "valid_referers": null
        }
    }
}</pre>
  </div>
</div>


## Get Pull Zones Count

Counts all pull zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The number of pull zones on the specified account |

### Code Samples

<ul class="nav nav-tabs" id="myTab15">
  <li class="active"><a href="#ruby15" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python15" data-toggle='tab'>Python</a></li>
  <li><a href="#php15" data-toggle='tab'>PHP</a></li>
  <li><a href="#node15" data-toggle='tab'>Node</a></li>
  <li><a href="#response15" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby15">
    <pre>
api.get('/zones/pull.json/count')</pre>
  </div>
  <div class="tab-pane" id="python15">
    <pre>
api.get('/zones/pull.json/count')</pre>
  </div>
  <div class="tab-pane" id="php15">
    <pre>
$api->get('/zones/pull.json/count');</pre>
  </div>
  <div class="tab-pane" id="node15">
  <pre>
api.get('/zones/pull.json/count', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response15">
    <pre>
{
  "code":200,"data":
    {
      "count": "3"
    }
}</pre>
  </div>
</div>


## Get Pull Zone

Gets a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull.json/{zone_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The Pull Zone ID |
`name` | Pull Zone name |
`url` | Origin URL |
`port` | Port |
`ip` | Valid IP address of the Origin URL, if omitted the service will automatically try to find the IP |
`compress` | Enables on the fly GZip compression of your files from our edge servers for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`backend_compress` | Enables us to cache, from origin, GZip compressed versions of your files for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`queries` | Treat Query Strings as a separate cacheable item |
`set_host_header` | The URL sent as the Host in all HTTP Response Headers |
`cache_valid` | Ignore the origin Cache-Control Header and set every request to have a Max-Age of 1d, 7d, 1M or 12M |
`ignore_setcookie_header` | Ignore any cookies set by the origin in order to make the content consistently cacheable |
`ignore_cache_control` | Ignore any max age values set by the origin and use the CDN set value instead |
`use_stale` | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down or the file is not found |
`proxy_cache_lock` | When multiple requests for an uncached file are received, they will wait until the first response is received rather than sending each request back to the origin |
`label` | Something that describes your zone |
`valid_referers` | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`expires` | Set any request with a no "Cache-Control header" from the origin to stay on the server. Possible values are 1d, 7d, 1M, 12M |
`disallow_robots` | Enable robots.txt |
`disallow_robots_txt` | Use custom robots.txt |
`canonical_link_headers` | Pass the canonical URL in the Link HTTP Header |
`content_disposition` | Force files to download |
`x_forward_for` | Add X-Forwarded-For (XFF) HTTP Header |
`pseudo_streaming` | Enable the zone for pseudo streaming content |
`sslshared` | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab16">
  <li class="active"><a href="#ruby16" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python16" data-toggle='tab'>Python</a></li>
  <li><a href="#php16" data-toggle='tab'>PHP</a></li>
  <li><a href="#node16" data-toggle='tab'>Node</a></li>
  <li><a href="#response16" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby16">
    <pre>
id = '97167'
api.get('/zones/pull.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python16">
    <pre>
id = '97167'
api.get('/zones/pull.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php16">
    <pre>
$id = '96076';
$api->get('/zones/pull.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node16">
  <pre>
var id = '96076'
api.get('/zones/pull.json' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response16">
    <pre>
{
    "code": 200,
    "data": {
        "pullzone": {
            "backend_compress": "0",
            "cache_valid": "1d",
            "canonical_link_headers": "0",
            "cdn_url": "cdn.somenewdomain.com",
            "compress": "0",
            "content_disposition": "0",
            "creation_date": "2013-05-23 19:38:30",
            "disallow_robots": "0",
            "disallow_robots_txt": null,
            "dns_check": "1",
            "expires": null,
            "hide_setcookie_header": "0",
            "id": "97167",
            "ignore_cache_control": "0",
            "ignore_setcookie_header": "0",
            "inactive": "0",
            "ip": "205.134.255.49",
            "label": "Some other description",
            "locked": "0",
            "name": "newpullzone2",
            "port": "80",
            "proxy_cache_lock": "0",
            "pseudo_streaming": "0",
            "queries": "1",
            "server_id": "18",
            "set_host_header": null,
            "sslshared": "0",
            "suspend": "0",
            "tmp_url": "newpullzone2.alias.netdna-cdn.com",
            "type": "2",
            "upstream_enabled": "0",
            "url": "http://somedomain.net",
            "use_stale": "0",
            "x_forward_for": "0",
            "valid_referers": null
        }
    }
}</pre>
  </div>
</div>


## Update Pull Zone

Updates a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull.json/{zone_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`url` | - | length: 4-100 chars; only valid URLs accepted | Origin URL |
`port` | 80 | length: 1-5 chars; only digits accepted | Port |
`dns_check` | 1 | only 0 or 1 accepted | This field determines how your Origin resolves. When set to 1, we automatically grab the origin's IP using DNS. Setting it to 0 allows you explicitly provide the IP of the origin. |
`ip` | - | length: 1-10 chars, only digits accepted | Valid IP address of the Origin URL. Be sure to set `dns_check` to 0 to prevent this value from being overwritten. |
`compress` | 0 | only 0 or 1 accepted | On the fly compression of your files served from our edges. Enables GZip compression for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`backend_compress` | 0 | only 0 or 1 accepted | Allow us to cache compressed versions of your files from the origin. Enables GZip compression for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`queries` | 0 | only 0 or 1 accepted | Treat Query Strings as a separate cacheable item |
`set_host_header` | - | length: 4-100 chars; only valid URLs accepted | The URL to send as the Host in all HTTP Response Headers |
`cache_valid` | - | length: 1-30 chars; must be a number followed by one of s, m, h, d, M, or Y | Ignore the origin Cache-Control Header and set every request to have a Max-Age of 1d, 7d, 1M or 12M |
`ignore_setcookie_header` | 0 | only 0 or 1 accepted | Ignore any cookies set by the origin in order to make the content consistently cacheable |
`ignore_cache_control` | 0 | only 0 or 1 accepted | Ignore any max age values set by the origin and use the CDN set value instead |
`use_stale` | 0 | only 0 or 1 accepted | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down or the file is not found |
`proxy_cache_lock` | 0 | only 0 or 1 accepted | When multiple requests for an uncached file are received, they will wait until the first response is received rather than sending each request back to the origin |
`label` | - | length: 1-255 chars | Something that describes your zone |
`valid_referers` | - | length: 1-100 chars | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`expires` | 1d | length: 1-32 chars | Set any request with a no "Cache-Control header" from the origin to stay on the server. Possible values are 1d, 7d, 1M, 12M |
`disallow_robots` | 0 | only 0 or 1 accepted | Enable robots.txt |
`disallow_robots_txt` | - | length: 1-255 chars | Use custom robots.txt |
`canonical_link_headers` | 1 | only 0 or 1 accepted | Pass the canonical URL in the Link HTTP Header |
`content_disposition` | 0 | only 0 or 1 accepted | Force files to download |
`x_forward_for` | 0 | only 0 or 1 accepted | Add X-Forwarded-For (XFF) HTTP Header |
`pseudo_streaming` | 0 | only 0 or 1 accepted | Enable the zone for pseudo streaming content |
`secret` | - | length: 1 - 32 chars | Use a secret to protect your files from unwanted visitors |
`sslshared` | 0 | only 0 or 1 accepted | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Pull Zone ID |
`name` | Pull Zone name |
`url` | Origin URL |
`port` | Port |
`ip` | Valid IP address of the Origin URL, if omitted the service will automatically try to find the IP |
`compress` | On the fly compression of your files served from our edges. Enables GZip compression for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`backend_compress` | Allow us to cache compressed versions of your files from the origin. Enables GZip compression for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`queries` | Treat Query Strings as a separate cacheable item |
`set_host_header` | The URL sent as the Host in all HTTP Response Headers |
`cache_valid` | Ignore the origin Cache-Control Header and set every request to have a Max-Age of 1d, 7d, 1M or 12M |
`ignore_setcookie_header` | Ignore any cookies set by the origin in order to make the content consistently cacheable |
`ignore_cache_control` | Ignore any max age values set by the origin and use the CDN set value instead |
`use_stale` | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down or the file is not found |
`proxy_cache_lock` | When multiple requests for an uncached file are received, they will wait until the first response is received rather than sending each request back to the origin |
`label` | Something that describes your zone |
`valid_referers` | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`expires` | Set any request with a no "Cache-Control header" from the origin to stay on the server. Possible values are 1d, 7d, 1M, 12M |
`disallow_robots` | Enable robots.txt |
`disallow_robots_txt` | Use custom robots.txt |
`canonical_link_headers` | Pass the canonical URL in the Link HTTP Header |
`content_disposition` | Force files to download |
`x_forward_for` | Add X-Forwarded-For (XFF) HTTP Header |
`pseudo_streaming` | Enable the zone for pseudo streaming content |
`sslshared` | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |


### Code Samples

<ul class="nav nav-tabs" id="myTab17">
  <li class="active"><a href="#ruby17" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python17" data-toggle='tab'>Python</a></li>
  <li><a href="#php17" data-toggle='tab'>PHP</a></li>
  <li><a href="#node17" data-toggle='tab'>Node</a></li>
  <li><a href="#response17" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby17">
    <pre>
id = '97167'
params = {"label"=>"Some other description"}
api.put('/zones/pull.json/'+id,params)</pre>
  </div>
  <div class="tab-pane" id="python17">
    <pre>
id = '97167'
params = {"label":"Some other description"}
api.put('/zones/pull.json/'+id,params=params)</pre>
  </div>
  <div class="tab-pane" id="php17">
    <pre>
$id = '96167';
$params = array("label"=>"Some other description");
$api->put('/zones/pull.json/'.$id, $params);</pre>
  </div>
  <div class="tab-pane" id="node17">
  <pre>
var id = '96167'
api.put('/zones/pull.json' + id, { label: 'Some other description' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response17">
    <pre>
{
    "code": 200,
    "data": {
        "pullzone": {
            "backend_compress": "0",
            "cache_valid": "1d",
            "canonical_link_headers": "0",
            "cdn_url": "cdn.somenewdomain.com",
            "compress": "0",
            "content_disposition": "0",
            "creation_date": "2013-05-23 19:38:30",
            "disallow_robots": "0",
            "disallow_robots_txt": null,
            "dns_check": "1",
            "expires": null,
            "hide_setcookie_header": "0",
            "id": "97167",
            "ignore_cache_control": "0",
            "ignore_setcookie_header": "0",
            "inactive": "0",
            "ip": "205.134.255.49",
            "label": "Some other description",
            "locked": "0",
            "name": "newpullzone2",
            "port": "80",
            "proxy_cache_lock": "0",
            "pseudo_streaming": "0",
            "queries": "1",
            "server_id": "18",
            "set_host_header": null,
            "sslshared": "0",
            "suspend": "0",
            "tmp_url": "newpullzone2.alias.netdna-cdn.com",
            "type": "2",
            "upstream_enabled": "0",
            "url": "http://somedomain.net",
            "use_stale": "0",
            "x_forward_for": "0",
            "valid_referers": null
        }
    }
}</pre>
  </div>
</div>


## Delete Pull Zone

Deletes a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull.json/{zone_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab18">
  <li class="active"><a href="#ruby18" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python18" data-toggle='tab'>Python</a></li>
  <li><a href="#php18" data-toggle='tab'>PHP</a></li>
  <li><a href="#node18" data-toggle='tab'>Node</a></li>
  <li><a href="#response18" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby18">
    <pre>
id = '97167'
api.delete('/zones/pull.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python18">
    <pre>
id = '97167'
api.delete('/zones/pull.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php18">
    <pre>
$id = '97167';
$api->delete('/zones/pull.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node18">
  <pre>
var id = '97167'
api.delete('/zones/pull.json' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response18">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Enable Pull Zone

Enables a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull/{zone_id}/enable.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab19">
  <li class="active"><a href="#ruby19" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python19" data-toggle='tab'>Python</a></li>
  <li><a href="#php19" data-toggle='tab'>PHP</a></li>
  <li><a href="#node19" data-toggle='tab'>Node</a></li>
  <li><a href="#response19" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby19">
    <pre>
id = '97167'
api.put('/zones/pull/'+id+'/enable.json')</pre>
  </div>
  <div class="tab-pane" id="python19">
    <pre>
id = '97167'
api.put('/zones/pull/'+id+'/enable.json')</pre>
  </div>
  <div class="tab-pane" id="php19">
    <pre>
$id = '97167';
$api->put('/zones/pull/'.$id.'/enable.json');</pre>
  </div>
  <div class="tab-pane" id="node19">
  <pre>
var id = '97167'
api.put('/zones/pull/' + id + '/enable.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response19">
    <pre>
{
  "code":200
}
</pre>
  </div>
</div>


## Disable Pull Zone

Disables a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull/{zone_id}/disable.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab20">
  <li class="active"><a href="#ruby20" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python20" data-toggle='tab'>Python</a></li>
  <li><a href="#php20" data-toggle='tab'>PHP</a></li>
  <li><a href="#node20" data-toggle='tab'>Node</a></li>
  <li><a href="#response20" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby20">
    <pre>
id = '97167'
api.put('/zones/pull/'+id+'/disable.json')</pre>
  </div>
  <div class="tab-pane" id="python20">
    <pre>
id = '97167'
api.put('/zones/pull/'+id+'/disable.json')</pre>
  </div>
  <div class="tab-pane" id="php20">
    <pre>
$id = '97167';
$api->put('/zones/pull'.$id.'disable.json);</pre>
  </div>
  <div class="tab-pane" id="node20">
  <pre>
var id = '97167'
api.put('/zones/pull' + id + 'disable.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response20">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Purge Cache

Purges pull zone cache

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull.json/{zone_id}/cache</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`files` | - | An array containing relative paths of the files to purge (i.e./favicon.ico) |

### Code Samples

<ul class="nav nav-tabs" id="myTab21">
  <li class="active"><a href="#ruby21" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python21" data-toggle='tab'>Python</a></li>
  <li><a href="#php21" data-toggle='tab'>PHP</a></li>
  <li><a href="#node21" data-toggle='tab'>Node</a></li>
  <li><a href="#response21" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby21">
  <pre>
#Purge Zone
id = '97167'
api.purge(id)

#Purge File
id = '97167'
api.purge(id,'/file1.txt')

#Purge Files
id = '97167'
api.purge(id, ['/file1.txt','/file2.txt'])</pre>
  </div>
  <div class="tab-pane" id="python21">
  <pre>
#Purge Zone
id = '97167'
api.purge(id)

#Purge File
id = '97167'
api.purge(id,'/file1.txt')

#Purge Files
id = '97167'
api.purge(id, ['/file1.txt','/file2.txt'])</pre>
  </div>
  <div class="tab-pane" id="php21">
    <pre>
//Purge Zone
$id = '97792';
$api->delete('/zones/pull.json/'.$id.'/cache');

//Purge File
$id = '97792';
$params = array('file'=>'/index.html');
$api->delete('/zones/pull.json/'.$id.'/cache',$params);

//Purge Files
$id = '97792';
$params = array('file'=>'/index.html','file2'=>'/robots.txt');
$api->delete('/zones/pull.json/'.$id.'/cache',$params);</pre>
  </div>
  <div class="tab-pane" id="node21">
  <pre>
// Purge Zone
var id = '96167'
api.delete('/zones/pull.json/' + id + '/cache', callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}

// Purge File
var id = '96167'
var file = '/file1.txt'
api.delete('/zones/pull.json/' + id + '/cache', file, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}

// Purge File
var id = '96167'
var files = [ '/file1.txt', '/file2.txt' ]
api.delete('/zones/pull.json/' + id + '/cache', files, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="response21">
    <pre>
{
    "code": 200
}</pre>
  </div>
</div>


# Pull Zone Custom Domains API

## List Custom Domains

Returns a list of all custom domains on the zone specified by
{zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull/{zone_id}/customdomains.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | A valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab22">
  <li class="active"><a href="#ruby22" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python22" data-toggle='tab'>Python</a></li>
  <li><a href="#php22" data-toggle='tab'>PHP</a></li>
  <li><a href="#node22" data-toggle='tab'>Node</a></li>
  <li><a href="#response22" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby22">
    <pre>
id = '97167'
api.get('/zones/pull/'+id+'/customdomains.json')</pre>
  </div>
  <div class="tab-pane" id="python22">
    <pre>
id = '97167'
api.get('/zones/pull/'+id+'/customdomains.json')</pre>
  </div>
  <div class="tab-pane" id="php22">
    <pre>
$id = '96061';
$api->get('/zones/pull/'.$id.'/customdomains.json');</pre>
  </div>
  <div class="tab-pane" id="node22">
  <pre>
var id = '96061'
api.get('/zones/pull/' + id + '/customdomains.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response22">
    <pre>
{
    "code": 200,
    "data": {
        "customdomains": [
            {
                "bucket_id": "97167",
                "custom_domain": "cdn.somenewdomain.com",
                "id": "79182",
                "type": null
            }
        ],
        "total": 1
    }
}</pre>
  </div>
</div>


## Create Custom Domain

Adds a new custom domain to {zone_id}

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull/{zone_id}/customdomains.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`custom_domain` | - | <span class="label important">required</span><br />length: 1-255 chars, valid::custom_domain, !valid::full_domain | A valid custom domain |
`type` | - | Applies only to VOD Zones and must be either 'vod-rtmp','vod-pseudo', 'vod-direct', or 'vod-ftp' | The type of custom domain being created |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The valid custom domain |


### Code Samples

<ul class="nav nav-tabs" id="myTab23">
  <li class="active"><a href="#ruby23" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python23" data-toggle='tab'>Python</a></li>
  <li><a href="#php23" data-toggle='tab'>PHP</a></li>
  <li><a href="#node23" data-toggle='tab'>Node</a></li>
  <li><a href="#response23" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby23">
    <pre>
id = '97167'
params = {"custom_domain"=>"cdn.somedomain14.com"}
api.post('/zones/pull/'+id+'/customdomains.json', params)</pre>
  </div>
  <div class="tab-pane" id="python23">
    <pre>
id = '97167'
params = {"custom_domain":"cdn.somedomain13.com"}
api.post('/zones/pull/'+id+'/customdomains.json', params)</pre>
  </div>
  <div class="tab-pane" id="php23">
    <pre>
$id = '97167';
$params = array("custom_domain"=>"cdn.somedomain3.com");
$api->post('/zones/pull/'.$id.'/customdomains.json', $params);</pre>
  </div>
  <div class="tab-pane" id="node23">
  <pre>
var id = '96167'
api.post('/zones/pull/' + id + '/customdomains.json', { custom_domain: 'cdn.somedomain3.com' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response23">
    <pre>
{
    "code": 201,
    "data": {
        "customdomain": {
            "bucket_id": "97167",
            "custom_domain": "cdn.somedomain3.com",
            "id": 79282,
            "type": null
        }
    }
}</pre>
  </div>
</div>


## Get Custom Domain

Gets a custom domain specified by the {zone_id} and
{customdomain_id} parameters

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab24">
  <li class="active"><a href="#ruby24" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python24" data-toggle='tab'>Python</a></li>
  <li><a href="#php24" data-toggle='tab'>PHP</a></li>
  <li><a href="#node24" data-toggle='tab'>Node</a></li>
  <li><a href="#response24" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby24">
    <pre>
zoneId = '97167'
domainId = '79182'
api.get('/zones/pull/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="python24">
    <pre>
zoneId = '97167'
domainId = '79182'
api.get('/zones/pull/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="php24">
    <pre>
$zoneId = '97167';
$domainId = '79182';
$api->get('/zones/pull/'.$zoneId.'/customdomains.json/'.$domainId);</pre>
  </div>
  <div class="tab-pane" id="node24">
  <pre>
var id = '97167'
var domainId = '79182'
api.get('/zones/pull/' + id + '/customdomains.json/' + domainId, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response24">
    <pre>
{
    "code": 200,
    "data": {
        "customdomain": {
            "bucket_id": "97167",
            "custom_domain": "cdn.somenewdomain.com",
            "id": "79182",
            "type": null
        }
    }
}
</pre>
  </div>
</div>


## Update Custom Domain

Updates a custom domain specified by the id parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`custom_domain` | - | <span class="label important">required</span><br />length: 1-255 chars, valid::custom_domain, !valid::full_domain | A new valid custom domain |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The new valid custom domain |


### Code Samples

<ul class="nav nav-tabs" id="myTab25">
  <li class="active"><a href="#ruby25" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python25" data-toggle='tab'>Python</a></li>
  <li><a href="#php25" data-toggle='tab'>PHP</a></li>
  <li><a href="#node25" data-toggle='tab'>Node</a></li>
  <li><a href="#response25" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby25">
    <pre>
zoneId = '97167'
domainId = '79182'
params = {"custom_domain"=>"cdn.somenewdomain41.com"}
api.put('/zones/pull/'+zoneId+'/customdomains.json/'+domainId,params)</pre>
  </div>
  <div class="tab-pane" id="python25">
    <pre>
zoneId = '97167'
domainId = '79182'
params = {"custom_domain":"cdn.somenewdomain41.com"}
api.put('/zones/pull/'+zoneId+'/customdomains.json/'+domainId,params=params)</pre>
  </div>
  <div class="tab-pane" id="php25">
    <pre>
$zoneId = '97167';
$domainId = '79182';
$params = array("custom_domain"=>"cdn.somenewdomain.com");
$api->put('/zones/pull/'.$zoneId.'/customdomains.json/'.$domainId, $params);</pre>
  </div>
  <div class="tab-pane" id="node25">
  <pre>
var zoneId = '97167'
var domainId = '79182'
api.put('/zones/pull/' + zoneId + '/customdomains.json/' + domainId, { custom_domain: 'cdn.somenewdomain.com' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response25">
    <pre>
{
    "code": 200,
    "data": {
        "customdomain": {
            "bucket_id": "97167",
            "custom_domain": "cdn.somenewdomain4.com",
            "id": "79182",
            "type": null
        }
    }
}</pre>
  </div>
</div>


## Delete Custom Domain

Deletes a custom domain specified by the {zone_id} and
{customdomain_id} parameters

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/pull/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab26">
  <li class="active"><a href="#ruby26" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python26" data-toggle='tab'>Python</a></li>
  <li><a href="#php26" data-toggle='tab'>PHP</a></li>
  <li><a href="#node26" data-toggle='tab'>Node</a></li>
  <li><a href="#response26" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby26">
    <pre>
zoneId = '97167'
domainId = '79182'
api.delete('/zones/pull/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="python26">
    <pre>
zoneId = '97167'
domainId = '79182'
api.delete('/zones/pull/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="php26">
    <pre>
$zoneId = '97167';
$domainId = '79182';
$api->delete('/zones/pull/'.$zoneId.'/customdomains.json/'.$domainId);</pre>
  </div>
  <div class="tab-pane" id="node26">
  <pre>
var zoneId = '97167'
var domainId = '79182'
api.delete('/zones/pull/' + zoneId + '/customdomains.json/' + domainId, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response26">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


# Push Zone API

## List Push Zones

Returns a list of all push zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Push Zone ID |
`name` | Push Zone name |
`label` | Something that describes your zone |
`valid_referers` | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`content_disposition` | Force files to download |
`sslshared` | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab27">
  <li class="active"><a href="#ruby27" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python27" data-toggle='tab'>Python</a></li>
  <li><a href="#php27" data-toggle='tab'>PHP</a></li>
  <li><a href="#node27" data-toggle='tab'>Node</a></li>
  <li><a href="#response27" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby27">
    <pre>
api.get('/zones/push.json')</pre>
  </div>
  <div class="tab-pane" id="python27">
    <pre>
api.get('/zones/push.json')</pre>
  </div>
  <div class="tab-pane" id="php27">
    <pre>
$api->get('/zones/push.json');</pre>
  </div>
  <div class="tab-pane" id="node27">
  <pre>
api.get('/zones/push.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response27">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 2,
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "pushzones": [
            {
                "cdn_url": "cdn.somedomain.net",
                "compress": "0",
                "content_disposition": "0",
                "creation_date": "2013-05-16 15:25:19",
                "expires": null,
                "ftp_url": "ftp.newpushzone2.alias.netdna-cdn.com",
                "id": "96182",
                "inactive": "0",
                "label": null,
                "locked": "0",
                "name": "newpushzone2",
                "server_id": "11",
                "sslshared": "0",
                "storage_updated": "2013-05-24 06:31:52",
                "storage_used": "20480",
                "suspend": "0",
                "tmp_url": "newpushzone2.alias.netdna-cdn.com",
                "type": "3",
                "valid_referers": null
            },
            {
                "cdn_url": "cdn.somenewdomain2.com",
                "compress": "0",
                "content_disposition": "0",
                "creation_date": "2013-05-23 21:01:39",
                "expires": null,
                "ftp_url": "ftp.newpushzone3.alias.netdna-cdn.com",
                "id": "97181",
                "inactive": "0",
                "label": "Some other description",
                "locked": "0",
                "name": "newpushzone3",
                "server_id": "11",
                "sslshared": "0",
                "storage_updated": "2013-05-24 06:31:52",
                "storage_used": "20480",
                "suspend": "0",
                "tmp_url": "newpushzone3.alias.netdna-cdn.com",
                "type": "3",
                "valid_referers": null
            }
        ],
        "total": 2
    }
}</pre>
  </div>
</div>


## Create Push Zone

Creates a new push zone

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`name` | - | <span class="label important">required</span><br />length: 3-30 chars; only letters, digits, and dash (-)accepted | Push Zone name |
`password` | - | <span class="label important">required</span><br />length: 5-30 chars; | Push Zone FTP password |
`label` | - | length: 1-255 chars | Something that describes your zone |
`valid_referers` | - | length: 1-200 chars | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`content_disposition` | 0 | only 0 or 1 accepted | Force files to download |
`sslshared` | 0 | only 0 or 1 accepted | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Push Zone ID |
`name` | Push Zone name |
`label` | Something that describes your zone |
`valid_referers` | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`content_disposition` | Force files to download |
`sslshared` | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab28">
  <li class="active"><a href="#ruby28" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python28" data-toggle='tab'>Python</a></li>
  <li><a href="#php28" data-toggle='tab'>PHP</a></li>
  <li><a href="#node28" data-toggle='tab'>Node</a></li>
  <li><a href="#response28" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby28">
    <pre>
params = {"name"=>"newPushZone99","password"=>"password"}
api.post('/zones/push.json',params)</pre>
  </div>
  <div class="tab-pane" id="python28">
    <pre>
params = {"name":"newPushZone6","password":"password"}
api.post('/zones/push.json',data=params)</pre>
  </div>
  <div class="tab-pane" id="php28">
    <pre>
$params = array("name"=>"newPushZone","password"=>"password");
$api->post('/zones/push.json', $params);</pre>
  </div>
  <div class="tab-pane" id="node28">
  <pre>
api.post('/zones/push.json', { name: 'newPushZone', password: 'password' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response28">
    <pre>
{
    "code": 201,
    "data": {
        "pushzone": {
            "cdn_url": "newpushzone4.alias.netdna-cdn.com",
            "compress": 0,
            "content_disposition": 0,
            "creation_date": "2013-05-24 16:41:53",
            "expires": null,
            "ftp_url": "ftp.newpushzone4.alias.netdna-cdn.com",
            "id": 97317,
            "inactive": 0,
            "label": null,
            "locked": 0,
            "name": "newpushzone4",
            "server_id": "11",
            "sslshared": null,
            "storage_updated": null,
            "storage_used": null,
            "suspend": 0,
            "tmp_url": "newpushzone4.alias.netdna-cdn.com",
            "type": 3,
            "valid_referers": null
        }
    }
}</pre>
  </div>
</div>


## Get Push Zones Count

Counts all push zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The number of push zones on the specified account |

### Code Samples

<ul class="nav nav-tabs" id="myTab29">
  <li class="active"><a href="#ruby29" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python29" data-toggle='tab'>Python</a></li>
  <li><a href="#php29" data-toggle='tab'>PHP</a></li>
  <li><a href="#node29" data-toggle='tab'>Node</a></li>
  <li><a href="#response29" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby29">
    <pre>
api.get('/zones/push.json/count')</pre>
  </div>
  <div class="tab-pane" id="python29">
    <pre>
api.get('/zones/push.json/count')</pre>
  </div>
  <div class="tab-pane" id="php29">
    <pre>
$api->get('/zones/push.json/count');</pre>
  </div>
  <div class="tab-pane" id="node29">
  <pre>
api.get('/zones/push.json/count', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response29">
    <pre>
{
    "code": 200,
    "data": {
        "count": "3"
    }
}
</pre>
  </div>
</div>


## Get Push Zone

Gets a push zone specified by the {zone_id} parameter

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push.json/{zone_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Push Zone ID |
`name` | Push Zone name |
`label` | Something that describes your zone |
`valid_referers` | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`content_disposition` | Force files to download |
`sslshared` | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab30">
  <li class="active"><a href="#ruby30" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python30" data-toggle='tab'>Python</a></li>
  <li><a href="#php30" data-toggle='tab'>PHP</a></li>
  <li><a href="#node30" data-toggle='tab'>Node</a></li>
  <li><a href="#response30" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby30">
    <pre>
id = '97793'
api.get('/zones/push.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python30">
    <pre>
id = '96182'
api.get('/zones/push.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php30">
    <pre>
$id = '97181';
$api->get('/zones/push.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node30">
  <pre>
var id = '97182'
api.get('/zones/push.json/' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response30">
    <pre>
{
    "code": 200,
    "data": {
        "pushzone": {
            "cdn_url": "cdn.somenewdomain2.com",
            "compress": "0",
            "content_disposition": "0",
            "creation_date": "2013-05-23 21:01:39",
            "expires": null,
            "ftp_url": "ftp.newpushzone3.alias.netdna-cdn.com",
            "id": "97181",
            "inactive": "0",
            "label": "Some other description",
            "locked": "0",
            "name": "newpushzone3",
            "server_id": "11",
            "sslshared": "0",
            "storage_updated": "2013-05-24 06:31:52",
            "storage_used": "20480",
            "suspend": "0",
            "tmp_url": "newpushzone3.alias.netdna-cdn.com",
            "type": "3",
            "valid_referers": null
        }
    }
}</pre>
  </div>
</div>


## Update Push Zone

Updates a push zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push.json/{zone_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`label` | - | length: 1-255 chars | Something that describes your zone |
`valid_referers` | - | length: 1-100 chars | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`content_disposition` | 0 | only 0 or 1 accepted | Force files to download |
`sslshared` | 0 | only 0 or 1 accepted | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Push Zone ID |
`name` | Push Zone name |
`label` | Something that describes your zone |
`valid_referers` | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`content_disposition` | Force files to download |
`sslshared` | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab31">
  <li class="active"><a href="#ruby31" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python31" data-toggle='tab'>Python</a></li>
  <li><a href="#php31" data-toggle='tab'>PHP</a></li>
  <li><a href="#node31" data-toggle='tab'>Node</a></li>
  <li><a href="#response31" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby31">
    <pre>
id = '97793'
params = {"label"=>"Some other description"}
api.put('/zones/push.json/'+id,params)</pre>
  </div>
  <div class="tab-pane" id="python31">
    <pre>
id = '96182'
params = {"label":"Some other description"}
api.put('/zones/push.json/'+id,params=params)</pre>
  </div>
  <div class="tab-pane" id="php31">
    <pre>
$id = '97181';
$params = array("label"=>"Some other description");
$api->put('/zones/push.json/'.$id, $params);</pre>
  </div>
  <div class="tab-pane" id="node31">
  <pre>
var id = '97182'
api.get('/zones/push.json/' + id, { label: 'Some other description' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response31">
    <pre>
{
    "code": 200,
    "data": {
        "pushzone": {
            "cdn_url": "cdn.somenewdomain2.com",
            "compress": "0",
            "content_disposition": "0",
            "creation_date": "2013-05-23 21:01:39",
            "expires": null,
            "ftp_url": "ftp.newpushzone3.alias.netdna-cdn.com",
            "id": "97181",
            "inactive": "0",
            "label": "Some other description",
            "locked": "0",
            "name": "newpushzone3",
            "server_id": "11",
            "sslshared": "0",
            "storage_updated": "2013-05-24 06:31:52",
            "storage_used": "20480",
            "suspend": "0",
            "tmp_url": "newpushzone3.alias.netdna-cdn.com",
            "type": "3",
            "valid_referers": null
        }
    }
}</pre>
  </div>
</div>


## Delete Push Zone

Deletes a push zone specified by the {zone_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push.json/{zone_id}</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab32">
  <li class="active"><a href="#ruby32" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python32" data-toggle='tab'>Python</a></li>
  <li><a href="#php32" data-toggle='tab'>PHP</a></li>
  <li><a href="#node32" data-toggle='tab'>Node</a></li>
  <li><a href="#response32" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby32">
    <pre>
id = '97793'
api.delete('/zones/push.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python32">
    <pre>
id = '96182'
api.delete('/zones/push.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php32">
    <pre>
$id = '97181';
$api->delete('/zones/push.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node32">
  <pre>
var id = '97181'
api.delete('/zones/push.json/' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response32">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Enable Push Zone

Enables a push zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push/{zone_id}/enable.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab33">
  <li class="active"><a href="#ruby33" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python33" data-toggle='tab'>Python</a></li>
  <li><a href="#php33" data-toggle='tab'>PHP</a></li>
  <li><a href="#node33" data-toggle='tab'>Node</a></li>
  <li><a href="#response33" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby33">
    <pre>
id = '97793'
api.put('/zones/push/'+id+'/enable.json')</pre>
  </div>
  <div class="tab-pane" id="python33">
    <pre>
id = '96182'
api.put('/zones/push/'+id+'/enable.json')</pre>
  </div>
  <div class="tab-pane" id="php33">
    <pre>
$id = '97181';
$api->put('/zones/push/'.$id.'/enable.json');</pre>
  </div>
  <div class="tab-pane" id="node33">
  <pre>
var id = '97181'
api.put('/zones/push/' + id + '/enable.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response33">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Disable Push Zone

Disables a push zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push/{zone_id}/disable.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab34">
  <li class="active"><a href="#ruby34" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python34" data-toggle='tab'>Python</a></li>
  <li><a href="#php34" data-toggle='tab'>PHP</a></li>
  <li><a href="#node34" data-toggle='tab'>Node</a></li>
  <li><a href="#response34" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby34">
    <pre>
id = '97793'
api.put('/zones/push/'+id+'/disable.json')</pre>
  </div>
  <div class="tab-pane" id="python34">
    <pre>
id = '96182'
api.put('/zones/push/'+id+'/disable.json')</pre>
  </div>
  <div class="tab-pane" id="php34">
    <pre>
$id = '97181';
$api->put('/zones/push/'.$id.'/disable.json');</pre>
  </div>
  <div class="tab-pane" id="node34">
  <pre>
var id = '97181'
api.put('/zones/push/' + id + '/disable.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response34">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


# Push Zone Custom Domains API

## List Custom Domains

Returns a list of all custom domains on the zone specified by
{zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push/{zone_id}/customdomains.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | A valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab35">
  <li class="active"><a href="#ruby35" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python35" data-toggle='tab'>Python</a></li>
  <li><a href="#php35" data-toggle='tab'>PHP</a></li>
  <li><a href="#node35" data-toggle='tab'>Node</a></li>
  <li><a href="#response35" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby35">
    <pre>
id = '97793'
api.get('/zones/push/'+id+'/customdomains.json')</pre>
  </div>
  <div class="tab-pane" id="python35">
    <pre>
id = '96182'
api.get('/zones/push/'+id+'/customdomains.json')</pre>
  </div>
  <div class="tab-pane" id="php35">
    <pre>
$id = '96061';
$api->get('/zones/push/'.$id.'/customdomains.json');</pre>
  </div>
  <div class="tab-pane" id="node35">
  <pre>
var id = '96061'
api.get('/zones/push/' + id + '/customdomains.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response35">
    <pre>
{
    "code": 200,
    "data": {
        "customdomains": [
            {
                "bucket_id": "96061",
                "custom_domain": "cdn.somedomain.com",
                "id": "78330",
                "type": null
            }
        ],
        "total": 1
    }
}</pre>
  </div>
</div>


## Create Custom Domain

Adds a new custom domain to {zone_id}

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push/{zone_id}/customdomains.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`custom_domain` | - | <span class="label important">required</span><br />length: 1-255 chars, valid::custom_domain, !valid::full_domain | A valid custom domain |
`type` | - | Applies only to VOD Zones and must be either 'vod-rtmp','vod-pseudo', 'vod-direct', or 'vod-ftp' | The type of custom domain being created |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab36">
  <li class="active"><a href="#ruby36" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python36" data-toggle='tab'>Python</a></li>
  <li><a href="#php36" data-toggle='tab'>PHP</a></li>
  <li><a href="#node36" data-toggle='tab'>Node</a></li>
  <li><a href="#response36" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby36">
    <pre>
id = '97793'
params = {"custom_domain"=>"cdn.somedomain19.com"}
api.post('/zones/push/'+id+'/customdomains.json', params)</pre>
  </div>
  <div class="tab-pane" id="python36">
    <pre>
id = '96182'
params = {"custom_domain":"cdn.somedomain15.com"}
api.post('/zones/push/'+id+'/customdomains.json', params)</pre>
  </div>
  <div class="tab-pane" id="php36">
    <pre>
$id = '97181';
$params = array("custom_domain"=>"cdn.somedomain2.net");
$api->post('/zones/push/'.$id.'/customdomains.json', $params);</pre>
  </div>
  <div class="tab-pane" id="node36">
  <pre>
var id = '97181'
api.post('/zones/push/' + id + '/customdomains.json', { custom_domain: 'cdn.somedomain2.net' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response36">
    <pre>
{
    "code": 201,
    "data": {
        "customdomain": {
            "bucket_id": "97181",
            "custom_domain": "cdn.somedomain4.net",
            "id": 79283,
            "type": null
        }
    }
}
</pre>
  </div>
</div>


## Get Custom Domain

Gets a custom domain specified by the {zone_id} and
{customdomain_id} parameters

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab37">
  <li class="active"><a href="#ruby37" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python37" data-toggle='tab'>Python</a></li>
  <li><a href="#php37" data-toggle='tab'>PHP</a></li>
  <li><a href="#node37" data-toggle='tab'>Node</a></li>
  <li><a href="#response37" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby37">
    <pre>
zoneId = '97793'
domainId = '79747'
api.get('/zones/push/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="python37">
    <pre>
zoneId = '96182'
domainId = '79320'
api.get('/zones/push/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="php37">
    <pre>
$zoneId = '97181';
$domainId = '79188';
$api->get('/zones/push/'.$zoneId.'/customdomains.json/'.$domainId);</pre>
  </div>
  <div class="tab-pane" id="node37">
  <pre>
var zoneId = '97181'
var domainId = '79188'
api.get('/zones/push/' + zoneId + '/customdomains.json/' + domainId, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response37">
    <pre>
{
    "code": 200,
    "data": {
        "customdomain": {
            "bucket_id": "97181",
            "custom_domain": "cdn.somenewdomain2.com",
            "id": "79188",
            "type": null
        }
    }
}</pre>
  </div>
</div>


## Update Custom Domain

Updates a custom domain specified by the id parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`custom_domain` | - | <span class="label important">required</span><br />length: 1-255 chars, valid::custom_domain, !valid::full_domain | A new valid custom domain |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The new valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab38">
  <li class="active"><a href="#ruby38" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python38" data-toggle='tab'>Python</a></li>
  <li><a href="#php38" data-toggle='tab'>PHP</a></li>
  <li><a href="#node38" data-toggle='tab'>Node</a></li>
  <li><a href="#response38" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby38">
    <pre>
zoneId = '97793'
domainId = '79747'
params = {"custom_domain"=>"cdn.somenewdomain41.com"}
api.put('/zones/push/'+zoneId+'/customdomains.json/'+domainId,params)</pre>
  </div>
  <div class="tab-pane" id="python38">
    <pre>
zoneId = '96182'
domainId = '79320'
params = {"custom_domain":"cdn.somenewdomain40.com"}
api.put('/zones/push/'+zoneId+'/customdomains.json/'+domainId,params=params)</pre>
  </div>
  <div class="tab-pane" id="php38">
    <pre>
$zoneId = '97181';
$domainId = '79188';
$params = array("custom_domain"=>"cdn.somenewdomain2.com");
$api->put('/zones/push/'.$zoneId.'/customdomains.json/'.$domainId, $params);
</pre>
  </div>
  <div class="tab-pane" id="node38">
  <pre>
var zoneId = '97181'
var domainId = '79188'
api.put('/zones/push/' + zoneId + '/customdomains.json/' + domainId, { custom_domain: 'cdn.somenewdomain2.com' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response38">
    <pre>
{
    "code": 200,
    "data": {
        "customdomain": {
            "bucket_id": "97181",
            "custom_domain": "cdn.somenewdomain12.com",
            "id": "79188",
            "type": null
        }
    }
}</pre>
  </div>
</div>


## Delete Custom Domain

Deletes a custom domain specified by the {zone_id} and
{customdomain_id} parameters

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/push/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab39">
  <li class="active"><a href="#ruby39" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python39" data-toggle='tab'>Python</a></li>
  <li><a href="#php39" data-toggle='tab'>PHP</a></li>
  <li><a href="#node39" data-toggle='tab'>Node</a></li>
  <li><a href="#response39" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby39">
    <pre>
zoneId = '97793'
domainId = '79747'
api.delete('/zones/push/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="python39">
    <pre>
zoneId = '96182'
domainId = '79320'
api.delete('/zones/push/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="php39">
    <pre>
$zoneId = '97181';
$domainId = '79188';
$api->delete('/zones/push/'.$zoneId.'/customdomains.json/'.$domainId);</pre>
  </div>
  <div class="tab-pane" id="node39">
  <pre>
var zoneId = '97181'
var domainId = '79188'
api.delete('/zones/push/' + zoneId + '/customdomains.json/' + domainId, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response39">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


# VOD Zone API

## List VOD Zones

Returns a list of all VOD zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | VOD Zone ID |
`name` | VOD Zone name |
`label` | The zone's description |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab40">
  <li class="active"><a href="#ruby40" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python40" data-toggle='tab'>Python</a></li>
  <li><a href="#php40" data-toggle='tab'>PHP</a></li>
  <li><a href="#node40" data-toggle='tab'>Node</a></li>
  <li><a href="#response40" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby40">
    <pre>
api.get('/zones/vod.json')</pre>
  </div>
  <div class="tab-pane" id="python40">
    <pre>
api.get('/zones/vod.json')</pre>
  </div>
  <div class="tab-pane" id="php40">
    <pre>
$api->get('/zones/vod.json');</pre>
  </div>
  <div class="tab-pane" id="node40">
  <pre>
api.get('/zones/vod.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response40">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 2,
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "total": 2,
        "vodzones": [
            {
                "cdn_url": "cdn.somedomain.com",
                "creation_date": "2013-05-16 16:02:35",
                "direct_url": "d.newvodzone.alias.netdna-cdn.com",
                "ftp_url": "ftp.newvodzone.alias.netdna-cdn.com",
                "id": "96187",
                "inactive": "0",
                "label": null,
                "locked": "0",
                "name": "newvodzone",
                "pseudo_url": "p.newvodzone.alias.netdna-cdn.com",
                "rtmp_url": "r.newvodzone.alias.netdna-cdn.com",
                "server_id": "30",
                "storage_updated": "2013-05-24 06:35:35",
                "storage_used": "4096",
                "suspend": "0",
                "tmp_url": "newvodzone.alias.netdna-cdn.com",
                "token": null,
                "type": "4"
            },
            {
                "cdn_url": "cdn.somenewdomain3.com",
                "creation_date": "2013-05-23 21:25:44",
                "direct_url": "d.newvodzone3.alias.netdna-cdn.com",
                "ftp_url": "ftp.newvodzone3.alias.netdna-cdn.com",
                "id": "97183",
                "inactive": "0",
                "label": "Some other description",
                "locked": "0",
                "name": "newvodzone3",
                "pseudo_url": "p.newvodzone3.alias.netdna-cdn.com",
                "rtmp_url": "r.newvodzone3.alias.netdna-cdn.com",
                "server_id": "30",
                "storage_updated": "2013-05-24 06:35:35",
                "storage_used": "4096",
                "suspend": "0",
                "tmp_url": "newvodzone3.alias.netdna-cdn.com",
                "token": null,
                "type": "4"
            }
        ]
    }
}</pre>
  </div>
</div>


## Create VOD Zone

Creates a new VOD zone

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`name` | - | <span class="label important">required</span><br />length: 3-30 chars; only letters, digits, and dash (-)accepted | VOD Zone user name |
`password` | - | <span class="label important">required</span><br />length: 5-30 chars | Your desired password |
`token` | - | length: 1-64 chars | The token value (shared secret) for secure streaming |
`label` | - | length: 1-255 chars | Something that describes your zone |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | VOD Zone ID |
`name` | VOD Zone name |
`label` | The zone's description |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab41">
  <li class="active"><a href="#ruby41" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python41" data-toggle='tab'>Python</a></li>
  <li><a href="#php41" data-toggle='tab'>PHP</a></li>
  <li><a href="#node41" data-toggle='tab'>Node</a></li>
  <li><a href="#response41" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby41">
    <pre>
params = {"name"=>"newVodZone99","password"=>"password"}
api.post('/zones/vod.json',params)</pre>
  </div>
  <div class="tab-pane" id="python41">
    <pre>
params = {"name":"newvodZone7","password":"password"}
api.post('/zones/vod.json',data=params)</pre>
  </div>
  <div class="tab-pane" id="php41">
    <pre>
$params = array("name"=>"newVODZone3","password"=>"password");
$api->post('/zones/vod.json',$params);</pre>
  </div>
  <div class="tab-pane" id="node41">
  <pre>
api.post('/zones/vod.json', { name: 'newVODZone3', password: 'password' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response41">
    <pre>
{
    "code": 201,
    "data": {
        "vodzone": {
            "cdn_url": "newvodzone4.alias.netdna-cdn.com",
            "creation_date": "2013-05-24 16:50:18",
            "direct_url": "d.newvodzone4.alias.netdna-cdn.com",
            "ftp_url": "ftp.newvodzone4.alias.netdna-cdn.com",
            "id": 97319,
            "inactive": 0,
            "label": null,
            "locked": 0,
            "name": "newvodzone4",
            "pseudo_url": "p.newvodzone4.alias.netdna-cdn.com",
            "rtmp_url": "r.newvodzone4.alias.netdna-cdn.com",
            "server_id": "30",
            "storage_updated": null,
            "storage_used": null,
            "suspend": 0,
            "tmp_url": "newvodzone4.alias.netdna-cdn.com",
            "token": null,
            "type": 4
        }
    }
}</pre>
  </div>
</div>


## Get VOD Zones Count

Counts all VOD zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The number of VOD zones on the specified account |

### Code Samples

<ul class="nav nav-tabs" id="myTab42">
  <li class="active"><a href="#ruby42" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python42" data-toggle='tab'>Python</a></li>
  <li><a href="#php42" data-toggle='tab'>PHP</a></li>
  <li><a href="#node42" data-toggle='tab'>Node</a></li>
  <li><a href="#response42" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby42">
    <pre>
api.get('/zones/vod.json/count')</pre>
  </div>
  <div class="tab-pane" id="python42">
    <pre>
api.get('/zones/vod.json/count')</pre>
  </div>
  <div class="tab-pane" id="php42">
    <pre>
$api->get('/zones/vod.json/count');</pre>
  </div>
  <div class="tab-pane" id="node42">
  <pre>
api.get('/zones/vod.json/count', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response42">
    <pre>
{
    "code": 200,
    "data": {
        "count": "4"
    }
}</pre>
  </div>
</div>


## Get VOD Zone

Gets a VOD zone specified by the {zone_id} parameter

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod.json/{zone_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | VOD Zone ID |
`name` | VOD Zone name |
`label` | The zone's description |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab43">
  <li class="active"><a href="#ruby43" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python43" data-toggle='tab'>Python</a></li>
  <li><a href="#php43" data-toggle='tab'>PHP</a></li>
  <li><a href="#node43" data-toggle='tab'>Node</a></li>
  <li><a href="#response43" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby43">
    <pre>
id = '97794'
api.get('/zones/vod.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python43">
    <pre>
id = '96187'
api.get('/zones/vod.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php43">
    <pre>
$id = '97183';
$api->get('/zones/vod.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node43">
  <pre>
var id = '97183'
api.get('/zones/vod.json/' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response43">
    <pre>
{
    "code": 200,
    "data": {
        "vodzone": {
            "cdn_url": "cdn.somenewdomain3.com",
            "creation_date": "2013-05-23 21:25:44",
            "direct_url": "d.newvodzone3.alias.netdna-cdn.com",
            "ftp_url": "ftp.newvodzone3.alias.netdna-cdn.com",
            "id": "97183",
            "inactive": "0",
            "label": "Some other description",
            "locked": "0",
            "name": "newvodzone3",
            "pseudo_url": "p.newvodzone3.alias.netdna-cdn.com",
            "rtmp_url": "r.newvodzone3.alias.netdna-cdn.com",
            "server_id": "30",
            "storage_updated": "2013-05-24 06:35:35",
            "storage_used": "4096",
            "suspend": "0",
            "tmp_url": "newvodzone3.alias.netdna-cdn.com",
            "token": null,
            "type": "4"
        }
    }
}</pre>
  </div>
</div>


## Update VOD Zone

Updates a VOD zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod.json/{zone_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`password` | - | length: 5-30 chars | Your desired password |
`token` | - | length: 1-64 chars | The token value (shared secret) for secure streaming |
`label` | - | length: 1-255 chars | Something that describes your zone |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | VOD Zone ID |
`name` | VOD Zone name |
`label` | The zone's description |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab44">
  <li class="active"><a href="#ruby44" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python44" data-toggle='tab'>Python</a></li>
  <li><a href="#php44" data-toggle='tab'>PHP</a></li>
  <li><a href="#node44" data-toggle='tab'>Node</a></li>
  <li><a href="#response44" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby44">
    <pre>
id = '97794'
params = {"label"=>"Some other description"}
api.put('/zones/vod.json/'+id,params)</pre>
  </div>
  <div class="tab-pane" id="python44">
    <pre>
id = '96187'
params = {"label":"Some other description"}
api.put('/zones/vod.json/'+id,params=params)</pre>
  </div>
  <div class="tab-pane" id="php44">
    <pre>
$id = '97183';
$params =  array("label"=>"Some other description");
$api->put('/zones/vod.json/'.$id,$params);</pre>
  </div>
  <div class="tab-pane" id="node44">
  <pre>
var id = '97183'
api.put('/zones/vod.json/' + id, { label: 'Some other description' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response44">
    <pre>
{
    "code": 200,
    "data": {
        "vodzone": {
            "cdn_url": "cdn.somenewdomain3.com",
            "creation_date": "2013-05-23 21:25:44",
            "direct_url": "d.newvodzone3.alias.netdna-cdn.com",
            "ftp_url": "ftp.newvodzone3.alias.netdna-cdn.com",
            "id": "97183",
            "inactive": "0",
            "label": "Some other description",
            "locked": "0",
            "name": "newvodzone3",
            "pseudo_url": "p.newvodzone3.alias.netdna-cdn.com",
            "rtmp_url": "r.newvodzone3.alias.netdna-cdn.com",
            "server_id": "30",
            "storage_updated": "2013-05-24 06:35:35",
            "storage_used": "4096",
            "suspend": "0",
            "tmp_url": "newvodzone3.alias.netdna-cdn.com",
            "token": null,
            "type": "4"
        }
    }
}</pre>
  </div>
</div>


## Delete VOD Zone

Deletes a VOD zone specified by the {zone_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod.json/{zone_id}</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab45">
  <li class="active"><a href="#ruby45" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python45" data-toggle='tab'>Python</a></li>
  <li><a href="#php45" data-toggle='tab'>PHP</a></li>
  <li><a href="#node45" data-toggle='tab'>Node</a></li>
  <li><a href="#response45" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby45">
    <pre>
id = '97794'
api.delete('/zones/vod.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python45">
    <pre>
id = '96187'
api.delete('/zones/vod.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php45">
    <pre>
$id = '97183';
$api->delete('/zones/vod.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node45">
  <pre>
var id = '97183'
api.delete('/zones/vod.json/' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response45">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Enable VOD Zone

Enables a VOD zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod/{zone_id}/enable.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab46">
  <li class="active"><a href="#ruby46" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python46" data-toggle='tab'>Python</a></li>
  <li><a href="#php46" data-toggle='tab'>PHP</a></li>
  <li><a href="#node46" data-toggle='tab'>Node</a></li>
  <li><a href="#response46" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby46">
    <pre>
id = '97794'
api.put('/zones/vod/'+id+'/enable.json')</pre>
  </div>
  <div class="tab-pane" id="python46">
    <pre>
id = '96187'
api.put('/zones/vod/'+id+'/enable.json')</pre>
  </div>
  <div class="tab-pane" id="php46">
    <pre>
$id = '96187';
$api->put('/zones/vod/'.$id.'/enable.json');</pre>
  </div>
  <div class="tab-pane" id="node46">
  <pre>
var id = '96187'
api.put('/zones/vod/' + id + '/enable.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response46">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Disable VOD Zone

Disables a VOD zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod/{zone_id}/disable.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab47">
  <li class="active"><a href="#ruby47" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python47" data-toggle='tab'>Python</a></li>
  <li><a href="#php47" data-toggle='tab'>PHP</a></li>
  <li><a href="#node47" data-toggle='tab'>Node</a></li>
  <li><a href="#response47" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby47">
    <pre>
id = '97794'
api.put('/zones/vod/'+id+'/disable.json')</pre>
  </div>
  <div class="tab-pane" id="python47">
    <pre>
id = '96187'
api.put('/zones/vod/'+id+'/disable.json')</pre>
  </div>
  <div class="tab-pane" id="php47">
    <pre>
$id = '96187';
$api->put('/zones/vod/'.$id.'/disable.json');</pre>
  </div>
  <div class="tab-pane" id="node47">
  <pre>
var id = '96187'
api.put('/zones/vod/' + id + '/disable.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response47">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


# VOD Zone Custom Domains API

## List Custom Domains

Returns a list of all custom domains on the zone specified by
{zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod/{zone_id}/customdomains.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | A valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab48">
  <li class="active"><a href="#ruby48" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python48" data-toggle='tab'>Python</a></li>
  <li><a href="#php48" data-toggle='tab'>PHP</a></li>
  <li><a href="#node48" data-toggle='tab'>Node</a></li>
  <li><a href="#response48" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby48">
    <pre>
id = '97794'
api.get('/zones/vod/'+id+'/customdomains.json')</pre>
  </div>
  <div class="tab-pane" id="python48">
    <pre>
id = '96187'
api.get('/zones/vod/'+id+'/customdomains.json')</pre>
  </div>
  <div class="tab-pane" id="php48">
    <pre>
$id = '97183';
$api->get('/zones/vod/'.$id.'/customdomains.json');</pre>
  </div>
  <div class="tab-pane" id="node48">
  <pre>
var id = '97183'
api.get('/zones/vod.json/' + id + '/customdomains.json, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response48">
    <pre>
{
    "code": 200,
    "data": {
        "customdomains": [
            {
                "bucket_id": "97183",
                "custom_domain": "cdn.somenewdomain3.com",
                "id": "79191",
                "type": "vod-rtmp"
            }
        ],
        "total": 1
    }
}</pre>
  </div>
</div>


## Create Custom Domain

Adds a new custom domain to {zone_id}

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod/{zone_id}/customdomains.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`custom_domain` | - | <span class="label important">required</span><br />length: 1-255 chars, valid::custom_domain, !valid::full_domain | A valid custom domain |
`type` | - | Applies only to VOD Zones and must be either 'vod-rtmp','vod-pseudo', 'vod-direct', or 'vod-ftp' | The type of custom domain being created |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab49">
  <li class="active"><a href="#ruby49" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python49" data-toggle='tab'>Python</a></li>
  <li><a href="#php49" data-toggle='tab'>PHP</a></li>
  <li><a href="#node49" data-toggle='tab'>Node</a></li>
  <li><a href="#response49" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby49">
    <pre>
id = '97794'
params = {"custom_domain"=>"cdn.somedomain39.com","type"=>"vod-rtmp"}
api.post('/zones/vod/'+id+'/customdomains.json', params)</pre>
  </div>
  <div class="tab-pane" id="python49">
    <pre>
id = '96187'
params = {"custom_domain":"cdn.somedomain16.com","type":"vod-rtmp"}
api.post('/zones/vod/'+id+'/customdomains.json', params)</pre>
  </div>
  <div class="tab-pane" id="php49">
    <pre>
$id = '97183';
$params = array("custom_domain"=>"cdn.somedomain2.com","type"=>"vod-rtmp");
$api->post('/zones/vod/'.$id.'/customdomains.json', $params);</pre>
  </div>
  <div class="tab-pane" id="node49">
  <pre>
var id = '97183'
api.post('/zones/vod/' + id + '/customdomains.json', { custom_domain: 'cdn.somedomain2.com', type: 'vod-rtmp' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response49">
    <pre>
{
    "code": 201,
    "data": {
        "customdomain": {
            "bucket_id": "97183",
            "custom_domain": "cdn.somedomain2.com",
            "id": 79284,
            "type": "vod-rtmp"
        }
    }
}</pre>
  </div>
</div>


## Get Custom Domain

Gets a custom domain specified by the {zone_id} and
{customdomain_id} parameters

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab50">
  <li class="active"><a href="#ruby50" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python50" data-toggle='tab'>Python</a></li>
  <li><a href="#php50" data-toggle='tab'>PHP</a></li>
  <li><a href="#node50" data-toggle='tab'>Node</a></li>
  <li><a href="#response50" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby50">
    <pre>
zoneId = '97794'
domainId = '79748'
api.get('/zones/vod/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="python50">
    <pre>
zoneId = '96187'
domainId = '79321'
api.get('/zones/vod/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="php50">
    <pre>
$zoneId = '97183';
$domainId = '79191';
$api->get('/zones/vod/'.$zoneId.'/customdomains.json/'.$domainId);</pre>
  </div>
  <div class="tab-pane" id="node50">
  <pre>
var zoneId = '97183'
var domainId = '79191'
api.get('/zones/vod/' + zoneId + '/customdomains.json/' + domainId, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response50">
    <pre>
{
    "code": 200,
    "data": {
        "customdomain": {
            "bucket_id": "97183",
            "custom_domain": "cdn.somenewdomain3.com",
            "id": "79191",
            "type": "vod-rtmp"
        }
    }
}</pre>
  </div>
</div>


## Update Custom Domain

Updates a custom domain specified by the id parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`custom_domain` | - | <span class="label important">required</span><br />length: 1-255 chars, valid::custom_domain, !valid::full_domain | A new valid custom domain |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The id of the custom domain |
`bucket_id` | The id of the zone the custom domain belongs to |
`custom_domain` | The new valid custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab51">
  <li class="active"><a href="#ruby51" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python51" data-toggle='tab'>Python</a></li>
  <li><a href="#php51" data-toggle='tab'>PHP</a></li>
  <li><a href="#node51" data-toggle='tab'>Node</a></li>
  <li><a href="#response51" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby51">
    <pre>
zoneId = '97794'
domainId = '79748'
params = {"custom_domain"=>"cdn.somenewdomain49.com"}
api.put('/zones/vod/'+zoneId+'/customdomains.json/'+domainId,params)</pre>
  </div>
  <div class="tab-pane" id="python51">
    <pre>
zoneId = '96187'
domainId = '79321'
params = {"custom_domain":"cdn.somenewdomain401.com"}
api.put('/zones/vod/'+zoneId+'/customdomains.json/'+domainId,params=params)</pre>
  </div>
  <div class="tab-pane" id="php51">
    <pre>
$zoneId = '97183';
$domainId = '79191';
$params = array("custom_domain"=>"cdn.somenewdomain3.com");
$api->put('/zones/vod/'.$zoneId.'/customdomains.json/'.$domainId, $params);</pre>
  </div>
  <div class="tab-pane" id="node51">
  <pre>
var zoneId = '97183'
var domainId = '79191'
api.put('/zones/vod/' + zoneId + '/customdomains.json/' + domainId, { custom_domain: 'cdn.somenewdomain3.com' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response51">
    <pre>
{
    "code": 200,
    "data": {
        "customdomain": {
            "bucket_id": "97183",
            "custom_domain": "cdn.somenewdomain42.com",
            "id": "79284",
            "type": "vod-rtmp"
        }
    }
}</pre>
  </div>
</div>


## Delete Custom Domain

Deletes a custom domain specified by the {zone_id} and
{customdomain_id} parameters

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/vod/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab52">
  <li class="active"><a href="#ruby52" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python52" data-toggle='tab'>Python</a></li>
  <li><a href="#php52" data-toggle='tab'>PHP</a></li>
  <li><a href="#node52" data-toggle='tab'>Node</a></li>
  <li><a href="#response52" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby52">
    <pre>
zoneId = '97794'
domainId = '79748'
api.delete('/zones/vod/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="python52">
    <pre>
zoneId = '96187'
domainId = '79321'
api.delete('/zones/vod/'+zoneId+'/customdomains.json/'+domainId)</pre>
  </div>
  <div class="tab-pane" id="php52">
    <pre>
$zoneId = '97183';
$domainId = '79191';
$api->delete('/zones/vod/'.$zoneId.'/customdomains.json/'.$domainId);</pre>
  </div>
  <div class="tab-pane" id="node52">
  <pre>
var zoneId = '97183'
var domainId = '79191'
api.delete('/zones/vod/' + zoneId + '/customdomains.json/' + domainId, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response52">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


# Live Zone API

## List Live Zones

Returns a list of all live zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/live.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Live Zone ID |
`name` | Live Zone name |
`label` | The zone's description |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab53">
  <li class="active"><a href="#ruby53" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python53" data-toggle='tab'>Python</a></li>
  <li><a href="#php53" data-toggle='tab'>PHP</a></li>
  <li><a href="#node53" data-toggle='tab'>Node</a></li>
  <li><a href="#response53" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby53">
    <pre>
api.get('/zones/live.json')</pre>
  </div>
  <div class="tab-pane" id="python53">
    <pre>
api.get('/zones/live.json')</pre>
  </div>
  <div class="tab-pane" id="php53">
    <pre>
$api->get('/zones/live.json');</pre>
  </div>
  <div class="tab-pane" id="node53">
  <pre>
api.get('/zones/live.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response53">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 2,
        "livezones": [
            {
                "cdn_url": "newlivezone.alias.netdna-cdn.com",
                "creation_date": "2013-05-16 16:23:49",
                "id": "96193",
                "inactive": "0",
                "label": null,
                "locked": "0",
                "name": "newlivezone",
                "pub_url": "publish.newlivezone.alias.netdna-cdn.com/live/96193",
                "server_id": "3",
                "suspend": "0",
                "tmp_url": "newlivezone.alias.netdna-cdn.com",
                "type": "5",
                "view_url": "newlivezone.alias.netdna-cdn.com/live/96193"
            },
            {
                "cdn_url": "newlivezone3.alias.netdna-cdn.com",
                "creation_date": "2013-05-23 21:50:00",
                "id": "97185",
                "inactive": "0",
                "label": "Some other description",
                "locked": "0",
                "name": "newlivezone3",
                "pub_url": "publish.newlivezone3.alias.netdna-cdn.com/live/97185",
                "server_id": "3",
                "suspend": "0",
                "tmp_url": "newlivezone3.alias.netdna-cdn.com",
                "type": "5",
                "view_url": "newlivezone3.alias.netdna-cdn.com/live/97185"
            }
        ],
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "total": 2
    }
}</pre>
  </div>
</div>


## Create Live Zone

Creates a new live zone

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/live.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`name` | - | <span class="label important">required</span><br />length: 3-30 chars; only letters, digits, and dash (-)accepted | Your desired zone name |
`password` | - | <span class="label important">required</span><br />length: 5-30 chars | Your desired password |
`label` | - | length: 1-255 chars | Something that describes your zone |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Live Zone ID |
`name` | Live Zone name |
`label` | The zone's description |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab54">
  <li class="active"><a href="#ruby54" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python54" data-toggle='tab'>Python</a></li>
  <li><a href="#php54" data-toggle='tab'>PHP</a></li>
  <li><a href="#node54" data-toggle='tab'>Node</a></li>
  <li><a href="#response54" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby54">
    <pre>
params = {"name"=>"newLiveZone99","password"=>"password"}
api.post('/zones/live.json',params)</pre>
  </div>
  <div class="tab-pane" id="python54">
    <pre>
params = {"name":"newliveZone7","password":"password"}
api.post('/zones/live.json',data=params)</pre>
  </div>
  <div class="tab-pane" id="php54">
    <pre>
$params = array("name"=>"newLiveZone3","password"=>"password");
$api->post('/zones/live.json', $params);</pre>
  </div>
  <div class="tab-pane" id="node54">
  <pre>
api.post('/zones/live.json',  { name: 'newLiveZone3', password: 'password' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response54">
    <pre>
{
    "code": 201,
    "data": {
        "livezone": {
            "cdn_url": "newlivezone4.alias.netdna-cdn.com",
            "creation_date": "2013-05-24 17:01:30",
            "id": 97323,
            "inactive": 0,
            "label": null,
            "locked": 0,
            "name": "newlivezone4",
            "pub_url": "publish.newlivezone4.alias.netdna-cdn.com/live/97323",
            "server_id": 3,
            "suspend": 0,
            "tmp_url": "newlivezone4.alias.netdna-cdn.com",
            "type": 5,
            "view_url": "newlivezone4.alias.netdna-cdn.com/live/97323"
        }
    }
}</pre>
  </div>
</div>


## Get Live Zones Count

Counts all live zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/live.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The number of live zones on the specified account |

### Code Samples

<ul class="nav nav-tabs" id="myTab55">
  <li class="active"><a href="#ruby55" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python55" data-toggle='tab'>Python</a></li>
  <li><a href="#php55" data-toggle='tab'>PHP</a></li>
  <li><a href="#node55" data-toggle='tab'>Node</a></li>
  <li><a href="#response55" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby55">
    <pre>
api.get('/zones/live.json/count')</pre>
  </div>
  <div class="tab-pane" id="python55">
    <pre>
api.get('/zones/live.json/count')</pre>
  </div>
  <div class="tab-pane" id="php55">
    <pre>
$api->get('/zones/live.json/count');</pre>
  </div>
  <div class="tab-pane" id="node55">
  <pre>
api.get('/zones.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response55">
    <pre>
{
    "code": 200,
    "data": {
        "count": "4"
    }
}
</pre>
  </div>
</div>


## Get Live Zone

Gets a live zone specified by the {zone_id} parameter

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/live.json/{zone_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Live Zone ID |
`name` | Live Zone name |
`label` | The zone's description |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab56">
  <li class="active56"><a href="#ruby" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python56" data-toggle='tab'>Python</a></li>
  <li><a href="#php56" data-toggle='tab'>PHP</a></li>
  <li><a href="#node56" data-toggle='tab'>Node</a></li>
  <li><a href="#response56" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby56">
    <pre>
id = '97795'
api.get('/zones/live.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python56">
    <pre>
id = '96193'
api.get('/zones/live.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php56">
    <pre>
$id = '97185';
$api->get('/zones/live.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node56">
  <pre>
var id = '97185'
api.get('/zones/live.json/' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response56">
    <pre>
{
    "code": 200,
    "data": {
        "livezone": {
            "cdn_url": "newlivezone3.alias.netdna-cdn.com",
            "creation_date": "2013-05-23 21:50:00",
            "id": "97185",
            "inactive": "0",
            "label": "Some other description",
            "locked": "0",
            "name": "newlivezone3",
            "pub_url": "publish.newlivezone3.alias.netdna-cdn.com/live/97185",
            "server_id": "3",
            "suspend": "0",
            "tmp_url": "newlivezone3.alias.netdna-cdn.com",
            "type": "5",
            "view_url": "newlivezone3.alias.netdna-cdn.com/live/97185"
        }
    }
}</pre>
  </div>
</div>


## Update Live Zone

Updates a live zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/live.json/{zone_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`password` | - | length: 5-30 chars | Your desired password |
`token` | - | length: 1-64 chars | The token value (shared secret) for secure streaming |
`label` | - | length: 1-255 chars | Something that describes your zone |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Live Zone ID |
`name` | Live Zone name |
`label` | The zone's description |
`suspend` | Flag denoting if the zone has been suspended |
`locked` | Flag denoting if the zone has been locked |
`inactive` | Flag denoting if the zone has been deleted |
`creation_date` | Date Created |

### Code Samples

<ul class="nav nav-tabs" id="myTab57">
  <li class="active"><a href="#ruby57" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python57" data-toggle='tab'>Python</a></li>
  <li><a href="#php57" data-toggle='tab'>PHP</a></li>
  <li><a href="#node57" data-toggle='tab'>Node</a></li>
  <li><a href="#response57" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby57">
    <pre>
id = '96193'
params = {"label"=>"Some other description"}
api.put('/zones/live.json/'+id,params)</pre>
  </div>
  <div class="tab-pane" id="python57">
    <pre>
id = '96193'
params = {"label":"Some other description"}
api.put('/zones/live.json/'+id,params=params)</pre>
  </div>
  <div class="tab-pane" id="php57">
    <pre>
$id = '97185';
$params =  array("label"=>"Some other description");
$api->put('/zones/live.json/'.$id,$params);
</pre>
  </div>
  <div class="tab-pane" id="node57">
  <pre>
var id = '97185'
api.put('/zones/live.json/' + id, { label: 'Some other description' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response57">
    <pre>
{
    "code": 200,
    "data": {
        "livezone": {
            "cdn_url": "newlivezone3.alias.netdna-cdn.com",
            "creation_date": "2013-05-23 21:50:00",
            "id": "97185",
            "inactive": "0",
            "label": "Some other description",
            "locked": "0",
            "name": "newlivezone3",
            "pub_url": "publish.newlivezone3.alias.netdna-cdn.com/live/97185",
            "server_id": "3",
            "suspend": "0",
            "tmp_url": "newlivezone3.alias.netdna-cdn.com",
            "type": "5",
            "view_url": "newlivezone3.alias.netdna-cdn.com/live/97185"
        }
    }
}</pre>
  </div>
</div>


## Delete Live Zone

Deletes a live zone specified by the {zone_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/live.json/{zone_id}</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab58">
  <li class="active"><a href="#ruby58" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python58" data-toggle='tab'>Python</a></li>
  <li><a href="#php58" data-toggle='tab'>PHP</a></li>
  <li><a href="#node58" data-toggle='tab'>Node</a></li>
  <li><a href="#response58" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby58">
    <pre>
id = '97795'
api.delete('/zones/live.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python58">
    <pre>
id = '96193'
api.delete('/zones/live.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php58">
    <pre>
$id = '97185';
$api->delete('/zones/live.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node58">
  <pre>
var id = '97185'
api.delete('/zones/live.json/' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response58">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Enable Live Zone

Enables a live zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/live/{zone_id}/enable.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab59">
  <li class="active"><a href="#ruby59" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python59" data-toggle='tab'>Python</a></li>
  <li><a href="#php59" data-toggle='tab'>PHP</a></li>
  <li><a href="#node59" data-toggle='tab'>Node</a></li>
  <li><a href="#response59" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby59">
    <pre>
id = '97795'
api.put('/zones/live/'+id+'/enable.json')</pre>
  </div>
  <div class="tab-pane" id="python59">
    <pre>
id = '96193'
api.put('/zones/live/'+id+'/enable.json')</pre>
  </div>
  <div class="tab-pane" id="php59">
    <pre>
$id = '96061';
$api->put('/zones/live/'.$id.'/enable.json');</pre>
  </div>
  <div class="tab-pane" id="node59">
  <pre>
var id = '96061'
api.put('/zones/live/' + id + '/enable.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response59">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Disable Live Zone

Disables a live zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/live/{zone_id}/disable.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab60">
  <li class="active"><a href="#ruby60" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python60" data-toggle='tab'>Python</a></li>
  <li><a href="#php60" data-toggle='tab'>PHP</a></li>
  <li><a href="#node60" data-toggle='tab'>Node</a></li>
  <li><a href="#response60" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby60">
    <pre>
id = '97795'
api.put('/zones/live/'+id+'/disable.json')</pre>
  </div>
  <div class="tab-pane" id="python60">
    <pre>
id = '96193'
api.put('/zones/live/'+id+'/disable.json')</pre>
  </div>
  <div class="tab-pane" id="php60">
    <pre>
$id = '96061';
api->put('/zones/live/'.$id.'/disable.json');</pre>
  </div>
  <div class="tab-pane" id="node60">
  <pre>
var id = '96061'
api.put('/zones/live/' + id + '/disable.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response60">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


# Zones SSL API

## Get Zone's SSL Information

Get the SSL certificate for the specified {zone_type} and
{zone_id}.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/{zone_type}/{zone_id}/ssl.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab61">
  <li class="active"><a href="#ruby61" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python61" data-toggle='tab'>Python</a></li>
  <li><a href="#php61" data-toggle='tab'>PHP</a></li>
  <li><a href="#node61" data-toggle='tab'>Node</a></li>
  <li><a href="#response61" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby61">
    <pre>
id = '96061'
type = 'pull'
api.get('/zones/'+type+'/'+id+'/ssl.json')</pre>
  </div>
  <div class="tab-pane" id="python61">
    <pre>
id = '96061'
type = 'pull'
api.get('/zones/'+type+'/'+id+'/ssl.json')</pre>
  </div>
  <div class="tab-pane" id="php61">
    <pre>
$id = '96061';
$type = 'pull';
$api->get('/zones/'.$type.'/'.$id.'/ssl.json');</pre>
  </div>
  <div class="tab-pane" id="node61">
  <pre>
var id = '96061'
var type = 'pull'
api.get('/zones/' + type + '/' + id + '/ssl.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response61">
    <pre>
{
  "code":201,
  "data":{
    "ssl":{
      "id":1459,
      "ssl_crt":"-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n",
      "ssl_key":"-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----",
      "ssl_cabundle":null,
      "date_expiration":"2014-01-24",
      "anycast_ip_id":null,
      "wildcard":1,
      "domain":"*.idcreator.com"
    }
  }
}
</pre>
  </div>
</div>


## Install SSL on Zone

Upload an SSL certificate for the specified {zone_type} and
{zone_id}.

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/{zone_type}/{zone_id}/ssl.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`ssl_crt` | - | <span class="label important">required</span><br /> | The SSL certificate you are installing. |
`ssl_key` | - | <span class="label important">required</span><br /> | The key for the SSL certificate you are installing. |
`ssl_cabundle` | - | The CA Bundle for the SSL Certificate you are installing. |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The SSL Certificate ID. |
`ssl_crt` | The SSL certificate. |
`ssl_key` | The SSL Private Key. |
`ssl_cabundle` | The CA Bundle for the certificate. |
`domain` | The domain applicable to this certificate. |
`date_expiration` | The date of expiration for the certificate. |
`wildcard` | Flag to signify whether this is a wildcard certificate. |

### Code Samples

<ul class="nav nav-tabs" id="myTab62">
  <li class="active"><a href="#ruby62" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python62" data-toggle='tab'>Python</a></li>
  <li><a href="#php62" data-toggle='tab'>PHP</a></li>
  <li><a href="#node62" data-toggle='tab'>Node</a></li>
  <li><a href="#response62" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby62">
    <pre>
id = '96061'
type = 'pull'
ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n"
ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----"
params = {"ssl_crt"=> ssl_crt,"ssl_key"=> ssl_key}
api.post('/zones/'+type+'/'+id+'/ssl.json',params)</pre>
  </div>
  <div class="tab-pane" id="python62">
    <pre>
id = '96061'
type = 'pull'
ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n"
ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----"
params = {"ssl_crt": ssl_crt,"ssl_key": ssl_key}
api.post('/zones/'+type+'/'+id+'/ssl.json',params)</pre>
  </div>
  <div class="tab-pane" id="php62">
    <pre>
$id = '96061';
$type = 'pull';
$ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n";
$ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----";
$params = array("ssl_crt"=>$ssl_crt,"ssl_key"=>$ssl_key);
$api->post('/zones/'.$type.'/'.$id.'/ssl.json',$params);</pre>
  </div>
  <div class="tab-pane" id="node62">
  <pre>
var id = '96061'
var type = 'pull'
var ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n"
var ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----"
api.post('/zones/' + type + '/' + id + '/ssl.json', { ssl_crt: ssl_crt, ssl_key: ssl_key }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response62">
    <pre>
{
  "code":201,
  "data":{
    "ssl":{
      "id":1459,
      "ssl_crt":"-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n",
      "ssl_key":"-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----",
      "ssl_cabundle":null,
      "date_expiration":"2014-01-24",
      "anycast_ip_id":null,
      "wildcard":1,
      "domain":"*.idcreator.com"
    }
  }
}
</pre>
  </div>
</div>


## Update Zone's SSL Information

Update the SSL certificate for the specified {zone_type} and
{zone_id}.

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/{zone_type}/{zone_id}/ssl.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`ssl_crt` | - | <span class="label important">required</span><br /> | The SSL certificate you are installing. |
`ssl_key` | - | <span class="label important">required</span><br /> | The key for the SSL certificate you are installing. |
`ssl_cabundle` | - | The CABundle for the SSL Certificate you are installing. |


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The SSL Certificate ID. |
`ssl_crt` | The SSL certificate. |
`ssl_key` | The SSL Private Key. |
`ssl_cabundle` | The CA Bundle for the certificate. |
`domain` | The domain applicable to this certificate. |
`date_expiration` | The date of expiration for the certificate. |
`wildcard` | Flag to signify whether this is a wildcard certificate. |

### Code Samples

<ul class="nav nav-tabs" id="myTab63">
  <li class="active"><a href="#ruby63" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python63" data-toggle='tab'>Python</a></li>
  <li><a href="#php63" data-toggle='tab'>PHP</a></li>
  <li><a href="#node63" data-toggle='tab'>Node</a></li>
  <li><a href="#response63" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby63">
    <pre>
id = '96061'
type = 'pull'
ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n"
ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----"
params = {"ssl_crt"=> ssl_crt,"ssl_key"=> ssl_key}
api.put('/zones/'+type+'/'+id+'/ssl.json',params)</pre>
  </div>
  <div class="tab-pane" id="python63">
    <pre>
id = '96061'
type = 'pull'
ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n"
ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----"
params = {"ssl_crt": ssl_crt,"ssl_key": ssl_key}
api.put('/zones/'+type+'/'+id+'/ssl.json',params)</pre>
  </div>
  <div class="tab-pane" id="php63">
    <pre>
$id = '96061';
$type = 'pull';
$ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n";
$ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----";
$ssl_key = "
$params = array("ssl_crt"=>$ssl_crt,"ssl_key"=>$ssl_key);
$api->put('/zones/'.$type.'/'.$id.'/ssl.json',$params);</pre>
  </div>
  <div class="tab-pane" id="node63">
  <pre>
var id = '96061'
var type = 'pull'
var ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n"
var ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----"
api.put('/zones/' + type + '/' + id + '/ssl.json', { ssl_crt: ssl_crt, ssl_key: ssl_key }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response63">
    <pre>
{
  "code":201,
  "data":{
    "ssl":{
      "id":1459,
      "ssl_crt":"-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n",
      "ssl_key":"-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----",
      "ssl_cabundle":null,
      "date_expiration":"2014-01-24",
      "anycast_ip_id":null,
      "wildcard":1,
      "domain":"*.idcreator.com"
    }
  }
}
</pre>
  </div>
</div>


## Remove Zone's SSL Information

Remove the SSL certificate for the specified {zone_type} and
{zone_id}.

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/{zone_type}/{zone_id}/ssl.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab64">
  <li class="active"><a href="#ruby64" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python64" data-toggle='tab'>Python</a></li>
  <li><a href="#php64" data-toggle='tab'>PHP</a></li>
  <li><a href="#node64" data-toggle='tab'>Node</a></li>
  <li><a href="#response64" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby64">
    <pre>
id = '96061'
type = 'pull'
api.delete('/zones/'+type+'/'+id+'/ssl.json')</pre>
  </div>
  <div class="tab-pane" id="python64">
    <pre>
id = '96061'
type = 'pull'
api.delete('/zones/'+type+'/'+id+'/ssl.json')</pre>
  </div>
  <div class="tab-pane" id="php64">
    <pre>
$id = '96061';
$type = 'pull';
$api->delete('/zones/'.$type.'/'.$id.'/ssl.json');</pre>
  </div>
  <div class="tab-pane" id="node64">
  <pre>
var id = '96061'
var type = 'pull'
api.delete('/zones/' + type + '/' + id + '/ssl.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response64">
    <pre>
{
  "code":200,
  "data":{
    "zone":{
      "id":"90652",
      "name":"newpullzonec5",
      "username":"username",
      "company_id":"1234",
      "url":"http:\/\/someplace.net",
      "port":"80",
      "ip":"123.0.0.49",
      "vhost":"someplace.net",
      "type":"2",
      "compress":"0",
      "backend_compress":"0",
      "queries":"1",
      "max_cache_size":"50000",
      "suspend":"0",
      "cache_valid":"1d",
      "content_encoding":"1",
      "label":"",
      "inactive":"0",
      "valid_referers":null,
      "key_zone_size":"50m",
      "expires":null,
      "disallow_robots":"0",
      "disallow_robots_txt":null,
      "canonical_link_headers":"0",
      "content_disposition":"0",
      "custom_domain_limit":"7",
      "locked":"0",
      "server_id":"123",
      "ssl":0,
      "sslshared":"0",
      "creation_date":"2013-07-22 19:00:54",
      "dsa_ip":null,
      "geo_enabled":"0",
      "set_host_header":null,
      "ssl_id":0,
      "dns_check":"1",
      "hit_bandwidth_by_dir":"0",
      "hit_bandwidth_by_custom_domain":"0",
      "hit_bandwidth_by_file_name_status_code":"0",
      "cache_version":"0",
      "ignore_setcookie_header":"0",
      "hide_setcookie_header":"0",
      "ignore_cache_control":"0",
      "use_stale":"0",
      "proxy_cache_lock":"0",
      "pseudo_streaming":"0",
      "secret":null,
      "upstream_enabled":"0",
      "cdn_url":"newpullzonec5.username.netdna-cdn.com",
      "tmp_url":"newpullzonec5.nycacorp.netdna-cdn.com"
    }
  }
}
</pre>
  </div>
</div>


# Zones Upstream API

## Get Upstream information for the current zone

Get the upstream information for the specified {zone_id}.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/{zone_type}/{zone_id}/upstream.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab65">
  <li class="active"><a href="#ruby65" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python65" data-toggle='tab'>Python</a></li>
  <li><a href="#php65" data-toggle='tab'>PHP</a></li>
  <li><a href="#node65" data-toggle='tab'>Node</a></li>
  <li><a href="#response65" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby65">
    <pre>
type = 'pull'
id = '96061'
api.post('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="python65">
    <pre>
type = 'pull'
id = '96061'
api.post('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="php65">
    <pre>
$type = 'pull';
$id = '96061';
$api->post('/zones/'.$type.'/'.$id.'/upstream.json');</pre>
  </div>
  <div class="tab-pane" id="node65">
  <pre>
var type = 'pull'
var id = '96061'
api.post('/zones/' + type + '/' + id + '/upstream.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response65">
    <pre>
</pre>
  </div>
</div>


## Enable Upstream on Zone

Create and enable Upstream for a specific {zone_id}.

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/{zone_type}/{zone_id}/upstream.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`server_url` | - | <span class="label important">required</span><br /> | The server URL or IP to provide the streaming resources
`port` | - | <span class="label important">required</span><br /> | The port where server is to be called


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The Upstream ID.
`bucket_id` | The bucket_id it belongs to
`server_url` | The server URL or IP
`port` | The port it uses to call the server

### Code Samples

<ul class="nav nav-tabs" id="myTab66">
  <li class="active"><a href="#ruby66" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python66" data-toggle='tab'>Python</a></li>
  <li><a href="#php66" data-toggle='tab'>PHP</a></li>
  <li><a href="#node66" data-toggle='tab'>Node</a></li>
  <li><a href="#response66" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby66">
    <pre>
type = 'pull'
id = '96061'
params = {"server_url"=> "http=>//cdn.somedomain.com","server"=> "http=>//cdn.somedomain.com","port"=> "80"}
api.post('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="python66">
    <pre>
type = 'pull'
id = '96061'
params = {"server_url": "http://cdn.somedomain.com","server": "http://cdn.somedomain.com","port": "80"}
api.post('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="php66">
    <pre>
$type = 'pull';
$id = '96061';
$params = array("server_url"=>"http://cdn.somedomain.com","server"=>"http://cdn.somedomain.com","port"=>"80");
$api->post('/zones/'.$type.'/'.$id.'/upstream.json');</pre>
  </div>
  <div class="tab-pane" id="node66">
  <pre>
var type = 'pull'
var id = '96061'
api.post('/zones/' + type + '/' + id + '/upstream.json', { server_url: 'http://cdn.somedomain.com', server: 'http://cdn.somedomain.com', port: '80' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response66">
    <pre>
</pre>
  </div>
</div>


## Update Zone's Upstream Information

Update the Upstream information for the specified {zone_id}.

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/{zone_type}/{zone_id}/upstream.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`upstream_id` | - | <span class="label important">required</span><br /> | The Upstream Information you're modifying
`server_url` | - | <span class="label important">required</span><br /> | The server URL or IP
`port` | - | <span class="label important">required</span><br /> | The port used to call the server


### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The Upstream ID.
`bucket_id` | The bucket_id it belongs to
`server_url` | The server URL or IP
`port` | The port it uses to call the server

### Code Samples

<ul class="nav nav-tabs" id="myTab67">
  <li class="active"><a href="#ruby67" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python67" data-toggle='tab'>Python</a></li>
  <li><a href="#php67" data-toggle='tab'>PHP</a></li>
  <li><a href="#node67" data-toggle='tab'>Node</a></li>
  <li><a href="#response67" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby67">
    <pre>
type = 'pull'
id = '96061'
params = {"upstream_id"=> "93013","server_url"=> "http=>//somedomain.com","port"=> "80"}
api.put('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="python67">
    <pre>
type = 'pull'
id = '96061'
params = {"upstream_id": "93013","server_url": "http://somedomain.net","port": "80"}
api.put('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="php67">
    <pre>
$type = 'pull';
$id = '96061';
$params = array("upstream_id"=>"93013","server_url"=>"http://somedomain.net","port"=>"80");
$api->put('/zones/'.$type.'/'.$id.'/upstream.json');</pre>
  </div>
  <div class="tab-pane" id="node67">
  <pre>
var type = 'pull'
var id = '96061'
api.put('/zones/' + type + '/' + id + '/upstream.json', { upstream_id: '93013', server_url: 'http://somedomain.net', port: '80' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response67">
    <pre>
</pre>
  </div>
</div>


## Remove Zone's Upstream Information

Remove the Upstream Information for the specified {zone_id}.

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.netdna.com/{companyalias}/zones/{zone_type}/{zone_id}/upstream.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab68">
  <li class="active"><a href="#ruby68" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python68" data-toggle='tab'>Python</a></li>
  <li><a href="#php68" data-toggle='tab'>PHP</a></li>
  <li><a href="#node68" data-toggle='tab'>Node</a></li>
  <li><a href="#response68" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby68">
    <pre>
type = 'pull'
id = '96061'
api.delete('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="python68">
    <pre>
type = 'pull'
id = '96061'
api.delete('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="php68">
    <pre>
$type = 'pull';
$id = '96061';
$api->delete('/zones/'.$type.'/'.$id.'/upstream.json');</pre>
  </div>
  <div class="tab-pane" id="node68">
  <pre>
var type = 'pull'
var id = '96061'
api.delete('/zones/' + type + '/' + id + '/upstream.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response68">
    <pre>
</pre>
  </div>
</div>


# Reports API

## Get Account Stats

Gets the total usage statistics for your account, optionally broken up by
{report_type}. If no {report_type} is given the request will return
the total usage on your account.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/stats.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`size` | The amount of bytes transferred |
`hit` | The number of times files were requested |
`noncache_hit` | The number of times a requested file was not in cache |
`cache_hit` | The number of times a requested file was already cached |
`timestamp` | The timestamp for the corresponding {report_type} |

### Code Samples

<ul class="nav nav-tabs" id="myTab69">
  <li class="active"><a href="#ruby69" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python69" data-toggle='tab'>Python</a></li>
  <li><a href="#php69" data-toggle='tab'>PHP</a></li>
  <li><a href="#node69" data-toggle='tab'>Node</a></li>
  <li><a href="#response69" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby69">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/stats.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python69">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/stats.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php69">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/stats.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node69">
  <pre>
var reportType = '' //Vaild input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/stats.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response69">
    <pre>
{
    "code": 200,
    "data": {
        "stats": {
            "cache_hit": "0",
            "hit": "20",
            "noncache_hit": "20",
            "size": "0"
        },
        "total": "1"
    }
}</pre>
  </div>
</div>


## Get All Zone Stats

Gets the total usage statistics for each of your zones, optionally broken up by
{report_type}. If no {report_type} is given the timestamp response parameter will be omitted.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/statsbyzone.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`bucket_id` | The Zone ID that corresponds to this set of stats |
`size` | The amount of bytes transferred |
`hit` | The number of times files were requested |
`noncache_hit` | The number of times a requested file was not in cache |
`cache_hit` | The number of times a requested file was already cached |
`timestamp` | The timestamp for the corresponding {report_type} |

### Code Samples

<ul class="nav nav-tabs" id="myTab100">
  <li class="active"><a href="#ruby100" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python100" data-toggle='tab'>Python</a></li>
  <li><a href="#php100" data-toggle='tab'>PHP</a></li>
  <li><a href="#node100" data-toggle='tab'>Node</a></li>
  <li><a href="#response100" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby100">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statsbyzone.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python100">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statsbyzone.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php100">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/statsbyzone.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node100">
  <pre>
var reportType = '' //Vaild input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statsbyzone.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response100">
    <pre>
{
  "code": 200,
  "data": {
    "page": 1,
    "pages": 262,
    "page_size": 50,
    "current_page_size": 50,
    "total": 13097,
    "stats": [
      {
        "zone_id": "4816",
        "size": "20318527",
        "hit": "280",
        "cache_hit": "15",
        "noncache_hit": "265"
      },
      {
        "zone_id": "5023",
        "size": "18032138",
        "hit": "119120",
        "cache_hit": "0",
        "noncache_hit": "119120"
      },
      {
        "zone_id": "5045",
        "size": "10656749286",
        "hit": "950640",
        "cache_hit": "838432",
        "noncache_hit": "112208"
      },

      ....

    ],
    "summary": {
      "size": 5.7138288549144e+14,
      "hit": 17093013874,
      "cache_hit": 14815205275,
      "noncache_hit": 2277808599
    }
  }
}</pre>
  </div>
</div>


## Get a Zone's Stats

Gets the {zone_id} usage statistics optionally broken up by
{report_type}. If no {report_type} is given the request will return
the total usage for the zones.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/stats.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`size` | The amount of bytes transferred |
`hit` | The number of times files were requested |
`noncache_hit` | The number of times a requested file was not in cache |
`cache_hit` | The number of times a requested file was already cached |
`timestamp` | The timestamp for the corresponding {report_type} |



### Code Samples

<ul class="nav nav-tabs" id="myTab70">
  <li class="active"><a href="#ruby70" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python70" data-toggle='tab'>Python</a></li>
  <li><a href="#php70" data-toggle='tab'>PHP</a></li>
  <li><a href="#node70" data-toggle='tab'>Node</a></li>
  <li><a href="#response70" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby70">
    <pre>
id = '96061'
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/'+id+'/stats.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python70">
    <pre>
id = '96061'
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/'+id+'/stats.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php70">
    <pre>
$id = '96061';
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/'.$id.'/stats.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node70">
  <pre>
var id = '96061'
var reportType = '' //Vaild input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/' + id + '/stats.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response70">
    <pre>
{
    "code": 200,
    "data": {
        "stats": {
            "cache_hit": null,
            "hit": null,
            "noncache_hit": null,
            "size": null
        },
        "summary": {
            "cache_hit": null,
            "hit": null,
            "noncache_hit": null,
            "size": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


# Reports by Location API

## List Nodes

Gets a list of all active nodes (locations)

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/nodes.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Node Id |
`name` | Node 3 letter code |
`description` | Full node name |

### Code Samples

<ul class="nav nav-tabs" id="myTab71">
  <li class="active"><a href="#ruby71" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python71" data-toggle='tab'>Python</a></li>
  <li><a href="#php71" data-toggle='tab'>PHP</a></li>
  <li><a href="#node71" data-toggle='tab'>Node</a></li>
  <li><a href="#response71" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby71">
    <pre>
api.get('/reports/nodes.json')</pre>
  </div>
  <div class="tab-pane" id="python71">
    <pre>
api.get('/reports/nodes.json')</pre>
  </div>
  <div class="tab-pane" id="php71">
    <pre>
$api->get('/reports/nodes.json');</pre>
  </div>
  <div class="tab-pane" id="node71">
  <pre>
api.get('/reports/nodes.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response71">
    <pre>
{
    "code": 200,
    "data": {
        "nodes": [
            {
                "description": "Los Angeles",
                "id": "1",
                "name": "lax"
            },
            {
                "description": "New York",
                "id": "3",
                "name": "jfk"
            },
            {
                "description": "Seattle",
                "id": "2",
                "name": "sea"
            },
            {
                "description": "Atlanta",
                "id": "4",
                "name": "atl"
            },
            {
                "description": "Amsterdam",
                "id": "5",
                "name": "ams"
            },
            {
                "description": "Dallas",
                "id": "6",
                "name": "dal"
            },
            {
                "description": "Chicago",
                "id": "8",
                "name": "chi"
            },
            {
                "description": "Virginia",
                "id": "9",
                "name": "vir"
            },
            {
                "description": "Miami",
                "id": "7",
                "name": "mia"
            },
            {
                "description": "London",
                "id": "12",
                "name": "lhr"
            },
            {
                "description": "San Francisco",
                "id": "13",
                "name": "sfo"
            },
            {
                "description": "Los Angeles 3",
                "id": "30",
                "name": "lax"
            }
        ]
    }
}</pre>
  </div>
</div>


## List Nodes by Zone

Gets a list of all active nodes (locations) specified by the
{zone_id} parameter

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/nodes.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Node Id |
`name` | Node 3 letter code |
`description` | Full node name |

### Code Samples

<ul class="nav nav-tabs" id="myTab72">
  <li class="active"><a href="#ruby72" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python72" data-toggle='tab'>Python</a></li>
  <li><a href="#php72" data-toggle='tab'>PHP</a></li>
  <li><a href="#node72" data-toggle='tab'>Node</a></li>
  <li><a href="#response72" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby72">
    <pre>
id = '96061'
api.get('/reports/'+id+'/nodes.json')</pre>
  </div>
  <div class="tab-pane" id="python72">
    <pre>
id = '96061'
api.get('/reports/'+id+'/nodes.json')</pre>
  </div>
  <div class="tab-pane" id="php72">
    <pre>
$id = '96061';
$api->get('/reports/'.$id.'/nodes.json');</pre>
  </div>
  <div class="tab-pane" id="node72">
  <pre>
var id = '96061'
api.get('/reports/' + id + '/nodes.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response72">
    <pre>
{
    "code": 200,
    "data": {
        "nodes": [
            {
                "description": "Dallas",
                "id": "6",
                "name": "dal"
            },
            {
                "description": "Los Angeles",
                "id": "1",
                "name": "lax"
            },
            {
                "description": "Seattle",
                "id": "2",
                "name": "sea"
            },
            {
                "description": "New York",
                "id": "3",
                "name": "jfk"
            },
            {
                "description": "Atlanta",
                "id": "4",
                "name": "atl"
            },
            {
                "description": "Amsterdam",
                "id": "5",
                "name": "ams"
            },
            {
                "description": "Chicago",
                "id": "8",
                "name": "chi"
            },
            {
                "description": "Virginia",
                "id": "9",
                "name": "vir"
            },
            {
                "description": "London",
                "id": "12",
                "name": "lhr"
            },
            {
                "description": "San Francisco",
                "id": "13",
                "name": "sfo"
            }
        ]
    }
}</pre>
  </div>
</div>


## List Zone Node Stats by Report Type

Get usage statistics broken up by nodes and optionally
{report_type}. If no {report_type} is given the request will return
the total usage broken up by node.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/nodes.json/stats/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-31) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-31) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`pop_id` | Node Id |
`pop_name` | Node 3 letter code, only returned when {report_type} is not empty |
`pop_description` | Full node name, only returned when {report_type} is not empty |
`size` | The amount of bytes transferred |
`hit` | The number of times files were requested |
`noncache_hit` | The number of times a requested file was not in cache |
`cache_hit` | The number of times a requested file was already cached |
`timestamp` | A timestamp corresponding to {report_type}, only returned when {report_type} is not empty |

### Code Samples

<ul class="nav nav-tabs" id="myTab73">
  <li class="active"><a href="#ruby73" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python73" data-toggle='tab'>Python</a></li>
  <li><a href="#php73" data-toggle='tab'>PHP</a></li>
  <li><a href="#node73" data-toggle='tab'>Node</a></li>
  <li><a href="#response73" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby73">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/nodes.json/stats'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python73">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/nodes.json/stats'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php73">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/nodes.json/stats/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node73">
  <pre>
var reportType = '' //Vaild input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/nodes.json/stats/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response73">
    <pre>
{
    "code": 200,
    "data": {
        "stats": [
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "Los Angeles",
                "pop_id": "1",
                "pop_name": "lax",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "Atlanta",
                "pop_id": "4",
                "pop_name": "atl",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "Chicago",
                "pop_id": "8",
                "pop_name": "chi",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "San Francisco",
                "pop_id": "13",
                "pop_name": "sfo",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "Seattle",
                "pop_id": "2",
                "pop_name": "sea",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "Amsterdam",
                "pop_id": "5",
                "pop_name": "ams",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "Virginia",
                "pop_id": "9",
                "pop_name": "vir",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "New York",
                "pop_id": "3",
                "pop_name": "jfk",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "Dallas",
                "pop_id": "6",
                "pop_name": "dal",
                "size": "0"
            },
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "pop_description": "London",
                "pop_id": "12",
                "pop_name": "lhr",
                "size": "0"
            }
        ],
        "summary": {
            "cache_hit": "0",
            "hit": "20",
            "noncache_hit": "20",
            "size": "0"
        },
        "total": "1"
    }
}</pre>
  </div>
</div>


## List Node Stats by Zone and Report Type

Get usage statistics for a particular {zone_id} broken up by
nodes and optionally {report_type}. If no {report_type} is given
the request will return the total usage broken up by node.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/nodes.json/stats/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`pop_id` | Node Id |
`pop_name` | Node 3 letter code, only returned when {report_type} is not empty |
`pop_description` | Full node name, only returned when {report_type} is not empty |
`size` | The amount of bytes transferred |
`hit` | The number of times files were requested |
`noncache_hit` | The number of times a requested file was not in cache |
`cache_hit` | The number of times a requested file was already cached |
`timestamp` | A timestamp corresponding to {report_type}, only returned when {report_type} is not empty |

### Code Samples

<ul class="nav nav-tabs" id="myTab74">
  <li class="active"><a href="#ruby74" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python74" data-toggle='tab'>Python</a></li>
  <li><a href="#php74" data-toggle='tab'>PHP</a></li>
  <li><a href="#node74" data-toggle='tab'>Node</a></li>
  <li><a href="#response74" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby74">
    <pre>
id = '96061'
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/'+id+'/nodes.json/stats'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python74">
    <pre>
id = '96061'
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/'+id+'/nodes.json/stats'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php74">
    <pre>
$id = '96061';
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/'.$id.'/nodes.json/stats/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node74">
  <pre>
var id = '96061'
var reportType = '' //Vaild input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/' + id + '/nodes.json/stats/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response74">
    <pre>
{
    "code": 200,
    "data": {
        "stats": [],
        "summary": {
            "cache_hit": null,
            "hit": null,
            "noncache_hit": null,
            "size": null
        },
        "total": null
    }
}</pre>
  </div>
</div>


## Get Zone Node

Gets the node information for the specified {node_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/nodes.json/{node_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Node Id |
`name` | Node 3 letter code |
`description` | Full node name |

### Code Samples

<ul class="nav nav-tabs" id="myTab75">
  <li class="active"><a href="#ruby75" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python75" data-toggle='tab'>Python</a></li>
  <li><a href="#php75" data-toggle='tab'>PHP</a></li>
  <li><a href="#node75" data-toggle='tab'>Node</a></li>
  <li><a href="#response75" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby75">
    <pre>
id = '1'
api.get('/reports/nodes.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python75">
    <pre>
id = '1'
api.get('/reports/nodes.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="php75">
    <pre>
$id = '1';
$api->get('/reports/nodes.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node75">
  <pre>
var id = '1'
api.get('/reports/nodes.json/' + id, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response75">
    <pre>
{
    "code": 200,
    "data": {
        "node": {
            "description": "Los Angeles",
            "id": "1",
            "name": "lax"
        }
    }
}
</pre>
  </div>
</div>


## Get Node by Zone

Gets the node information for the specified {node_id} and
{zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/nodes.json/{node_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Node Id |
`name` | Node 3 letter code |
`description` | Full node name |

### Code Samples

<ul class="nav nav-tabs" id="myTab76">
  <li class="active"><a href="#ruby76" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python76" data-toggle='tab'>Python</a></li>
  <li><a href="#php76" data-toggle='tab'>PHP</a></li>
  <li><a href="#node76" data-toggle='tab'>Node</a></li>
  <li><a href="#response76" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby76">
    <pre>
zoneId = '96061'
nodeId = '1'
api.get('/reports/'+zoneId+'/nodes.json/'+nodeId)</pre>
  </div>
  <div class="tab-pane" id="python76">
    <pre>
zoneId = '96061'
nodeId = '1'
api.get('/reports/'+zoneId+'/nodes.json/'+nodeId)</pre>
  </div>
  <div class="tab-pane" id="php76">
    <pre>
$zoneId = '96061';
$nodeId = '1';
$api->get('/reports/'.$zoneId.'/nodes.json/'.$nodeId);</pre>
  </div>
  <div class="tab-pane" id="node76">
  <pre>
var zoneId = '96061'
var nodeId = '1'
api.get('/reports/' + zoneId + '/nodes.json/' + nodeId, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response76">
    <pre>
{
    "code": 200,
    "data": {
        "stats": [],
        "summary": {
            "cache_hit": null,
            "hit": null,
            "noncache_hit": null,
            "size": null
        },
        "total": null
    }
}</pre>
  </div>
</div>


## Get Zone Node Stats by Report Type

Get usage statistics for a particular {node_id} optionally
broken up by {report_type}. If no {report_type} is given the
request will return the total usage for the node.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/nodes.json/{node_id}/stats/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date. |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date. |


### Response Parameters

Parameter | Description |
--- | --- | ---
`size` | The amount of bytes transferred |
`hit` | The number of times files were requested |
`noncache_hit` | The number of times a requested file was not in cache |
`cache_hit` | The number of times a requested file was already cached |
`timestamp` | A timestamp corresponding to {report_type}, only returned when {report_type} is not empty |

### Code Samples

<ul class="nav nav-tabs" id="myTab77">
  <li class="active"><a href="#ruby77" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python77" data-toggle='tab'>Python</a></li>
  <li><a href="#php77" data-toggle='tab'>PHP</a></li>
  <li><a href="#node77" data-toggle='tab'>Node</a></li>
  <li><a href="#response77" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby77">
    <pre>
id = '1'
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/nodes.json/'+id+'/stats'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python77">
    <pre>
id = '1'
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/nodes.json/'+id+'/stats'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php77">
    <pre>
$id = '1';
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/nodes.json/'.$id.'/stats/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node77">
  <pre>
var id = '1'
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/nodes.json/' + id + '/stats/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response77">
    <pre>
{
    "code": 200,
    "data": {
        "stats": [
            {
                "cache_hit": "0",
                "hit": "2",
                "noncache_hit": "2",
                "size": "0"
            }
        ],
        "total": "1"
    }
}</pre>
  </div>
</div>


## Get Node Stats by Zone and Report Type

Get usage statistics for a particular {node_id} and {zone_id},
optionally broken up by {report_type}. If no {report_type} is given
the request will return the total usage for the node.

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/nodes.json/{node_id}/stats/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`size` | The amount of bytes transferred |
`hit` | The number of times files were requested |
`noncache_hit` | The number of times a requested file was not in cache |
`cache_hit` | The number of times a requested file was already cached |
`timestamp` | A timestamp corresponding to {report_type}, only returned when {report_type} is not empty |



### Code Samples

<ul class="nav nav-tabs" id="myTab78">
  <li class="active"><a href="#ruby78" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python78" data-toggle='tab'>Python</a></li>
  <li><a href="#php78" data-toggle='tab'>PHP</a></li>
  <li><a href="#node78" data-toggle='tab'>Node</a></li>
  <li><a href="#response78" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby78">
    <pre>
zoneId='96061'
nodeId='1'
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/'+zoneId+'/nodes.json/'+nodeId+'/stats'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python78">
    <pre>
zoneId='96061'
nodeId='1'
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/'+zoneId+'/nodes.json/'+nodeId+'/stats'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php78">
    <pre>
$zoneId='96061';
$nodeId='1';
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/'.$zoneId.'/nodes.json/'.$nodeId.'/stats/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node78">
  <pre>
var zoneId = '96061'
var nodeId = '1'
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/' + zoneId + '/nodes.json/' + nodeId + '/stats/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response78">
    <pre>
{
    "code": 200,
    "data": {
        "stats": [
            {
                "cache_hit": null,
                "hit": null,
                "noncache_hit": null,
                "size": null
            }
        ],
        "total": "0"
    }
}</pre>
  </div>
</div>


# Reports by Popular Files API

## List Popular Files

Gets the most popularly requested files for your account,
grouped into daily statistics

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/popularfiles.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01). | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01). | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`bucket_id` | The Zone ID for the popular file |
`uri` | The URI for the requested popular file |
`hit` | The number of times the file was requested |
`size` | The amount of bytes transferred for the given file |
`vhost` | The CDN URL for the corresponding zone |
`timestamp` | The amount of bytes transferred |

### Code Samples

<ul class="nav nav-tabs" id="myTab79">
  <li class="active"><a href="#ruby79" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python79" data-toggle='tab'>Python</a></li>
  <li><a href="#php79" data-toggle='tab'>PHP</a></li>
  <li><a href="#node79" data-toggle='tab'>Node</a></li>
  <li><a href="#response79" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby79">
    <pre>
api.get('/reports/popularfiles.json')</pre>
  </div>
  <div class="tab-pane" id="python79">
    <pre>
api.get('/reports/popularfiles.json')</pre>
  </div>
  <div class="tab-pane" id="php79">
    <pre>
$api->get('/reports/popularfiles.json');</pre>
  </div>
  <div class="tab-pane" id="node79">
  <pre>
api.get('/reports/popularfiles.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response79">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 0,
        "page": 1,
        "page_size": "50",
        "pages": 0,
        "popularfiles": [],
        "summary": {
            "hit": null,
            "size": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


## List Popular Files By Zone Type

Gets the most popularly requested files for your account,
filtered by {zone_type} and grouped into daily statistics

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_type}/popularfiles.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`bucket_id` | The Zone ID for the popular file |
`uri` | The URI for the requested popular file |
`hit` | The number of times the file was requested |
`size` | The amount of bytes transferred for the given file |
`vhost` | The CDN URL for the corresponding zone |
`timestamp` | The amount of bytes transferred |



### Code Samples

<ul class="nav nav-tabs" id="myTab80">
  <li class="active"><a href="#ruby80" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python80" data-toggle='tab'>Python</a></li>
  <li><a href="#php80" data-toggle='tab'>PHP</a></li>
  <li><a href="#node80" data-toggle='tab'>Node</a></li>
  <li><a href="#response80" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby80">
    <pre>
type='pull'
api.get('/reports/'+type+'/popularfiles.json')</pre>
  </div>
  <div class="tab-pane" id="python80">
    <pre>
type='pull'
api.get('/reports/'+type+'/popularfiles.json')</pre>
  </div>
  <div class="tab-pane" id="php80">
    <pre>
$type='pull';
$api->get('/reports/'.$type.'/popularfiles.json');</pre>
  </div>
  <div class="tab-pane" id="node80">
  <pre>
var type = 'pull'
api.get('/reports/' + type + '/popularfiles.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response80">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 0,
        "page": 1,
        "page_size": "50",
        "pages": 0,
        "popularfiles": [],
        "summary": {
            "hit": null,
            "size": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


# Reports by Status Codes API

## List Status Code Responses

Gets HTTP status code response statistics for your account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/statuscodes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`status_code` | The HTTP status code for the response |
`hit` | The number of responses with this status code |
`definition` | The definition for the status code |

### Code Samples

<ul class="nav nav-tabs" id="myTab81">
  <li class="active"><a href="#ruby81" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python81" data-toggle='tab'>Python</a></li>
  <li><a href="#php81" data-toggle='tab'>PHP</a></li>
  <li><a href="#node81" data-toggle='tab'>Node</a></li>
  <li><a href="#response81" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby81">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statuscodes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python81">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statuscodes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php81">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/statuscodes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node81">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statuscodes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response81">
    <pre>
{
    "code": 200,
    "data": {
        "statuscodes": [
            {
                "definition": "Not Found",
                "hit": "20",
                "status_code": "404"
            }
        ],
        "summary": {
            "hit": "20"
        },
        "total": "1"
    }
}</pre>
  </div>
</div>


## List Status Code Responses by Zone Id

Gets HTTP status code response statistics for a specific
{zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/statuscodes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`status_code` | The HTTP status code for the response |
`hit` | The number of responses with this status code |
`definition` | The definition for the status code |

### Code Samples

<ul class="nav nav-tabs" id="myTab82">
  <li class="active"><a href="#ruby82" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python82" data-toggle='tab'>Python</a></li>
  <li><a href="#php82" data-toggle='tab'>PHP</a></li>
  <li><a href="#node82" data-toggle='tab'>Node</a></li>
  <li><a href="#response82" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby82">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = '96061'
api.get('/reports/'+id+'/statuscodes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python82">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = '96061'
api.get('/reports/'+id+'/statuscodes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php82">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$id = '96061';
$api->get('/reports/'.$id.'/statuscodes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node82">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var id = '96061'
api.get('/reports/' + id + '/statuscodes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response82">
    <pre>
{
    "code": 200,
    "data": {
        "statuscodes": [],
        "summary": {
            "hit": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


## List Status Codes by Zone Type

Gets HTTP status code response statistics for a specific
{zone_type}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_type}/statuscodes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`status_code` | The HTTP status code for the response |
`hit` | The number of responses with this status code |
`definition` | The definition for the status code |

### Code Samples

<ul class="nav nav-tabs" id="myTab83">
  <li class="active"><a href="#ruby83" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python83" data-toggle='tab'>Python</a></li>
  <li><a href="#php83" data-toggle='tab'>PHP</a></li>
  <li><a href="#node83" data-toggle='tab'>Node</a></li>
  <li><a href="#response83" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby83">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
api.get('/reports/'+zoneType+'/statuscodes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python83">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
api.get('/reports/'+zoneType+'/statuscodes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php83">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneType = 'pull';
$api->get('/reports/'.$zoneType.'/statuscodes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node83">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneType = 'pull'
api.get('/reports/' + zoneType + '/statuscodes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response83">
    <pre>
{
    "code": 200,
    "data": {
        "statuscodes": [
            {
                "definition": "Not Found",
                "hit": "20",
                "status_code": "404"
            }
        ],
        "summary": {
            "hit": "20"
        },
        "total": "1"
    }
}</pre>
  </div>
</div>


## List Status Codes by Zone Id

Gets HTTP status code response statistics for a specific
{zone_type} and {zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_type}/{zone_id}/statuscodes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`status_code` | The HTTP status code for the response |
`hit` | The number of responses with this status code |
`definition` | The definition for the status code |



### Code Samples

<ul class="nav nav-tabs" id="myTab84">
  <li class="active"><a href="#ruby84" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python84" data-toggle='tab'>Python</a></li>
  <li><a href="#php84" data-toggle='tab'>PHP</a></li>
  <li><a href="#node84" data-toggle='tab'>Node</a></li>
  <li><a href="#response84" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby84">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
id = '96061'
api.get('/reports/'+zoneType+'/'+id+'/statuscodes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python84">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
id = '96061'
api.get('/reports/'+zoneType+'/'+id+'/statuscodes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php84">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneType = 'pull';
$id = '96061';
$api->get('/reports/'.$zoneType.'/'.$id.'/statuscodes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node84">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneType = 'pull'
var id = '96061'
api.get('/reports/' + zoneType + '/' + id + '/statuscodes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response84">
    <pre>
{
    "code": 200,
    "data": {
        "statuscodes": [],
        "summary": {
            "hit": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


# Reports by File Types API

## List File Types

Gets file type statistics for your account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/filetypes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`file_type` | The file type requested |
`hit` | The number of times a file of this type has been requested |

### Code Samples

<ul class="nav nav-tabs" id="myTab85">
  <li class="active"><a href="#ruby85" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python85" data-toggle='tab'>Python</a></li>
  <li><a href="#php85" data-toggle='tab'>PHP</a></li>
  <li><a href="#node85" data-toggle='tab'>Node</a></li>
  <li><a href="#response85" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby85">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python85">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php85">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/filetypes.json'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node85">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/filetypes.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response85">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 1,
        "filetypes": [
            {
                "file_type": "txt",
                "hit": "20"
            }
        ],
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "summary": {
            "hit": "20"
        },
        "total": "1"
    }
}</pre>
  </div>
</div>


## List File Types by Zone Id

Gets file type statistics for a specific {zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/filetypes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d e.g. 2012-01-01 | Start date |
`date_to` | now() | Y-m-d e.g. 2012-01-01 | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`file_type` | The file type requested |
`hit` | The number of times a file of this type has been requested |

### Code Samples

<ul class="nav nav-tabs" id="myTab86">
  <li class="active"><a href="#ruby86" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python86" data-toggle='tab'>Python</a></li>
  <li><a href="#php86" data-toggle='tab'>PHP</a></li>
  <li><a href="#node86" data-toggle='tab'>Node</a></li>
  <li><a href="#response86" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby86">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = '96061'
api.get('/reports/'+id+'/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python86">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = '96061'
api.get('/reports/'+id+'/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php86">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$id = '96061';
$api->get('/reports/'.$id.'/filetypes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node86">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var id = '96061'
api.get('/reports/' + id + '/filetypes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response86">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 0,
        "filetypes": [],
        "page": 1,
        "page_size": "50",
        "pages": 0,
        "summary": {
            "hit": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


## List File Types by Zone Type

Gets file type statistics for a specific {zone_type}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_type}/filetypes.json/{report_type}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`file_type` | The file type requested |
`hit` | The number of times a file of this type has been requested |

### Code Samples

<ul class="nav nav-tabs" id="myTab87">
  <li class="active"><a href="#ruby87" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python87" data-toggle='tab'>Python</a></li>
  <li><a href="#php87" data-toggle='tab'>PHP</a></li>
  <li><a href="#node87" data-toggle='tab'>Node</a></li>
  <li><a href="#response87" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby87">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
api.get('/reports/'+zoneType+'/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python87">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
api.get('/reports/'+zoneType+'/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php87">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneType = 'pull';
$api->get('/reports/'.$zoneType.'/filetypes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node87">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneType = 'pull'
api.get('/reports/' + zoneType + '/filetypes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response87">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 1,
        "filetypes": [
            {
                "file_type": "txt",
                "hit": "20"
            }
        ],
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "summary": {
            "hit": "20"
        },
        "total": "1"
    }
}</pre>
  </div>
</div>


## List File Types by Zone Id

Gets file type statistics for a specific {zone_type} and
{zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_type}/{zone_id}/filetypes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`file_type` | The file type requested |
`hit` | The number of times a file of this type has been requested |


### Code Samples

<ul class="nav nav-tabs" id="myTab88">
  <li class="active"><a href="#ruby88" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python88" data-toggle='tab'>Python</a></li>
  <li><a href="#php88" data-toggle='tab'>PHP</a></li>
  <li><a href="#node88" data-toggle='tab'>Node</a></li>
  <li><a href="#response88" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby88">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
id = '96061'
api.get('/reports/'+zoneType+'/'+id+'/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python88">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
id = '96061'
api.get('/reports/'+zoneType+'/'+id+'/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php88">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneType = 'pull';
$id = '96061';
$api->get('/reports/'.$zoneType.'/'.$id.'/filetypes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node88">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneType = 'pull'
var id = '96061'
api.get('/reports/' + zoneType + '/' + id + '/filetypes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response88">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 0,
        "filetypes": [],
        "page": 1,
        "page_size": "50",
        "pages": 0,
        "summary": {
            "hit": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


# Reports by File Size Ranges API

## List File Sizes

Gets request statistics for your account based on file size
ranges

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/filesizes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`le_10k_hits` | The number of requests for files &lt;= 10KB |
`le_50k_hits` | The number of requests for files &lt;= 50KB |
`le_100k_hits` | The number of requests for files &lt;= 100KB |
`le_500k_hits` | The number of requests for files &lt;= 500KB |
`le_1m_hits` | The number of requests for files &lt;= 1MB |
`le_10m_hits` | The number of requests for files &lt;= 10MB |
`le_100m_hits` | The number of requests for files &lt;= 100MB |
`gt_100m_hits` | The number of requests for files &gt; 100MB |

### Code Samples

<ul class="nav nav-tabs" id="myTab89">
  <li class="active"><a href="#ruby89" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python89" data-toggle='tab'>Python</a></li>
  <li><a href="#php89" data-toggle='tab'>PHP</a></li>
  <li><a href="#node89" data-toggle='tab'>Node</a></li>
  <li><a href="#response89" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby89">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
id = '96061'
api.get('/reports/'+zoneType+'/'+id+'/filetypes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python89">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/filesizes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php89">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/filesizes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node89">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/filesizes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response89">
    <pre>
{
    "code": 200,
    "data": {
        "filesizes": [
            {
                "gt_100m_hit": "0",
                "le_100k_hit": "0",
                "le_100m_hit": "0",
                "le_10k_hit": "20",
                "le_10m_hit": "0",
                "le_1m_hit": "0",
                "le_500k_hit": "0",
                "le_50k_hit": "0"
            }
        ],
        "summary": {
            "hit": "20"
        }
    }
}</pre>
  </div>
</div>


## List File Sizes by Zone Id

Gets request statistics for the specified {zone_id} based on
file size ranges

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/filesizes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d e.g. 2012-01-01 | Start date |
`date_to` | now() | Y-m-d e.g. 2012-01-01 | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`le_10k_hits` | The number of requests for files &lt;= 10KB |
`le_50k_hits` | The number of requests for files &lt;= 50KB |
`le_100k_hits` | The number of requests for files &lt;= 100KB |
`le_500k_hits` | The number of requests for files &lt;= 500KB |
`le_1m_hits` | The number of requests for files &lt;= 1MB |
`le_10m_hits` | The number of requests for files &lt;= 10MB |
`le_100m_hits` | The number of requests for files &lt;= 100MB |
`gt_100m_hits` | The number of requests for files &gt; 100MB |

### Code Samples

<ul class="nav nav-tabs" id="myTab90">
  <li class="active"><a href="#ruby90" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python90" data-toggle='tab'>Python</a></li>
  <li><a href="#php90" data-toggle='tab'>PHP</a></li>
  <li><a href="#node90" data-toggle='tab'>Node</a></li>
  <li><a href="#response90" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby90">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = '96061'
api.get('/reports/'+id+'/filesizes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python90">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = '96061'
api.get('/reports/'+id+'/filesizes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php90">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$id = '96061';
$api->get('/reports/'.$id.'/filesizes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node90">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var id = '96061'
api.get('/reports/' + id + '/filesizes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response90">
    <pre>
{
    "code": 200,
    "data": {
        "filesizes": [
            {
                "gt_100m_hit": null,
                "le_100k_hit": null,
                "le_100m_hit": null,
                "le_10k_hit": null,
                "le_10m_hit": null,
                "le_1m_hit": null,
                "le_500k_hit": null,
                "le_50k_hit": null
            }
        ],
        "summary": {
            "hit": null
        }
    }
}</pre>
  </div>
</div>


## List File Sizes by Zone Type

Gets request statistics for the specified {zone_type} based on
file size ranges

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_type}/filesizes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d e.g. 2012-01-01 | Start date |
`date_to` | now() | Y-m-d e.g. 2012-01-01 | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`le_10k_hits` | The number of requests for files &lt;= 10KB |
`le_50k_hits` | The number of requests for files &lt;= 50KB |
`le_100k_hits` | The number of requests for files &lt;= 100KB |
`le_500k_hits` | The number of requests for files &lt;= 500KB |
`le_1m_hits` | The number of requests for files &lt;= 1MB |
`le_10m_hits` | The number of requests for files &lt;= 10MB |
`le_100m_hits` | The number of requests for files &lt;= 100MB |
`gt_100m_hits` | The number of requests for files &gt; 100MB |

### Code Samples

<ul class="nav nav-tabs" id="myTab91">
  <li class="active"><a href="#ruby91" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python91" data-toggle='tab'>Python</a></li>
  <li><a href="#php91" data-toggle='tab'>PHP</a></li>
  <li><a href="#node91" data-toggle='tab'>Node</a></li>
  <li><a href="#response91" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby91">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
api.get('/reports/'+zoneType+'/filesizes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python91">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
api.get('/reports/'+zoneType+'/filesizes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php91">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneType = 'pull';
$api->get('/reports/'.$zoneType.'/filesizes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node91">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneType = 'pull'
api.get('/reports/' + zoneType + '/filesizes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response91">
    <pre>
{
    "code": 200,
    "data": {
        "filesizes": [
            {
                "gt_100m_hit": "0",
                "le_100k_hit": "0",
                "le_100m_hit": "0",
                "le_10k_hit": "20",
                "le_10m_hit": "0",
                "le_1m_hit": "0",
                "le_500k_hit": "0",
                "le_50k_hit": "0"
            }
        ],
        "summary": {
            "hit": "20"
        }
    }
}</pre>
  </div>
</div>


## List File Sizes by Zone Id

Gets request statistics for the specified {zone_type} and
{zone_id} based on file size ranges

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_type}/{zone_id}/filesizes.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`le_10k_hits` | The number of requests for files &lt;= 10KB |
`le_50k_hits` | The number of requests for files &lt;= 50KB |
`le_100k_hits` | The number of requests for files &lt;= 100KB |
`le_500k_hits` | The number of requests for files &lt;= 500KB |
`le_1m_hits` | The number of requests for files &lt;= 1MB |
`le_10m_hits` | The number of requests for files &lt;= 10MB |
`le_100m_hits` | The number of requests for files &lt;= 100MB |
`gt_100m_hits` | The number of requests for files &gt; 100MB |


### Code Samples

<ul class="nav nav-tabs" id="myTab92">
  <li class="active"><a href="#ruby92" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python92" data-toggle='tab'>Python</a></li>
  <li><a href="#php92" data-toggle='tab'>PHP</a></li>
  <li><a href="#node92" data-toggle='tab'>Node</a></li>
  <li><a href="#response92" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby92">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
id = '96061'
api.get('/reports/'+zoneType+'/'+id+'/filesizes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python92">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneType = 'pull'
id = '96061'
api.get('/reports/'+zoneType+'/'+id+'/filesizes.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php92">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneType = 'pull';
$id = '96061';
$api->get('/reports/'.$zoneType.'/'.$id.'/filesizes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node92">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneType = 'pull'
var id = '96061'
api.get('/reports/' + zoneType + '/' + id + '/filesizes.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response92">
    <pre>
{
    "code": 200,
    "data": {
        "filesizes": [
            {
                "gt_100m_hit": null,
                "le_100k_hit": null,
                "le_100m_hit": null,
                "le_10k_hit": null,
                "le_10m_hit": null,
                "le_1m_hit": null,
                "le_500k_hit": null,
                "le_50k_hit": null
            }
        ],
        "summary": {
            "hit": null
        }
    }
}</pre>
  </div>
</div>


# Reports By Directory API

## List Stats By Directory

Gets usage statistics by directory for your account. (This
report has to be enabled by Sales).

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/statsbydir.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`bucket_id` | The Zone ID for the top level directory |
`dir` | The name of the directory |
`hit` | The number of requests made to files within this directory |
`size` | The amount of bytes transferred from within this directory |

### Code Samples

<ul class="nav nav-tabs" id="myTab93">
  <li class="active"><a href="#ruby93" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python93" data-toggle='tab'>Python</a></li>
  <li><a href="#php93" data-toggle='tab'>PHP</a></li>
  <li><a href="#node93" data-toggle='tab'>Node</a></li>
  <li><a href="#response93" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby93">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statsbydir.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python93">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statsbydir.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php93">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/statsbydir.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node93">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statsbydir.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response93">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 0,
        "page": 1,
        "page_size": "50",
        "pages": 0,
        "statsbydir": [],
        "summary": {
            "hit": null,
            "size": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


## List Stats By Directory and Zone Id

Gets usage statistics by directory for the specified {zone_id}.
(This report has to be enabled by Sales).

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/{zone_id}/statsbydir.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`bucket_id` | The Zone ID for the top level directory |
`dir` | The name of the directory |
`hit` | The number of requests made to files within this directory |
`size` | The amount of bytes transferred from within this directory |


### Code Samples

<ul class="nav nav-tabs" id="myTab94">
  <li class="active"><a href="#ruby94" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python94" data-toggle='tab'>Python</a></li>
  <li><a href="#php94" data-toggle='tab'>PHP</a></li>
  <li><a href="#node94" data-toggle='tab'>Node</a></li>
  <li><a href="#response94" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby94">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = '96061'
api.get('/reports/'+id+'/statsbydir.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python94">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = '96061'
api.get('/reports/'+id+'/statsbydir.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php94">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$id = '96061';
$api->get('/reports/'.$id.'/statsbydir.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node94">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var id = '96061'
api.get('/reports/' + id + '/' + '/statsbydir.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response94">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 0,
        "page": 1,
        "page_size": "50",
        "pages": 0,
        "statsbydir": [],
        "summary": {
            "hit": null,
            "size": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


# Reports By File Name API

## List Stats By File Name

Gets usage statistics by file name for your account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/clients/{client_id}/reports/statsbyfilename.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |
`file_names` | A JSON Encoded file names list |
`filter` | Matching expression for file names |
`sort_by` | Field to sort by |
`sort_dir` | Directory to sort files by |
`page_size` | - | The number of records returned in the result set |


### Response Parameters

Parameter | Description |
--- | --- | ---
`200` | The amount of 200 hits |
`206` | The amount of 206 hits |
`2xx` | The amount of 2xx hits |
`3xx` | The amount of 3xx hits |
`404` | The amount of 404 hits |
`4xx` | The amount of 4xx hits |
`5xx` | The amount of 5xx hits |
`bucket_id` | The Zone ID for the top level directory |
`file_name` | URI |
`hit` | The number of requests made to files within this directory |
`size` | The amount of bytes transferred from within this directory |
`timestampf` | Timestamp |
`vhost` | CDN URL |

### Code Samples

<ul class="nav nav-tabs" id="myTab95">
  <li class="active"><a href="#ruby95" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python95" data-toggle='tab'>Python</a></li>
  <li><a href="#php95" data-toggle='tab'>PHP</a></li>
  <li><a href="#node95" data-toggle='tab'>Node</a></li>
  <li><a href="#response95" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby95">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
clientId = ''
api.get('/clients/'+clientId+'/reports/statsbyfilename.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python95">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
clientId = ''
api.get('/clients/'+clientId+'/reports/statsbyfilename.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php95">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$clientId = '';
$api->get('/clients/'.$clientId.'/reports/statsbyfilename.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node95">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var clientId = ''
api.get('/clients/' + clientId + '/reports/statsbyfilename.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response95">
    <pre>
{
    "code": 200,
    "data": {
        "statsbyfilename": [
            {
                "200": "0",
                "206": "0",
                "2xx": "0",
                "3xx": "0",
                "404": "0",
                "4xx": "0",
                "5xx": "35036",
                "bucket_id": "21597",
                "file_name": "/",
                "hit": "35036",
                "size": "20110664",
                "timestampf": "2013",
                "vhost": "edge02.nycacorp.netdna-cdn.com"
            },
            {
                "200": "0",
                "206": "0",
                "2xx": "0",
                "3xx": "0",
                "404": "0",
                "4xx": "2",
                "5xx": "35032",
                "bucket_id": "21597",
                "file_name": "/favicon.ico",
                "hit": "35034",
                "size": "20108368",
                "timestampf": "2013",
                "vhost": "edge02.nycacorp.netdna-cdn.com"
            }
        ],
        "summary": {
            "200": "0",
            "206": "0",
            "2xx": "0",
            "3xx": "0",
            "404": "0",
            "4xx": "2",
            "5xx": "70068",
            "hit": "70070",
            "size": "40219032"
        },
        "total": "2"
    }
}</pre>
  </div>
</div>


## List Stats By File Name and Zone Id

Gets usage statistics by file name for the specified
{zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/clients/{client_id}/reports/{zone_id}/statsbyfilename.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |
`file_names` | A JSON Encoded file names list |
`filter` | Matching expression for file names |
`sort_by` | Field to sort by |
`sort_dir` | Directory to sort files by |
`page_size` | - | The number of records returned in the result set |


### Response Parameters

Parameter | Description |
--- | --- | ---
`bucket_id` | The Zone ID for the top level directory |
`hit` | The number of requests made to files within this directory |
`size` | The amount of bytes transferred from within this directory |
`200` | The amount of 200 hits |
`206` | The amount of 206 hits |
`2xx` | The amount of 2xx hits |
`3xx` | The amount of 3xx hits |
`404` | The amount of 404 hits |
`4xx` | The amount of 4xx hits |
`5xx` | The amount of 5xx hits |
`timestampf` | Timestamp |


### Code Samples

<ul class="nav nav-tabs" id="myTab96">
  <li class="active"><a href="#ruby96" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python96" data-toggle='tab'>Python</a></li>
  <li><a href="#php96" data-toggle='tab'>PHP</a></li>
  <li><a href="#node96" data-toggle='tab'>Node</a></li>
  <li><a href="#response96" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby96">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = ''
clientId = ''
api.get('/clients/'+clientId+'/reports/'+id+'/statsbyfilename.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python96">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
id = ''
clientId = ''
api.get('/clients/'+clientId+'/reports/'+id+'/statsbyfilename.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php96">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$id = '96061';
$clientId = '';
$api->get('/clients/'.$clientId.'/reports/'.$id.'/statsbyfilename.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node96">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var id = '96061'
var clientId = ''
api.get('/clients/' + clientId + '/reports/' + id + '/statsbyfilename.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response96">
    <pre>
Non functional</pre>
  </div>
</div>



# Reports By Custom Domain API

## List Stats By Directory

Gets usage statistics by custom domain for your account. (This
report has to be enabled by Sales).

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/clients/{client_id}/reports/statsbycustomdomain.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`bucket_id` | The Zone ID for the custom domain |
`custom_domain_id` | The ID of your custom domain |
`hit` | The number of requests made to this custom domain |
`size` | The amount of bytes transferred to/from this custom domain |

### Code Samples

<ul class="nav nav-tabs" id="myTab97">
  <li class="active"><a href="#ruby97" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python97" data-toggle='tab'>Python</a></li>
  <li><a href="#php97" data-toggle='tab'>PHP</a></li>
  <li><a href="#node97" data-toggle='tab'>Node</a></li>
  <li><a href="#response97" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby97">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
clientId = ''
api.get('/clients/'+clientId+'/reports/statsbycustomdomain.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python97">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
clientId = ''
api.get('/clients/'+clientId+'/reports/statsbycustomdomain.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php97">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$clientId = '';
$api->get('clients/'.$clientId.'/reports/statsbycustomdomain.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node97">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var clientId = ''
api.get('/clients/' + clientId + '/reports/statsbycustomdomain.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response97">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 1,
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "statsbycustomdomain": [
            {
                "bucket_id": "21597",
                "custom_domain_id": "0",
                "hit": "70320",
                "size": "40362532",
                "vhost": "edge02.nycacorp.netdna-cdn.com"
            }
        ],
        "summary": {
            "hit": "70320",
            "size": "40362532"
        },
        "total": "1"
    }
}</pre>
  </div>
</div>


## List Stats By Custom Domain and Zone Id

Gets usage statistics by custom domain for the specified
{zone_id}. (This report has to be enabled by Sales).

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/clients/{client_id}/reports/{zone_id}/statsbycustomdomain.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | now() - 1 month | Y-m-d (e.g. 2012-01-01) | Start date |
`date_to` | now() | Y-m-d (e.g. 2012-01-01) | End date |


### Response Parameters

Parameter | Description |
--- | --- | ---
`bucket_id` | The Zone ID for the top level directory |
`custom_domain_id` | The ID of the Custom Domain |
`hit` | The number of requests made to this custom domain |
`size` | The amount of bytes transferred to/from this custom domain |


### Code Samples

<ul class="nav nav-tabs" id="myTab98">
  <li class="active"><a href="#ruby98" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python98" data-toggle='tab'>Python</a></li>
  <li><a href="#php98" data-toggle='tab'>PHP</a></li>
  <li><a href="#node98" data-toggle='tab'>Node</a></li>
  <li><a href="#response98" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby98">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneId = ''
clientId = ''
api.get('/clients/'+clientId+'/reports/'+zoneId+'/statsbycustomdomain.json'+reportType)
</pre>
  </div>
  <div class="tab-pane" id="python98">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
zoneId = '84199'
clientId = '1'
api.get('/clients/'+clientId+'/reports/'+zoneId+'/statsbycustomdomain.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php98">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneId = '';
$clientId = '';
$api->get('clients/'.$clientId.'/reports/'.$zoneId.'/statsbycustomdomain.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node98">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneId = ''
var clientId = ''
api.get('/clients/' + clientId + '/reports/' + zoneId + '/statsbycustomdomain.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response98">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 0,
        "page": 1,
        "page_size": "50",
        "pages": 0,
        "statsbycustomdomain": [],
        "summary": {
            "hit": null,
            "size": null
        },
        "total": "0"
    }
}</pre>
  </div>
</div>


# Reports for Live Zones API

## List Connection Stats

Gets zone stats in hourly, daily, or monthly summaries

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.netdna.com/{companyalias}/reports/live/connectionstats.json/{report_type}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`date_from` | - | Y-m-d e.g. 2012-01-01 | Start date |
`date_to` | - | Y-m-d e.g. 2012-01-01 | End date |

### Code Samples

<ul class="nav nav-tabs" id="myTab99">
  <li class="active"><a href="#ruby99" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python99" data-toggle='tab'>Python</a></li>
  <li><a href="#php99" data-toggle='tab'>PHP</a></li>
  <li><a href="#node99" data-toggle='tab'>Node</a></li>
  <li><a href="#response99" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby99">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/live/connectionstats.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="python99">
    <pre>
reportType = '' #Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/live/connectionstats.json'+reportType)</pre>
  </div>
  <div class="tab-pane" id="php99">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/live/connectionstats.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node99">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/live/connectionstats.json/' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="response99">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 0,
        "page": 1,
        "page_size": "50",
        "pages": 0,
        "stats": [],
        "total": "0"
    }
}</pre>
  </div>
</div>
