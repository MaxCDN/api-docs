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
* [Raw Logs API](#raw-logs-api)
* [Origin Shield API](#origin-shield-api)
* [SSL API](#ssl-certificate-api)

## Overview

* Login to the [MaxCDN Control Panel](https://cp.maxcdn.com/account/api).

* Create a [new application](https://cp.maxcdn.com/account/api/create).

* Integrate with our RESTful API using a language wrapper:
 * [Node](https://github.com/maxcdn/node-maxcdn)
 * [Ruby](https://github.com/maxcdn/ruby-maxcdn)
 * [Python](https://github.com/maxcdn/python-maxcdn)
 * [Perl](https://github.com/maxcdn/perl-maxcdn)
 * [PHP](https://github.com/MaxCDN/php-maxcdn)
 * [.NET](https://github.com/MaxCDN/dotnet-maxcdn)
 * [Go <sup>Beta</sup>](http://godoc.org/github.com/MaxCDN/go-maxcdn)

## Support

* Have a question? Check out our [Knowledge Base](http://support.maxcdn.com/) to see if your question has already been answered.
* Still need help?  Visit our [Contact Page](http://www.maxcdn.com/contact/) to get in touch.
* Found a Bug? Visit our [GitHub Issues](https://github.com/maxcdn/rws-bugs/issues?state=open) page to report it.
* Feel free to Tweet and follow us [@MaxCDNDeveloper](https://twitter.com/maxcdndeveloper) and [@MaxCDN](https://twitter.com/maxcdn).


## Changelog
  - **2015-07-27**  Updated validation for `use_stale`
  - **2015-03-06**  Added `ssl`, `ssl_sni`, and `geo_enabled` flags for Pull Zones
  - **2015-01-19**  Added account-level SSL
  - **2014-12-18**  Removed Live Zone API documentation (EOL)
  - **2014-12-09**  Added new <a href="#origin-shield-api">Origin Shield API</a> documentation
  - **2014-10-20**  Updated description for `use_stale`
  - **2014-07-16**  Added SNI option on SSL Installation
  - **2014-07-11**  Updated PHP and .NET libs
  - **2014-06-30**  Add RUM code for webperf measuring
  - **2014-06-24**  Updated BootstrapCDN and favicon urls
  - **2014-06-20**  Removed create Live Zone endpoint (EOL)
  - **2014-06-19**  Removed links outdated Perl and .NET SDKs, added Go SDK (beta)
  - **2014-06-13**  Updated all URL endpoints to rws.maxcdn.com
  - **2014-06-10**  Added documentation for the Raw Logs API
  - **2014-05-19**  Added feature "SPDY" to Pull and Push Zone settings
  - **2014-04-15**  Added new MIME type for Pull Zone GZip compression: application/octet-stream
  - **2014-04-10**  Added feature "X-Forwarded-For" to Pull Zone settings
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

The end point for requesting a token is: `https://rws.maxcdn.com/oauth/request_token`

### User Authorization
The User Authorization step sends the user to the MaxCDN RWS authorization page, which grants your application privileges to use their account with the API. You will need the oauth_token from the previous step to complete this.

The endpoint for the authorization url is: `https://rws.maxcdn.com/oauth/authorize`


### Key: Path Parameters

Parameter | Description |
--- | ---
`{companyalias}` | The alias used when creating the account |
`{zone_type}` | The type of zone you are making a request on — one of `pull`, `push`, or `vod` |
`{report_type}` | The format you want the reports summarized by — `hourly`, `daily`, or `monthly`. This value can be left blank to receive ungrouped totals |

# Account API

## Get Account

Gets account information

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/account.json</span></div>
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
  <li><a href="#perl1" data-toggle='tab'>Perl</a></li>
  <li><a href="#php1" data-toggle='tab'>PHP</a></li>
  <li><a href="#node1" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp1" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl1">
    <pre>my $data = $api->get("/account.json");
print $data->{'account'}{'name'};</pre>
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
    <div class="tab-pane" id="csharp1">
  <pre>
api.Get("/account.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/account.json</span></div>
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
  <li><a href="#perl2" data-toggle='tab'>Perl</a></li>
  <li><a href="#php2" data-toggle='tab'>PHP</a></li>
  <li><a href="#node2" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp2" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl2">
    <pre>
my @params = ('name=IDABIC');
$api->put("/account.json", @params);</pre>
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
  <div class="tab-pane" id="csharp2">
  <pre>
api.Put("/account.json", "name=UserName");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/account.json/address</span></div>
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
    <li><a href="#perl3" data-toggle='tab'>Perl</a></li>
  <li><a href="#php3" data-toggle='tab'>PHP</a></li>
  <li><a href="#node3" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp3" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl3">
    <pre>
my $data = $api->get("/account.json/address");
print $data->{'address'}{'street1'};</pre>
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
  <div class="tab-pane" id="csharp3">
  <pre>
api.Get("/account.json/address");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/account.json/address</span></div>
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
  <li><a href="#perl4" data-toggle='tab'>Perl</a></li>
  <li><a href="#php4" data-toggle='tab'>PHP</a></li>
  <li><a href="#node4" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp4" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl4">
    <pre>
my @params = ('street1=Main');
$api->put("/account.json/address", @params);</pre>
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
  <div class="tab-pane" id="csharp4">
  <pre>
api.Put("/account.json/address", "street1=1234 Main Street");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/users.json</span></div>
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
  <li><a href="#perl5" data-toggle='tab'>Perl</a></li>
  <li><a href="#php5" data-toggle='tab'>PHP</a></li>
  <li><a href="#node5" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp5" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl5">
    <pre>
my $data = $api->get("/users.json");
print $data->{'users'}[0]{'id'};</pre>
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
  <div class="tab-pane" id="csharp5">
  <pre>
api.Get("/users.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/users.json</span></div>
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
  <li><a href="#perl6" data-toggle='tab'>Perl</a></li>
  <li><a href="#php6" data-toggle='tab'>PHP</a></li>
  <li><a href="#node6" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp6" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl6">
    <pre>
my @params = {firstname => 'Perl', lastname => 'User', email => 'user@domain.com', password => 'testpwd'};
$api->post("/users.json", @params);</pre>
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
  <div class="tab-pane" id="csharp6">
  <pre>
Console.Write("User First Name: \n");
string fname = Console.ReadLine();
Console.Write("User Last Name: \n");
string lname = Console.ReadLine();
Console.Write("User email: \n");
string email = Console.ReadLine();
Console.Write("Password: \n");
string pwd = Console.ReadLine();

api.Post("/users.json", "firstname=" + fname + "&lastname=" + lname + "&password=" + pwd + "&email=" + email);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/users.json/{user_id}</span></div>
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
  <li><a href="#perl7" data-toggle='tab'>Perl</a></li>
  <li><a href="#php7" data-toggle='tab'>PHP</a></li>
  <li><a href="#node7" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp7" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl7">
    <pre>
my $id = 58309;
my $data = $api->get("/users.json/58309");
print $data->{'user'}{'lastname'};</pre>
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
  <div class="tab-pane" id="csharp7">
  <pre>
Console.Write("User ID: \n");
string id = Console.ReadLine();

api.Get("/users.json/" + id);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/users.json/{user_id}</span></div>
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
  <li><a href="#perl8" data-toggle='tab'>Perl</a></li>
  <li><a href="#php8" data-toggle='tab'>PHP</a></li>
  <li><a href="#node8" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp8" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl8">
    <pre>
my $id = 58309;
my @params = ('lastname=Test');
$api->put("/users.json/" . $id, @params);</pre>
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
  <div class="tab-pane" id="csharp8">
  <pre>
Console.Write("Enter user ID to edit: \n");
int uid = Convert.ToInt32(Console.ReadLine());
Console.Write("Enter property to edit: \n");
string prop = Console.ReadLine();
Console.Write("New value: \n");
string val = Console.ReadLine();

api.Put("/users.json/" + uid + "/", prop + "=" + val);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/users.json/{user_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab9">
  <li class="active"><a href="#ruby9" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python9" data-toggle='tab'>Python</a></li>
  <li><a href="#perl9" data-toggle='tab'>Perl</a></li>
  <li><a href="#php9" data-toggle='tab'>PHP</a></li>
  <li><a href="#node9" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp9" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl9">
    <pre>
my $id = 58309;
$api->delete("/users.json/" . $id);</pre>
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
  <div class="tab-pane" id="csharp9">
  <pre>
Console.Write("User id to delete: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Delete("/users.json/" + id);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones.json</span></div>
</div>

### Code Samples  @

<ul class="nav nav-tabs" id="myTab10">
  <li class="active"><a href="#ruby10" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python10" data-toggle='tab'>Python</a></li>
  <li><a href="#perl10" data-toggle='tab'>Perl</a></li>
  <li><a href="#php10" data-toggle='tab'>PHP</a></li>
  <li><a href="#node10" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp10" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl10">
    <pre>
$api->get("/zones.json");</pre>
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
  <div class="tab-pane" id="csharp10">
  <pre>
api.Get("/zones/pull.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones.json/summary</span></div>
</div>


### Response Parameters

Parameter | Description |
--- | --- | ---
`pull` | The number of pull zones for your account |
`push` | The number of push zones for your account |
`vod` | The number of vod zones for your account |


### Code Samples

<ul class="nav nav-tabs" id="myTab11">
  <li class="active"><a href="#ruby11" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python11" data-toggle='tab'>Python</a></li>
  <li><a href="#perl11" data-toggle='tab'>Perl</a></li>
  <li><a href="#php11" data-toggle='tab'>PHP</a></li>
  <li><a href="#node11" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp11" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl11">
    <pre>
$api->get("/zones.json/summary");</pre>
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
  <div class="tab-pane" id="csharp11">
  <pre>
api.Get("/zones.json/summary");
</pre>
  </div>
  <div class="tab-pane" id="response11">
    <pre>
{
    "code": 200,
    "data": {
        "summary": {
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The total number of content zones for your account |



### Code Samples

<ul class="nav nav-tabs" id="myTab12">
  <li class="active"><a href="#ruby12" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python12" data-toggle='tab'>Python</a></li>
  <li><a href="#perl12" data-toggle='tab'>Perl</a></li>
  <li><a href="#php12" data-toggle='tab'>PHP</a></li>
  <li><a href="#node12" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp12" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl12">
    <pre>
$api->get("/zones.json/count");</pre>
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
  <div class="tab-pane" id="csharp12">
  <pre>
api.Get("/zones.json/count");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | Pull Zone ID |
`name` | Pull Zone name |
`url` | Origin URL |
`port` | Port |
`ip` | IP address of the Origin URL |
`compress` | Enables on the fly GZip compression of your files from our edge servers for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype, application/octet-stream |
`backend_compress` | Enables us to cache, from origin, GZip compressed versions of your files for the following file types: text/plain, text/html, text/javascript, text/css, text/xml, application/javascript, application/x-javascript, application/xml, text/x-component, application/json, application/xhtml+xml, application/rss+xml, application/atom+xml, app/vnd.ms-fontobject, image/svg+xml, application/x-font-ttf, font/opentype |
`queries` | Treat Query Strings as a separate cacheable item |
`set_host_header` | The URL sent as the Host in all HTTP Response Headers |
`cache_valid` | Ignore the origin Cache-Control Header and set every request to have a Max-Age of 1d, 7d, 1M or 12M |
`ignore_setcookie_header` | Ignore any cookies set by the origin in order to make the content consistently cacheable |
`ignore_cache_control` | Ignore any max age values set by the origin and use the CDN set value instead |
`use_stale` | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down |
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
`spdy` | Flag denoting if the zone has the SPDY protocol enabled |
`ssl` | Read-only flag denoting if the zone has Dedicated IP SSL enabled |
`ssl_sni` | Read-only flag denoting if the zone has SNI SSL enabled |
`geo_enabled` | Read-only flag denoting if the zone has 'More Locations' enabled |

### Code Samples

<ul class="nav nav-tabs" id="myTab13">
  <li class="active"><a href="#ruby13" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python13" data-toggle='tab'>Python</a></li>
  <li><a href="#perl13" data-toggle='tab'>Perl</a></li>
  <li><a href="#php13" data-toggle='tab'>PHP</a></li>
  <li><a href="#node13" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp13" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl13">
    <pre>
$api->get("/zones/pull.json")</pre>
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
  <div class="tab-pane" id="csharp13">
  <pre>
api.Post("/zones/pull.json");
</pre>
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
                "valid_referers": null,
                "spdy": 1,
                "ssl": 1,
                "ssl_sni": 0,
                "geo_enabled": 1
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
                "valid_referers": null,
                "spdy": 1,
                "ssl": 0,
                "ssl_sni": 1,
                "geo_enabled": 0
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull.json</span></div>
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
`use_stale` | 0 | List of status codes separated with space - empty character - (?use_stale=500 502 503 504 403 404) are accepted as a valid request. 0 or 1 are accepted by legacy but, these are not valid parameters any more. To disable use_stale you can pass 0 (as a part of the legacy) or empty string "".| Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down |
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
`spdy` | 0 | only 0 or 1 accepted | Enable SPDY protocol on the zone (requires SSL) |


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
`use_stale` | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down |
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
`spdy` | Flag denoting if the zone has the SPDY protocol enabled |
`ssl` | Read-only flag denoting if the zone has Dedicated IP SSL enabled |
`ssl_sni` | Read-only flag denoting if the zone has SNI SSL enabled |
`geo_enabled` | Read-only flag denoting if the zone has 'More Locations' enabled |

### Code Samples

<ul class="nav nav-tabs" id="myTab14">
  <li class="active"><a href="#ruby14" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python14" data-toggle='tab'>Python</a></li>
  <li><a href="#perl14" data-toggle='tab'>Perl</a></li>
  <li><a href="#php14" data-toggle='tab'>PHP</a></li>
  <li><a href="#node14" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp14" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl14">
    <pre>
my @params = {name => 'perltest5', url => 'http://www.domain.com'};
$api->post("/zones/pull.json", @params);</pre>
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
  <div class="tab-pane" id="csharp14">
  <pre>
Console.Write("Zone Name: \n");
string ZoneName = Console.ReadLine();
Console.Write("Origin URL (starting with http://): \n");
string url = Console.ReadLine();

api.Post("/zones/pull.json", "url=" + url + "&name=" + ZoneName);
</pre>
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
            "valid_referers": null,
            "spdy": 1,
            "ssl": 1,
            "ssl_sni": 0,
            "geo_enabled": 1
        }
    }
}</pre>
  </div>
</div>


## Get Pull Zones Count

Counts all pull zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The number of pull zones on the specified account |

### Code Samples

<ul class="nav nav-tabs" id="myTab15">
  <li class="active"><a href="#ruby15" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python15" data-toggle='tab'>Python</a></li>
  <li><a href="#perl15" data-toggle='tab'>Perl</a></li>
  <li><a href="#php15" data-toggle='tab'>PHP</a></li>
  <li><a href="#node15" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp15" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl15">
    <pre>
$api->get("/zones/pull.json/count")</pre>
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
  <div class="tab-pane" id="csharp15">
  <pre>
api.Get("/zones/pull.json/count");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull.json/{zone_id}</span></div>
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
`use_stale` | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down |
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
`spdy` | Flag denoting if the zone has the SPDY protocol enabled |
`ssl` | Read-only flag denoting if the zone has Dedicated IP SSL enabled |
`ssl_sni` | Read-only flag denoting if the zone has SNI SSL enabled |
`geo_enabled` | Read-only flag denoting if the zone has 'More Locations' enabled |

### Code Samples

<ul class="nav nav-tabs" id="myTab16">
  <li class="active"><a href="#ruby16" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python16" data-toggle='tab'>Python</a></li>
  <li><a href="#perl16" data-toggle='tab'>Perl</a></li>
  <li><a href="#php16" data-toggle='tab'>PHP</a></li>
  <li><a href="#node16" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp16" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl16">
    <pre>
my $id = 96076;
$api->get("/zones/pull.json/" . $id);</pre>
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
  <div class="tab-pane" id="csharp16">
  <pre>
Console.Write("Zone id: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Get("/zones/pull.json/" + id);
</pre>
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
            "valid_referers": null,
            "spdy": 1,
            "ssl": 1,
            "ssl_sni": 0,
            "geo_enabled": 1
        }
    }
}</pre>
  </div>
</div>


## Update Pull Zone

Updates a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull.json/{zone_id}</span></div>
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
`use_stale` | 0 | List of status codes separated with space - empty character - (?use_stale=500 502 503 504 403 404) are accepted as a valid request. 0 or 1 are accepted by legacy but, these are not valid parameters any more. To disable use_stale you can pass 0 (as a part of the legacy) or empty string "". | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down |
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
`spdy` | 0 | only 0 or 1 accepted | Enable SPDY protocol on the zone (requires SSL) |


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
`use_stale` | Serve expired content while fetching new content. This will also cause the CDN to serve expired content in cases where the origin is down |
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
`spdy` | Flag denoting if the zone has the SPDY protocol enabled |
`ssl` | Read-only flag denoting if the zone has Dedicated IP SSL enabled |
`ssl_sni` | Read-only flag denoting if the zone has SNI SSL enabled |
`geo_enabled` | Read-only flag denoting if the zone has 'More Locations' enabled |

### Code Samples

<ul class="nav nav-tabs" id="myTab17">
  <li class="active"><a href="#ruby17" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python17" data-toggle='tab'>Python</a></li>
  <li><a href="#perl17" data-toggle='tab'>Perl</a></li>
  <li><a href="#php17" data-toggle='tab'>PHP</a></li>
  <li><a href="#node17" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp17" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl17">
    <pre>
my $id = 236828;
my @params = ('compress=0');
$api->put("/zones/pull.json/" . $id, @params);</pre>
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
  <div class="tab-pane" id="csharp17">
  <pre>
Console.Write("Zone id to edit: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Property to edit/change (url/compression...): \n");
string prop = Console.ReadLine();
Console.Write("New value: \n");
string val = Console.ReadLine();

api.Put("/zones/pull.json/" + zoneID, prop + "=" + val);
</pre>
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
            "valid_referers": null,
            "spdy": 1,
            "ssl": 1,
            "ssl_sni": 0,
            "geo_enabled": 1
        }
    }
}</pre>
  </div>
</div>


## Enable Flex

Enables additional locations on a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/flex.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab17-1">
  <li class="active"><a href="#ruby17-1" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python17-1" data-toggle='tab'>Python</a></li>
  <li><a href="#perl17-1" data-toggle='tab'>Perl</a></li>
  <li><a href="#php17-1" data-toggle='tab'>PHP</a></li>
  <li><a href="#node17-1" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp17-1" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response17-1" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby17-1">
    <pre>
id = '97167'
api.post('/zones/pull/'+id+'/flex.json')</pre>
  </div>
  <div class="tab-pane" id="python17-1">
    <pre>
id = '97167'
api.post('/zones/pull/'+id+'/flex.json')</pre>
  </div>
    <div class="tab-pane" id="perl17-1">
    <pre>
my $id = 134458;
$api->post("/zones/pull/" . $id . "/flex.json");</pre>
  </div>
  <div class="tab-pane" id="php17-1">
    <pre>
$id = '97167';
$api->post('/zones/pull/'.$id.'/flex.json');</pre>
  </div>
  <div class="tab-pane" id="node17-1">
  <pre>
var id = '97167'
api.post('/zones/pull/' + id + '/flex.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp17-1">
  <pre>
Console.Write("Zone id to enable: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Post("/zones/pull/" + id + "/flex.json");
</pre>
  </div>
  <div class="tab-pane" id="response17-1">
    <pre>
{
  "code":200
}
</pre>
  </div>
</div>


## Disable Flex

Disables additional locations on a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path"> https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/flex.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab17-2">
  <li class="active"><a href="#ruby17-2" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python17-2" data-toggle='tab'>Python</a></li>
  <li><a href="#perl17-2" data-toggle='tab'>Perl</a></li>
  <li><a href="#php17-2" data-toggle='tab'>PHP</a></li>
  <li><a href="#node17-2" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp17-2" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response17-2" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby17-2">
    <pre>
id = '97167'
api.delete('/zones/pull/'+id+'/flex.json')</pre>
  </div>
  <div class="tab-pane" id="python17-2">
    <pre>
id = '97167'
api.delete('/zones/pull/'+id+'/flex.json')</pre>
  </div>
    <div class="tab-pane" id="perl17-2">
    <pre>
my $id = 134458;
$api->delete("/zones/pull/" . $id . "/flex.json");</pre>
  </div>
  <div class="tab-pane" id="php17-2">
    <pre>
$id = '97167';
$api->delete('/zones/pull'.$id.'flex.json);</pre>
  </div>
  <div class="tab-pane" id="node17-2">
  <pre>
var id = '97167'
api.delete('/zones/pull' + id + 'flex.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp17-2">
  <pre>
Console.Write("Zone id to disable: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Delete("/zones/pull/" + id + "/flex.json");
</pre>
  </div>
  <div class="tab-pane" id="response17-2">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>


## Delete Pull Zone

Deletes a pull zone specified by the {zone_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull.json/{zone_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab18">
  <li class="active"><a href="#ruby18" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python18" data-toggle='tab'>Python</a></li>
  <li><a href="#perl18" data-toggle='tab'>Perl</a></li>
  <li><a href="#php18" data-toggle='tab'>PHP</a></li>
  <li><a href="#node18" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp18" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl18">
    <pre>
my $id = 236828;
$api->delete("/zones/pull.json/" . $id);</pre>
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
  <div class="tab-pane" id="csharp18">
  <pre>
Console.Write("Zone id to delete: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Delete("/zones/pull.json/" + id);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/enable.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab19">
  <li class="active"><a href="#ruby19" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python19" data-toggle='tab'>Python</a></li>
  <li><a href="#perl19" data-toggle='tab'>Perl</a></li>
  <li><a href="#php19" data-toggle='tab'>PHP</a></li>
  <li><a href="#node19" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp19" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl19">
    <pre>
my $id = 134458;
$api->put("/zones/pull/" . $id . "/enable.json");</pre>
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
  <div class="tab-pane" id="csharp19">
  <pre>
Console.Write("Zone id to enable: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Put("/zones/pull/" + id + "/enable.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/disable.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab20">
  <li class="active"><a href="#ruby20" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python20" data-toggle='tab'>Python</a></li>
  <li><a href="#perl20" data-toggle='tab'>Perl</a></li>
  <li><a href="#php20" data-toggle='tab'>PHP</a></li>
  <li><a href="#node20" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp20" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl20">
    <pre>
my $id = 134458;
$api->put("/zones/pull/" . $id . "/disable.json");</pre>
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
  <div class="tab-pane" id="csharp20">
  <pre>
Console.Write("Zone id to disable: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Put("/zones/pull/" + id + "/disable.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull.json/{zone_id}/cache</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`files` | - | An array containing relative paths of the files to purge (i.e./favicon.ico) |

### Code Samples

<ul class="nav nav-tabs" id="myTab21">
  <li class="active"><a href="#ruby21" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python21" data-toggle='tab'>Python</a></li>
  <li><a href="#perl21" data-toggle='tab'>Perl</a></li>
  <li><a href="#php21" data-toggle='tab'>PHP</a></li>
  <li><a href="#node21" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp21" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl21">
  <pre>
#Purge Zone
$api->delete("/zones/pull.json/165013/cache");

#Purge File
my @params = ("%2Frankings%2Fhotlist%2Fi%2F500w%2F2.jpg");
$api->delete("/zones/pull.json/165013/cache", @params);

#Purge Files
my @params = ("%2Frankings%2Fhotlist%2Fi%2F500w%2F2.jpg", "%2F_index%2Ff_mdcdb.html");
$api->delete("/zones/pull.json/165013/cache", @params);</pre>
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
$params = array(
    'files' => array(
        '/file1.txt',
        '/file2.txt'
    )
);
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
  <div class="tab-pane" id="csharp21">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("What do you want to purge? (all/file)");
string ptype = Console.ReadLine();
switch (ptype){
	case "all":
	//Purge ALL
	api.Delete("/zones/pull.json/" + zoneID + "/cache");
	break;
	case "file":
	//Purge FILE
	Console.Write("Enter File Path to Purge (relative path): \n");
	string file = Console.ReadLine();
	file = "file=" + file;
	api.Purge("/zones/pull.json/" + zoneID + "/cache", file);
	break;
	case "fileS":
	//Purge FILES
	Console.Write("How Many? \n");
	int loop = Convert.ToInt32(Console.ReadLine());
	Console.Write("Enter File Paths to Purge (relative paths): \n");
	string files = "";
	for (int i = 0; i < loop; i++)
	{
		Console.Write(i + 1 + ": \n");
		string File = Console.ReadLine();
		files += "file[" + i + "]=" + File + "&";
	}
	api.Purge("/zones/pull.json/" + zoneID + "/cache", files);
	break;
}
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/customdomains.json</span></div>
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
  <li><a href="#perl22" data-toggle='tab'>Perl</a></li>
  <li><a href="#php22" data-toggle='tab'>PHP</a></li>
  <li><a href="#node22" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp22" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl22">
    <pre>
my $id = 134458;
$api->get("/zones/pull/" . $id . "/customdomains.json");
</pre>
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
  <div class="tab-pane" id="csharp22">
  <pre>
Console.Write("Zone Id: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

Console.Write(api.Get("/zones/pull/" + zoneID + "/customdomains.json"));
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/customdomains.json</span></div>
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
  <li><a href="#perl23" data-toggle='tab'>Perl</a></li>
  <li><a href="#php23" data-toggle='tab'>PHP</a></li>
  <li><a href="#node23" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp23" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl23">
    <pre>
my $id = 134458;
my @params = {custom_domain => 'idabic.dom.net'};
$api->post("/zones/pull/" . $id . "/customdomains.json", @params);</pre>
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
  <div class="tab-pane" id="csharp23">
  <pre>
Console.Write("Zone Id: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Domain: \n");
string dat = Console.ReadLine();

api.Post("/zones/pull/" + zoneID + "/customdomains.json", dat="custom_domain=" + dat);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/customdomains.json/{customdomain_id}</span></div>
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
  <li><a href="#perl24" data-toggle='tab'>Perl</a></li>
  <li><a href="#php24" data-toggle='tab'>PHP</a></li>
  <li><a href="#node24" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp24" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl24">
    <pre>
my $zid = 134458;
my $cid = 113070;
my $data = $api->get("/zones/pull/" . $zid . "/customdomains.json/" . $cid);
print $data->{'customdomain'}{'custom_domain'};</pre>
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
  <div class="tab-pane" id="csharp24">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Domain Id: \n");
int domainId = Convert.ToInt32(Console.ReadLine());

api.Get("/zones/pull/" + zoneID + "/customdomains.json/" + domainId);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/customdomains.json/{customdomain_id}</span></div>
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
  <li><a href="#perl25" data-toggle='tab'>Perl</a></li>
  <li><a href="#php25" data-toggle='tab'>PHP</a></li>
  <li><a href="#node25" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp25" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl25">
    <pre>
my $zid = 134458;
my $cid = 173075;
my @params = ('custom_domain=idabic.domain.net');
$api->put("/zones/pull/" . $zid . "/customdomains.json/" . $cid, @params);</pre>
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
  <div class="tab-pane" id="csharp25">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Doamin Id to Edit: \n");
int domainId = Convert.ToInt32(Console.ReadLine());
Console.Write("New Value for this custom domain: \n");
string cdname = Console.ReadLine();

api.Put("/zones/pull/" + zoneID + "/customdomains.json/" + domainId, "custom_domain=" + cdname);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab26">
  <li class="active"><a href="#ruby26" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python26" data-toggle='tab'>Python</a></li>
  <li><a href="#perl26" data-toggle='tab'>Perl</a></li>
  <li><a href="#php26" data-toggle='tab'>PHP</a></li>
  <li><a href="#node26" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp26" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl26">
    <pre>
my $zid = 134458;
my $cid = 173075;
$api->delete("/zones/pull/" . $zid . "/customdomains.json/" . $cid);</pre>
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
  <div class="tab-pane" id="csharp26">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Doamin Id to Edit: \n");
int domainId = Convert.ToInt32(Console.ReadLine());

api.Delete("/zones/pull/" + zoneID + "/customdomains.json/" + domainId);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push.json</span></div>
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
`spdy` | Flag denoting if the zone has the SPDY protocol enabled |

### Code Samples

<ul class="nav nav-tabs" id="myTab27">
  <li class="active"><a href="#ruby27" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python27" data-toggle='tab'>Python</a></li>
  <li><a href="#perl27" data-toggle='tab'>Perl</a></li>
  <li><a href="#php27" data-toggle='tab'>PHP</a></li>
  <li><a href="#node27" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp27" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl27">
    <pre>
$api->get("/zones/push.json")</pre>
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
  <div class="tab-pane" id="csharp27">
  <pre>
api.Get("/zones/push.json");
</pre>
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
                "valid_referers": null,
                "spdy": 1
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
                "valid_referers": null,
                "spdy": 0
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push.json</span></div>
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
`spdy` | 0 | only 0 or 1 accepted | Enable SPDY protocol on the zone (requires SSL) |


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
`spdy` | Flag denoting if the zone has the SPDY protocol enabled |

### Code Samples

<ul class="nav nav-tabs" id="myTab28">
  <li class="active"><a href="#ruby28" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python28" data-toggle='tab'>Python</a></li>
  <li><a href="#perl28" data-toggle='tab'>Perl</a></li>
  <li><a href="#php28" data-toggle='tab'>PHP</a></li>
  <li><a href="#node28" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp28" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl28">
    <pre>
my @params = {name => 'perltestpush', password => 'password'};
$api->post("/zones/push.json", @params);</pre>
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
  <div class="tab-pane" id="csharp28">
  <pre>
Console.Write("Zone Name: \n");
string ZoneName = Console.ReadLine();
Console.Write("Zone Name: \n");
string password = Console.ReadLine();

api.Post("/zones/push.json", "name=" + ZoneName + "&password=" + password);
</pre>
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
            "valid_referers": null,
            "spdy": 1
        }
    }
}</pre>
  </div>
</div>


## Get Push Zones Count

Counts all push zones on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The number of push zones on the specified account |

### Code Samples

<ul class="nav nav-tabs" id="myTab29">
  <li class="active"><a href="#ruby29" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python29" data-toggle='tab'>Python</a></li>
  <li><a href="#perl29" data-toggle='tab'>Perl</a></li>
  <li><a href="#php29" data-toggle='tab'>PHP</a></li>
  <li><a href="#node29" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp29" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl29">
    <pre>
$api->get("/zones/push.json/count");</pre>
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
  <div class="tab-pane" id="csharp29">
  <pre>
Console.Write("Zone id: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Get("/zones/push.json/" + id);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push.json/{zone_id}</span></div>
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
`spdy` | Flag denoting if the zone has the SPDY protocol enabled |

### Code Samples

<ul class="nav nav-tabs" id="myTab30">
  <li class="active"><a href="#ruby30" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python30" data-toggle='tab'>Python</a></li>
  <li><a href="#perl30" data-toggle='tab'>Perl</a></li>
  <li><a href="#php30" data-toggle='tab'>PHP</a></li>
  <li><a href="#node30" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp30" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl30">
    <pre>
my $id = 55659;
$api->get("/zones/push.json/" . $id);</pre>
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
  <div class="tab-pane" id="csharp30">
  <pre>
Console.Write("Zone id to edit: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Property to edit/change (label/compression...): \n");
string prop = Console.ReadLine();
Console.Write("New value: \n");
string val = Console.ReadLine();

api.Put("/zones/push.json/" + zoneID, prop + "=" + val);
</pre>
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
            "valid_referers": null,
            "spdy": 1
        }
    }
}</pre>
  </div>
</div>


## Update Push Zone

Updates a push zone specified by the {zone_id} parameter

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push.json/{zone_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`label` | - | length: 1-255 chars | Something that describes your zone |
`valid_referers` | - | length: 1-100 chars | List of domains for http referrer protection (separated by space), only the domains in the list will be treated as valid referrers |
`content_disposition` | 0 | only 0 or 1 accepted | Force files to download |
`sslshared` | 0 | only 0 or 1 accepted | Enable Shared SSL for your zone, so you can use HTTPS, using our SSL certificate for netdna-ssl.com |
`spdy` | 0 | only 0 or 1 accepted | Enable SPDY protocol on the zone (requires SSL) |


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
`spdy` | Flag denoting if the zone has the SPDY protocol enabled |

### Code Samples

<ul class="nav nav-tabs" id="myTab31">
  <li class="active"><a href="#ruby31" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python31" data-toggle='tab'>Python</a></li>
  <li><a href="#perl31" data-toggle='tab'>Perl</a></li>
  <li><a href="#php31" data-toggle='tab'>PHP</a></li>
  <li><a href="#node31" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp31" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl31">
    <pre>
my $id = 55659;
my @params = ('compress=0');
$api->put("/zones/push.json/" . $id, @params);</pre>
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
api.put('/zones/push.json/' + id, { label: 'Some other description' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp31">
  <pre>
Console.Write("Zone id to edit: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Property to edit/change (label/compression...): \n");
string prop = Console.ReadLine();
Console.Write("New value: \n");
string val = Console.ReadLine();

api.Put("/zones/push.json/" + zoneID, prop + "=" + val);
</pre>
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
            "valid_referers": null,
            "spdy": 1
        }
    }
}</pre>
  </div>
</div>


## Delete Push Zone

Deletes a push zone specified by the {zone_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push.json/{zone_id}</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab32">
  <li class="active"><a href="#ruby32" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python32" data-toggle='tab'>Python</a></li>
  <li><a href="#perl32" data-toggle='tab'>Perl</a></li>
  <li><a href="#php32" data-toggle='tab'>PHP</a></li>
  <li><a href="#node32" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp32" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl32">
    <pre>
my $id = 55659;
$api->delete("/zones/push.json/" . $id);</pre>
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
  <div class="tab-pane" id="csharp32">
  <pre>
Console.Write("Zone id to delete: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Delete("/zones/push.json/" + id);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push/{zone_id}/enable.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab33">
  <li class="active"><a href="#ruby33" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python33" data-toggle='tab'>Python</a></li>
  <li><a href="#perl33" data-toggle='tab'>Perl</a></li>
  <li><a href="#php33" data-toggle='tab'>PHP</a></li>
  <li><a href="#node33" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp33" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl33">
    <pre>
my $id = 55659;
$api->put("/zones/push/" . $id . "/enable.json");</pre>
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
  <div class="tab-pane" id="csharp33">
  <pre>
Console.Write("Zone id to enable: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Put("/zones/push/" + id + "/enable.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push/{zone_id}/disable.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab34">
  <li class="active"><a href="#ruby34" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python34" data-toggle='tab'>Python</a></li>
  <li><a href="#perl34" data-toggle='tab'>Perl</a></li>
  <li><a href="#php34" data-toggle='tab'>PHP</a></li>
  <li><a href="#node34" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp34" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl34">
    <pre>
my $id = 55659;
$api->put("/zones/push/" . $id . "/disable.json");</pre>
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
  <div class="tab-pane" id="csharp34">
  <pre>
Console.Write("Zone id to disable: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Put("/zones/push/" + id + "/disable.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push/{zone_id}/customdomains.json</span></div>
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
  <li><a href="#perl35" data-toggle='tab'>Perl</a></li>
  <li><a href="#php35" data-toggle='tab'>PHP</a></li>
  <li><a href="#node35" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp35" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl35">
    <pre>
my $id = 134458;
$api->get("/zones/push/" . $id . "/customdomains.json");</pre>
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
  <div class="tab-pane" id="csharp35">
  <pre>
Console.Write("Zone Id: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

Console.Write(api.Get("/zones/push/" + zoneID + "/customdomains.json"));
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push/{zone_id}/customdomains.json</span></div>
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
  <li><a href="#perl36" data-toggle='tab'>Perl</a></li>
  <li><a href="#php36" data-toggle='tab'>PHP</a></li>
  <li><a href="#node36" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp36" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl36">
    <pre>
my $id = 55659;
my @params = {custom_domain => 'idabic2.dom.net'};
$api->post("/zones/push/" . $id . "/customdomains.json", @params);</pre>
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
  <div class="tab-pane" id="csharp36">
  <pre>
Console.Write("Zone Id: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Domain: \n");
string dat = Console.ReadLine();

api.Post("/zones/push/" + zoneID + "/customdomains.json", dat="custom_domain=" + dat);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push/{zone_id}/customdomains.json/{customdomain_id}</span></div>
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
  <li><a href="#perl37" data-toggle='tab'>Perl</a></li>
  <li><a href="#php37" data-toggle='tab'>PHP</a></li>
  <li><a href="#node37" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp37" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl37">
    <pre>
my $zid = 55659;
my $cid = 122211;
$api->get("/zones/push/" . $zid . "/customdomains.json/" . $cid);</pre>
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
  <div class="tab-pane" id="csharp37">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Domain Id: \n");
int domainId = Convert.ToInt32(Console.ReadLine());

api.Get"/zones/push/" + zoneID + "/customdomains.json/" + domainId);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push/{zone_id}/customdomains.json/{customdomain_id}</span></div>
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
  <li><a href="#perl38" data-toggle='tab'>Perl</a></li>
  <li><a href="#php38" data-toggle='tab'>PHP</a></li>
  <li><a href="#node38" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp38" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl38">
    <pre>
my $zid = 55659;
my $cid = 122211;
my @params = ('custom_domain=idabic.domain.net');
$api->put("/zones/push/" . $zid . "/customdomains.json/" . $cid, @params);</pre>
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
  <div class="tab-pane" id="csharp38">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Doamin Id to Edit: \n");
int domainId = Convert.ToInt32(Console.ReadLine());
Console.Write("New Value for this custom domain: \n");
string cdname = Console.ReadLine();

api.Put("/zones/push/" + zoneID + "/customdomains.json/" + domainId, "custom_domain=" + cdname);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/push/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab39">
  <li class="active"><a href="#ruby39" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python39" data-toggle='tab'>Python</a></li>
  <li><a href="#perl39" data-toggle='tab'>Perl</a></li>
  <li><a href="#php39" data-toggle='tab'>PHP</a></li>
  <li><a href="#node39" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp39" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl39">
    <pre>
my $zid = 55659;
my $cid = 122211;
$api->delete("/zones/push/" . $zid . "/customdomains.json/" . $cid);</pre>
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
  <div class="tab-pane" id="csharp39">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Doamin Id to Edit: \n");
int domainId = Convert.ToInt32(Console.ReadLine());

api.Delete("/zones/push/" + zoneID + "/customdomains.json/" + domainId);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod.json</span></div>
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
  <li><a href="#perl40" data-toggle='tab'>Perl</a></li>
  <li><a href="#php40" data-toggle='tab'>PHP</a></li>
  <li><a href="#node40" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp40" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl40">
    <pre>
$api->get("/zones/vod.json")</pre>
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
  <div class="tab-pane" id="csharp40">
  <pre>
api.Get("/zones/vod.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod.json</span></div>
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
  <li><a href="#perl41" data-toggle='tab'>Perl</a></li>
  <li><a href="#php41" data-toggle='tab'>PHP</a></li>
  <li><a href="#node41" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp41" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl41">
    <pre>
my @params = {name => 'perltest5', password => 'password'};
$api->post("/zones/vod.json", @params);</pre>
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
  <div class="tab-pane" id="csharp41">
  <pre>
Console.Write("Zone Name: \n");
string ZoneName = Console.ReadLine();
Console.Write("Zone Name: \n");
string password = Console.ReadLine();

api.Post("/zones/vod.json", "name=" + ZoneName + "&password=" + password);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod.json/count</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`count` | The number of VOD zones on the specified account |

### Code Samples

<ul class="nav nav-tabs" id="myTab42">
  <li class="active"><a href="#ruby42" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python42" data-toggle='tab'>Python</a></li>
  <li><a href="#perl42" data-toggle='tab'>Perl</a></li>
  <li><a href="#php42" data-toggle='tab'>PHP</a></li>
  <li><a href="#node42" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp42" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl42">
    <pre>
$api->get("/zones/vod.json/count")</pre>
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
  <div class="tab-pane" id="csharp42">
  <pre>
api.Get("/zones/vod.json/count");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod.json/{zone_id}</span></div>
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
  <li><a href="#perl43" data-toggle='tab'>Perl</a></li>
  <li><a href="#php43" data-toggle='tab'>PHP</a></li>
  <li><a href="#node43" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp43" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl43">
    <pre>
my $id = 75477;
$api->get("/zones/vod.json/" . $id);</pre>
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
  <div class="tab-pane" id="csharp43">
  <pre>
Console.Write("Zone id: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Get("/zones/vod.json/" + id);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod.json/{zone_id}</span></div>
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
  <li><a href="#perl44" data-toggle='tab'>Perl</a></li>
  <li><a href="#php44" data-toggle='tab'>PHP</a></li>
  <li><a href="#node44" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp44" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl44">
    <pre>
my $id = 75477;
my @params = ('compress=0');
$api->put("/zones/vod.json/" . $id, @params);</pre>
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
  <div class="tab-pane" id="csharp44">
  <pre>
Console.Write("Zone id to edit: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Property to edit/change (label...): \n");
string prop = Console.ReadLine();
Console.Write("New value: \n");
string val = Console.ReadLine();

api.Put("/zones/vod.json/" + zoneID, prop + "=" + val);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod.json/{zone_id}</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab45">
  <li class="active"><a href="#ruby45" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python45" data-toggle='tab'>Python</a></li>
  <li><a href="#perl45" data-toggle='tab'>Perl</a></li>
  <li><a href="#php45" data-toggle='tab'>PHP</a></li>
  <li><a href="#node45" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp45" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl45">
    <pre>
my $id = 75477;
$api->delete("/zones/vod.json/" . $id);</pre>
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
  <div class="tab-pane" id="csharp45">
  <pre>
Console.Write("Zone id to delete: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Delete("/zones/vod.json/" + id);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod/{zone_id}/enable.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab46">
  <li class="active"><a href="#ruby46" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python46" data-toggle='tab'>Python</a></li>
  <li><a href="#perl46" data-toggle='tab'>Perl</a></li>
  <li><a href="#php46" data-toggle='tab'>PHP</a></li>
  <li><a href="#node46" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp46" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl46">
    <pre>
my $id = 75477;
$api->put("/zones/vod/" . $id . "/enable.json");</pre>
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
  <div class="tab-pane" id="csharp46">
  <pre>
Console.Write("Zone id to enable: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Put("/zones/vod/" + id + "/enable.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod/{zone_id}/disable.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab47">
  <li class="active"><a href="#ruby47" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python47" data-toggle='tab'>Python</a></li>
  <li><a href="#perl47" data-toggle='tab'>Perl</a></li>
  <li><a href="#php47" data-toggle='tab'>PHP</a></li>
  <li><a href="#node47" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp47" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl47">
    <pre>
my $id = 75477;
$api->put("/zones/vod/" . $id . "/disable.json");</pre>
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
  <div class="tab-pane" id="csharp47">
  <pre>
Console.Write("Zone id to disable: \n");
int id = Convert.ToInt32(Console.ReadLine());

api.Put("/zones/vod/" + id + "/disable.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod/{zone_id}/customdomains.json</span></div>
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
  <li><a href="#perl48" data-toggle='tab'>Perl</a></li>
  <li><a href="#php48" data-toggle='tab'>PHP</a></li>
  <li><a href="#node48" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp48" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl48">
    <pre>
my $id = 75477;
$api->get("/zones/vod/" . $id . "/customdomains.json");</pre>
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
  <div class="tab-pane" id="csharp48">
  <pre>
Console.Write("Zone Id: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

Console.Write(api.Get("/zones/vod/" + zoneID + "/customdomains.json"));
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod/{zone_id}/customdomains.json</span></div>
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
  <li><a href="#perl49" data-toggle='tab'>Perl</a></li>
  <li><a href="#php49" data-toggle='tab'>PHP</a></li>
  <li><a href="#node49" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp49" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl49">
    <pre>
my $id = 75477;
my @params = {custom_domain => 'idabic3.dom.net', type => 'vod-rtmp'};
$api->post("/zones/vod/" . $id . "/customdomains.json", @params);</pre>
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
  <div class="tab-pane" id="csharp49">
  <pre>
Console.Write("Zone Id: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Domain: \n");
string dat = Console.ReadLine();
Console.Write("Type: (vod-rtmp, vod-pseudo, vod-direct, or vod-ftp)\n");
string cdtype = Console.ReadLine();

api.Post("/zones/vod/" + zoneID + "/customdomains.json", dat="custom_domain=" + dat + "&type=" + cdtype);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod/{zone_id}/customdomains.json/{customdomain_id}</span></div>
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
  <li><a href="#perl50" data-toggle='tab'>Perl</a></li>
  <li><a href="#php50" data-toggle='tab'>PHP</a></li>
  <li><a href="#node50" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp50" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl50">
    <pre>
my $zid = 75477;
my $cid = 173088;
my $data = $api->get("/zones/vod/" . $zid . "/customdomains.json/" . $cid);</pre>
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
  <div class="tab-pane" id="csharp50">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Domain Id: \n");
int domainId = Convert.ToInt32(Console.ReadLine());

api.Get"/zones/vod/" + zoneID + "/customdomains.json/" + domainId);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod/{zone_id}/customdomains.json/{customdomain_id}</span></div>
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
  <li><a href="#perl51" data-toggle='tab'>Perl</a></li>
  <li><a href="#php51" data-toggle='tab'>PHP</a></li>
  <li><a href="#node51" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp51" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl51">
    <pre>
my $zid = 75477;
my $cid = 173088;
my @params = ('custom_domain=idabic.domain.net');
$api->put("/zones/vod/" . $zid . "/customdomains.json/" . $cid, @params);</pre>
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
  <div class="tab-pane" id="csharp51">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Doamin Id to Edit: \n");
int domainId = Convert.ToInt32(Console.ReadLine());
Console.Write("New Value for this custom domain: \n");
string cdname = Console.ReadLine();

api.Put("/zones/vod/" + zoneID + "/customdomains.json/" + domainId, "custom_domain=" + cdname);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/vod/{zone_id}/customdomains.json/{customdomain_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab52">
  <li class="active"><a href="#ruby52" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python52" data-toggle='tab'>Python</a></li>
  <li><a href="#perl52" data-toggle='tab'>Perl</a></li>
  <li><a href="#php52" data-toggle='tab'>PHP</a></li>
  <li><a href="#node52" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp52" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl52">
    <pre>
my $zid = 75477;
my $cid = 173088;
$api->delete("/zones/vod/" . $zid . "/customdomains.json/" . $cid);</pre>
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
  <div class="tab-pane" id="csharp52">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Custom Doamin Id to Edit: \n");
int domainId = Convert.ToInt32(Console.ReadLine());

api.Delete("/zones/vod/" + zoneID + "/customdomains.json/" + domainId);
</pre>
  </div>
  <div class="tab-pane" id="response52">
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/{zone_type}/{zone_id}/ssl.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab61">
  <li class="active"><a href="#ruby61" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python61" data-toggle='tab'>Python</a></li>
  <li><a href="#perl61" data-toggle='tab'>Perl</a></li>
  <li><a href="#php61" data-toggle='tab'>PHP</a></li>
  <li><a href="#node61" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp61" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl61">
    <pre>
my $id = 236828;
my $type = "pull";
$api->get("/zones/" . $type . "/" . $id . "/ssl.json");</pre>
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
  <div class="tab-pane" id="csharp61">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();

api.Get("/zones/" + type + "/" + zoneID + "/ssl.json");
</pre>
  </div>
  <div class="tab-pane" id="response61">
    <pre>
{
  "code":201,
  "data":{
    "ssl":{
      "id":1459,
      "ssl_id":1234
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/{zone_type}/{zone_id}/ssl.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`ssl_id`  | - | digit | id of previously created certificate (NOTE: This will become required in future revisions)
`ssl_crt` | - | - | The SSL certificate you are installing. (NOTE: Not required if ssl_id specified) |
`ssl_key` | - | - | The key for the SSL certificate you are installing. |
`ssl_cabundle` | - | - | The CA Bundle for the SSL Certificate you are installing. |
`ssl_sni` | 0 | only 0 or 1 accepted | If this flag is set to 1 your zone will use SNI to identify your certificate, rather than requiring a dedicated IP. |


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
  <li><a href="#perl62" data-toggle='tab'>Perl</a></li>
  <li><a href="#php62" data-toggle='tab'>PHP</a></li>
  <li><a href="#node62" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp62" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl62">
    <pre>
my $id = 236828;
my $type = 'pull';
my $ssl_crt = "-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n";
my $ssl_key = "-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----";
my @params = {ssl_crt => $ssl_crt, ssl_key => $ssl_key};
$api->post("/zones/" . $type . "/" . $id . "/ssl.json", @params);</pre>
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
    <div class="tab-pane" id="csharp62">
  <pre>
var cert = "";
var key = "";
Console.Write("Zone id: \n");
int zoneId = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();
using (StreamReader sr = new StreamReader("cert.txt"))
{
	cert = sr.ReadToEnd();               
}
using (StreamReader sr = new StreamReader("key.txt"))
{
	key = sr.ReadToEnd();
}
var dat = "";
cert = "-----BEGIN CERTIFICATE-----\n" + cert + "\n-----END CERTIFICATE-----\n";
key = "-----BEGIN RSA PRIVATE KEY-----\n" + key + "\n-----END RSA PRIVATE KEY-----\n";

api.Post("/zones/" + type + "/" + zoneId + "/ssl.json", dat="ssl_crt=" + cert + "&ssl_key=" + key);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/{zone_type}/{zone_id}/ssl.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`ssl_id`  | - | digit | id of previously created certificate (NOTE: This will become required in future revisions)
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
  <li><a href="#perl63" data-toggle='tab'>Perl</a></li>
  <li><a href="#php63" data-toggle='tab'>PHP</a></li>
  <li><a href="#node63" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp63" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl63">
    <pre>
my $id = 236828;
my $type = "pull";
my @params = ('ssl_crt=-----BEGIN CERTIFICATE-----\n{ ... your certificate ... }\n-----END CERTIFICATE-----\n', 'ssl_key=-----BEGIN RSA PRIVATE KEY-----\n{ ... your key ... }\n-----END RSA PRIVATE KEY-----');
$api->put("/zones/" . $type . "/" . $id . "/ssl.json", @params);</pre>
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
    <div class="tab-pane" id="csharp63">
  <pre>
var cert = "";
var key = "";
Console.Write("Zone id: \n");
int zoneId = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();
using (StreamReader sr = new StreamReader("cert.txt"))
{
	cert = sr.ReadToEnd();               
}
using (StreamReader sr = new StreamReader("key.txt"))
{
	key = sr.ReadToEnd();
}
var dat = "";
cert = "-----BEGIN CERTIFICATE-----\n" + cert + "\n-----END CERTIFICATE-----\n";
key = "-----BEGIN RSA PRIVATE KEY-----\n" + key + "\n-----END RSA PRIVATE KEY-----\n";

api.Put("/zones/" + type + "/" + zoneId + "/ssl.json", dat="ssl_crt=" + cert + "&ssl_key=" + key);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/{zone_type}/{zone_id}/ssl.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab64">
  <li class="active"><a href="#ruby64" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python64" data-toggle='tab'>Python</a></li>
  <li><a href="#perl64" data-toggle='tab'>Perl</a></li>
  <li><a href="#php64" data-toggle='tab'>PHP</a></li>
  <li><a href="#node64" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp64" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl64">
    <pre>
my $id = 236828;
my $type = "pull";
$api->delete("/zones/" . $type . "/" . $id . "/ssl.json");</pre>
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
  <div class="tab-pane" id="csharp64">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();

api.Delete("/zones/" + type + "/" + zoneID + "/ssl.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/{zone_type}/{zone_id}/upstream.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab65">
  <li class="active"><a href="#ruby65" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python65" data-toggle='tab'>Python</a></li>
  <li><a href="#perl65" data-toggle='tab'>Perl</a></li>
  <li><a href="#php65" data-toggle='tab'>PHP</a></li>
  <li><a href="#node65" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp65" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response65" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby65">
    <pre>
type = 'pull'
id = '96061'
api.get('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
  <div class="tab-pane" id="python65">
    <pre>
type = 'pull'
id = '96061'
api.get('/zones/'+type+'/'+id+'/upstream.json')</pre>
  </div>
    <div class="tab-pane" id="perl65">
    <pre>
my $id = 236828;
my $type = "pull";
$api->get("/zones/" . $type . "/" . $id . "/upstream.json");</pre>
  </div>
  <div class="tab-pane" id="php65">
    <pre>
$type = 'pull';
$id = '96061';
$api->get('/zones/'.$type.'/'.$id.'/upstream.json');</pre>
  </div>
  <div class="tab-pane" id="node65">
  <pre>
var type = 'pull'
var id = '96061'
api.get('/zones/' + type + '/' + id + '/upstream.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp65">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();

api.Get("/zones/" + type + "/" + zoneID + "/upstream.json");
</pre>
  </div>
  <div class="tab-pane" id="response65">
    <pre>
{u'code': 200, u'data': {u'total': 1, u'upstreams': [{u'weight': u'1', u'id': u'121', u'bucket_id': u'96061', u'server': u'http://cdn.somedomain.com', u'backup': u'0', u'port': u'80'}]}}
</pre>
  </div>
</div>


## Enable Upstream on Zone

Create and enable Upstream for a specific {zone_id}.

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/{zone_type}/{zone_id}/upstream.json</span></div>
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
  <li><a href="#perl66" data-toggle='tab'>Perl</a></li>
  <li><a href="#php66" data-toggle='tab'>PHP</a></li>
  <li><a href="#node66" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp66" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response66" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby66">
    <pre>
type = 'pull'
id = '96061'
params = {"server_url"=> "http://cdn.somedomain.com","server"=> "http://cdn.somedomain.com","port"=> "80"}
api.post('/zones/'+type+'/'+id+'/upstream.json', params)</pre>
  </div>
  <div class="tab-pane" id="python66">
    <pre>
type = 'pull'
id = '96061'
params = {"server_url": "http://cdn.somedomain.com","server": "http://cdn.somedomain.com","port": "80"}
api.post('/zones/'+type+'/'+id+'/upstream.json', params)</pre>
  </div>
    <div class="tab-pane" id="perl66">
    <pre>
my $id = 96061;
my $type = "pull";
my @params = {server_url => 'http://cdn.somedomain.com', server => 'http://cdn.somedomain.com', port => '80'};
$api->post("/zones/" . $type . "/" . $id . "/upstream.json", @params);</pre>
  </div>
  <div class="tab-pane" id="php66">
    <pre>
$type = 'pull';
$id = '96061';
$params = array("server_url"=>"http://cdn.somedomain.com","server"=>"http://cdn.somedomain.com","port"=>"80");
$api->post('/zones/'.$type.'/'.$id.'/upstream.json', $params);</pre>
  </div>
  <div class="tab-pane" id="node66">
  <pre>
var type = 'pull'
var id = '96061'
api.post('/zones/' + type + '/' + id + '/upstream.json', { server_url: 'http://cdn.somedomain.com', server: 'http://cdn.somedomain.com', port: '80' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp66">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();

api.Post("/zones/" + type + "/" + zoneID + "/upstream.json", "server_url=http://cdn.somedomain.com&server=http://cdn.somedomain.com&port=80");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/{zone_type}/{zone_id}/upstream.json</span></div>
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
  <li><a href="#perl67" data-toggle='tab'>Perl</a></li>
  <li><a href="#php67" data-toggle='tab'>PHP</a></li>
  <li><a href="#node67" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp67" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response67" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby67">
    <pre>
type = 'pull'
id = '96061'
params = {"upstream_id"=> "93013","server_url"=> "http://somedomain.com","port"=> "80"}
api.put('/zones/'+type+'/'+id+'/upstream.json', params)</pre>
  </div>
  <div class="tab-pane" id="python67">
    <pre>
type = 'pull'
id = '96061'
params = {"upstream_id": "93013","server_url": "http://somedomain.net","port": "80"}
api.put('/zones/'+type+'/'+id+'/upstream.json', params)</pre>
  </div>
    <div class="tab-pane" id="perl67">
    <pre>
my $id = 96061;
my $type = "pull";
my @params = ('upstream_id=93013', 'server_url=http://somedomain.net', 'port=80');
$api->put("/zones/" . $type . "/" . $id . "/upstream.json", @params);</pre>
  </div>
  <div class="tab-pane" id="php67">
    <pre>
$type = 'pull';
$id = '96061';
$params = array("upstream_id"=>"93013","server_url"=>"http://somedomain.net","port"=>"80");
$api->put('/zones/'.$type.'/'.$id.'/upstream.json', $params);</pre>
  </div>
  <div class="tab-pane" id="node67">
  <pre>
var type = 'pull'
var id = '96061'
api.put('/zones/' + type + '/' + id + '/upstream.json', { upstream_id: '93013', server_url: 'http://somedomain.net', port: '80' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp67">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();
Console.Write("Upstream ID: \n");
int upstreamID = Convert.ToInt32(Console.ReadLine());

api.Put("/zones/" + type + "/" + zoneID + "/upstream.json", "upstream_id=" + upstreamID + "&server_url=http://somedomain.com&port=80");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/{zone_type}/{zone_id}/upstream.json</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab68">
  <li class="active"><a href="#ruby68" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python68" data-toggle='tab'>Python</a></li>
  <li><a href="#perl68" data-toggle='tab'>Perl</a></li>
  <li><a href="#php68" data-toggle='tab'>PHP</a></li>
  <li><a href="#node68" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp68" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl68">
    <pre>
my $id = 96061;
my $type = "pull";
$api->delete("/zones/" . $type . "/" . $id . "/upstream.json");</pre>
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
  <div class="tab-pane" id="csharp68">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();

api.Delete("/zones/" + type + "/" + zoneID + "/upstream.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/stats.json/{report_type}</span></div>
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
  <li><a href="#perl69" data-toggle='tab'>Perl</a></li>
  <li><a href="#php69" data-toggle='tab'>PHP</a></li>
  <li><a href="#node69" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp69" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl69">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
$api->get("/reports/stats.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp69">
  <pre>
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/stats.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/statsbyzone.json/{report_type}</span></div>
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
  <li><a href="#perl100" data-toggle='tab'>Perl</a></li>
  <li><a href="#php100" data-toggle='tab'>PHP</a></li>
  <li><a href="#node100" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp100" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl100">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
$api->get("/reports/statsbyzone.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp100">
  <pre>
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/statsbyzone.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/stats.json/{report_type}</span></div>
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
  <li><a href="#perl70" data-toggle='tab'>Perl</a></li>
  <li><a href="#php70" data-toggle='tab'>PHP</a></li>
  <li><a href="#node70" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp70" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl70">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $id = 96061;
$api->get("/reports/" . $id . "/stats.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp70">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneID + "/stats.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/nodes.json</span></div>
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
  <li><a href="#perl71" data-toggle='tab'>Perl</a></li>
  <li><a href="#php71" data-toggle='tab'>PHP</a></li>
  <li><a href="#node71" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp71" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl71">
    <pre>
$api->get("/reports/nodes.json")</pre>
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
  <div class="tab-pane" id="csharp71">
  <pre>
api.Get("/reports/nodes.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/nodes.json</span></div>
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
  <li><a href="#perl72" data-toggle='tab'>Perl</a></li>
  <li><a href="#php72" data-toggle='tab'>PHP</a></li>
  <li><a href="#node72" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp72" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl72">
    <pre>
my $id = 96061;
$api->get("/reports/" . $id . "/nodes.json");</pre>
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
  <div class="tab-pane" id="csharp72">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

api.Get("/reports/" + id + "/nodes.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/nodes.json/stats/{report_type}</span></div>
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
  <li><a href="#perl73" data-toggle='tab'>Perl</a></li>
  <li><a href="#php73" data-toggle='tab'>PHP</a></li>
  <li><a href="#node73" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp73" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl73">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
$api->get("/reports/nodes.json/stats" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp73">
  <pre>
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/nodes.json/stats" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/nodes.json/stats/{report_type}</span></div>
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
  <li><a href="#perl74" data-toggle='tab'>Perl</a></li>
  <li><a href="#php74" data-toggle='tab'>PHP</a></li>
  <li><a href="#node74" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp74" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl74">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $id = 96061;
$api->get("/reports/" . $id . "/nodes.json/stats" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp74">
  <pre>
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneID + "/nodes.json/stats" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/nodes.json/{node_id}</span></div>
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
  <li><a href="#perl75" data-toggle='tab'>Perl</a></li>
  <li><a href="#php75" data-toggle='tab'>PHP</a></li>
  <li><a href="#node75" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp75" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl75">
    <pre>
my $id = 1;
$api->get("/reports/nodes.json/" . $id);</pre>
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
  <div class="tab-pane" id="csharp75">
  <pre>
Console.Write("Node ID: \n");
int nodeID = Convert.ToInt32(Console.ReadLine());

api.Get("/reports/nodes.json/" + nodeID);
</pre>
  </div
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


## Get Node by Zone

Gets the node information for the specified {node_id} and
{zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/nodes.json/{node_id}</span></div>
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
  <li><a href="#perl76" data-toggle='tab'>Perl</a></li>
  <li><a href="#php76" data-toggle='tab'>PHP</a></li>
  <li><a href="#node76" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp76" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl76">
    <pre>
my $zoneId = 96061;
my $nodeId = 1;
$api->get("/reports/" . $zoneId . "/nodes.json/" . $nodeId);</pre>
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
  <div class="tab-pane" id="csharp76">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Node ID: \n");
int nodeID = Convert.ToInt32(Console.ReadLine());

api.Get("/reports/" + zoneID + "/nodes.json/" + nodeID);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/nodes.json/{node_id}/stats/{report_type}</span></div>
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
  <li><a href="#perl77" data-toggle='tab'>Perl</a></li>
  <li><a href="#php77" data-toggle='tab'>PHP</a></li>
  <li><a href="#node77" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp77" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl77">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $id = 1;
$api->get("/reports/nodes.json/" . $id . "/stats" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp77">
  <pre>
Console.Write("Node ID: \n");
int nodeID = Convert.ToInt32(Console.ReadLine());
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/nodes.json/" + nodeID + "/stats" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/nodes.json/{node_id}/stats/{report_type}</span></div>
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
  <li><a href="#perl78" data-toggle='tab'>Perl</a></li>
  <li><a href="#php78" data-toggle='tab'>PHP</a></li>
  <li><a href="#node78" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp78" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl78">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $zoneId = 96061;
my $nodeId = 1;
$api->get("/reports/" . $zoneId . "/nodes.json/" . $nodeId . "/stats" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp78">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Node ID: \n");
int nodeID = Convert.ToInt32(Console.ReadLine());
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneID + "/nodes.json/" + nodeID + "/stats" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/popularfiles.json</span></div>
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
  <li><a href="#perl79" data-toggle='tab'>Perl</a></li>
  <li><a href="#php79" data-toggle='tab'>PHP</a></li>
  <li><a href="#node79" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp79" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl79">
    <pre>
$api->get("/reports/popularfiles.json")</pre>
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
  <div class="tab-pane" id="csharp79">
  <pre>
api.Get("/reports/popularfiles.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_type}/popularfiles.json</span></div>
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
  <li><a href="#perl80" data-toggle='tab'>Perl</a></li>
  <li><a href="#php80" data-toggle='tab'>PHP</a></li>
  <li><a href="#node80" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp80" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl80">
    <pre>
my $type = "pull";
$api->get("/reports/" . $type . "/popularfiles.json");</pre>
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
  <div class="tab-pane" id="csharp80">
  <pre>
Console.Write("Zone type: \n");
string type = Console.ReadLine();
	
api.Get("/reports/" + type + "/popularfiles.json");
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/statuscodes.json/{report_type}</span></div>
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
  <li><a href="#perl81" data-toggle='tab'>Perl</a></li>
  <li><a href="#php81" data-toggle='tab'>PHP</a></li>
  <li><a href="#node81" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp81" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl81">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
$api->get("/reports/statuscodes.json/" . $reportType);</pre>
  </div>
  <div class="tab-pane" id="php81">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/statuscodes.json/'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node81">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statuscodes.json' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp81">
  <pre>
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/statuscodes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/statuscodes.json/{report_type}</span></div>
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
  <li><a href="#perl82" data-toggle='tab'>Perl</a></li>
  <li><a href="#php82" data-toggle='tab'>PHP</a></li>
  <li><a href="#node82" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp82" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl82">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $id = 96061;
$api->get("/reports/" . $id . "/statuscodes.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp82">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

api.Get("/reports/" + zoneID + "/statuscodes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_type}/statuscodes.json/{report_type}</span></div>
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
  <li><a href="#perl83" data-toggle='tab'>Perl</a></li>
  <li><a href="#php83" data-toggle='tab'>PHP</a></li>
  <li><a href="#node83" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp83" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl83">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $zoneType = "pull";
$api->get("/reports/" . $zoneType . "/statuscodes.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp83">
  <pre>
Console.Write("Zone type: \n");
string zoneType = Console.ReadLine();
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneType + "/statuscodes.json" + reportType);
</pre>
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


## List Status Codes by Zone Id and Zone Type

Gets HTTP status code response statistics for a specific
{zone_type} and {zone_id}

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_type}/{zone_id}/statuscodes.json/{report_type}</span></div>
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
  <li><a href="#perl84" data-toggle='tab'>Perl</a></li>
  <li><a href="#php84" data-toggle='tab'>PHP</a></li>
  <li><a href="#node84" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp84" data-toggle='tab'>.NET/C#</a></li>
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
    <div class="tab-pane" id="perl84">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $id = 96061;
my $zoneType = "pull";
$api->get("/reports/" . $zoneType . "/" . $id . "/statuscodes.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp84">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string zoneType = Console.ReadLine();
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneType + "/" + zoneID + "/statuscodes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/filetypes.json/{report_type}</span></div>
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
  <li><a href="#perl85" data-toggle='tab'>Perl</a></li>
  <li><a href="#php85" data-toggle='tab'>PHP</a></li>
  <li><a href="#node85" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp85" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl85">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
$api->get("/reports/filetypes.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp85">
  <pre>
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/filetypes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/filetypes.json/{report_type}</span></div>
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
  <li><a href="#perl86" data-toggle='tab'>Perl</a></li>
  <li><a href="#php86" data-toggle='tab'>PHP</a></li>
  <li><a href="#node86" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp86" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl86">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $id = 96061;
$api->get("/reports/" . $id . "/filetypes.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp86">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneID + "/filetypes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_type}/filetypes.json/{report_type}</span></div>
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
  <li><a href="#perl87" data-toggle='tab'>Perl</a></li>
  <li><a href="#php87" data-toggle='tab'>PHP</a></li>
  <li><a href="#node87" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp87" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl87">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $zoneType = "pull";
$api->get("/reports/" . $zoneType . "/filetypes.json" . $reportType);</pre>
  </div>
  <div class="tab-pane" id="php87">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneType = 'pull';
$api->get('/reports/'.$zoneType.'/filetypes.json'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node87">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneType = 'pull'
api.get('/reports/' + zoneType + '/filetypes.json' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp87">
  <pre>
Console.Write("Zone type: \n");
string zoneType = Console.ReadLine();
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneType + "/filetypes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_type}/{zone_id}/filetypes.json/{report_type}</span></div>
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
  <li><a href="#perl88" data-toggle='tab'>Perl</a></li>
  <li><a href="#php88" data-toggle='tab'>PHP</a></li>
  <li><a href="#node88" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp88" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl88">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $zoneType = "pull";
my $id = 96061;
$api->get("/reports/" . $zoneType . "/" . $id . "/filetypes.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp88">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string zoneType = Console.ReadLine();
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneType + "/" + zoneID + "/filetypes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/filesizes.json/{report_type}</span></div>
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
  <li><a href="#perl89" data-toggle='tab'>Perl</a></li>
  <li><a href="#php89" data-toggle='tab'>PHP</a></li>
  <li><a href="#node89" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp89" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl89">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
$api->get("/reports/filesizes.json/" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp89">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string zoneType = Console.ReadLine();
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneType + "/" + zoneID + "/filesizes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/filesizes.json/{report_type}</span></div>
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
  <li><a href="#perl90" data-toggle='tab'>Perl</a></li>
  <li><a href="#php90" data-toggle='tab'>PHP</a></li>
  <li><a href="#node90" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp90" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl90">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $id = 96061;
$api->get("/reports/" . $id . "/filesizes.json" . $reportType);</pre>
  </div>
  <div class="tab-pane" id="php90">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$id = '96061';
$api->get('/reports/'.$id.'/filesizes.json'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node90">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var id = '96061'
api.get('/reports/' + id + '/filesizes.json' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp90">
  <pre>
Console.Write("Zone type: \n");
string zoneType = Console.ReadLine();
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneType + "/filesizes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_type}/filesizes.json/{report_type}</span></div>
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
  <li><a href="#perl91" data-toggle='tab'>Perl</a></li>
  <li><a href="#php91" data-toggle='tab'>PHP</a></li>
  <li><a href="#node91" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp91" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl91">
    <pre>
  reportType = ''; #Valid input includes '/daily', '/hourly', '/monthly' or ''
  zoneType = 'pull';
  api.get('/reports/'+zoneType+'/filesizes.json'+reportType);</pre>
  </div>
  <div class="tab-pane" id="php91">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$zoneType = 'pull';
$api->get('/reports/'.$zoneType.'/filesizes.json'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node91">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var zoneType = 'pull'
api.get('/reports/' + zoneType + '/filesizes.json' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp91">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string zoneType = Console.ReadLine();
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneType + "/" + zoneID + "/filesizes.json" + reportType);
</pre>
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
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_type}/{zone_id}/filesizes.json/{report_type}</span></div>
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
  <li><a href="#perl92" data-toggle='tab'>Perl</a></li>
  <li><a href="#php92" data-toggle='tab'>PHP</a></li>
  <li><a href="#node92" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp92" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl92">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $zoneType = "pull";
my $id = 96061;
$api->get("/reports/" . $zoneType . "/" . $id . "/filesizes.json" . $reportType);</pre>
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
  <div class="tab-pane" id="csharp92">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string zoneType = Console.ReadLine();
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneType + "/" + zoneID + "/filesizes.json" + reportType);
</pre>
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

Gets usage statistics by directory for your account (this report has to be enabled by our sales department)

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/statsbydir.json/{report_type}</span></div>
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
  <li><a href="#perl93" data-toggle='tab'>Perl</a></li>
  <li><a href="#php93" data-toggle='tab'>PHP</a></li>
  <li><a href="#node93" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp93" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl93">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
$api->get("/reports/statsbydir.json" . $reportType);</pre>
  </div>
  <div class="tab-pane" id="php93">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$api->get('/reports/statsbydir.json'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node93">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
api.get('/reports/statsbydir.json' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp93">
  <pre>
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/statsbydir.json" + reportType);
</pre>
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

Gets usage statistics by directory for the specified {zone_id} (this report has to be enabled by our sales department)

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/reports/{zone_id}/statsbydir.json/{report_type}</span></div>
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
  <li><a href="#perl94" data-toggle='tab'>Perl</a></li>
  <li><a href="#php94" data-toggle='tab'>PHP</a></li>
  <li><a href="#node94" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp94" data-toggle='tab'>.NET/C#</a></li>
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
  <div class="tab-pane" id="perl94">
    <pre>
my $reportType = ""; #Vaild input includes /daily, /hourly, /monthly or ""
my $id = 96061;
$api->get("/reports/" . $id . "/statsbydir.json" . $reportType);
</pre>
  </div>
  <div class="tab-pane" id="php94">
    <pre>
$reportType = ''; //Vaild input includes '/daily', '/hourly', '/monthly' or ''
$id = '96061';
$api->get('/reports/'.$id.'/statsbydir.json'.$reportType);</pre>
  </div>
  <div class="tab-pane" id="node94">
  <pre>
var reportType = '' //Valid input includes '/daily', '/hourly', '/monthly' or ''
var id = '96061'
api.get('/reports/' + id + '/' + '/statsbydir.json' + reportType, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp94">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());
Console.Write("Report type (/daily, /hourly, /monthly or empty string): \n");
string reportType = Console.ReadLine();

api.Get("/reports/" + zoneID + "/statsbydir.json" + reportType);
</pre>
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

# Raw Logs API

## Get Raw Logs

Retrieve up to five days of raw log data

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/v3/reporting/logs.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | ---
`start` | now() - 1 hour | ISO-8601 formatted date/time | The start of the range for requests to pull. |
`end` | now() | ISO-8601 formatted date/time | The end of the range for requests to pull |
`zones` | - | CSV of ints | The specific zones whose requests you want to pull. Separate multiple zone ids by comma |
`uri` | - | string | Use this filter to view requests made for a specific resource (or group of resources). You can do a literal match or regular expression in this field (i.e. '/images/header.png' or 'regex:/images/') |
`status` | - | CSV of ints | The specific HTTP status code responses you want to pull. Separate multiple HTTP status codes by comma (i.e. 200,201,304) |
`ssl` | both | enum(nossl, ssl, both) | Use this filter to distinguish between SSL and non-SSL traffic (choose nossl, ssl or both) |
`user_agent` | - | string | Filter logs by specific user agents. You can do a literal match or regular expression in this field (i.e. 'Python MaxCDN API Client' or 'regex:Chrome') |
`referer` | - | string | Filter logs by a specific referer. You can do a literal match or regular expression in this field (i.e. 'www.maxcdn.com' or 'regex:maxcdn.com') |
`pop` | - | CSV of strings  | Filter logs by specific POPs (Points Of Presence), use comma separation for multiple POPs. Possible values: ams, atl, aus, chi, dal, den, fra, hkg, jfk, lax, lhr, mia, sea, sfo, sin, sjc, slc, tko, vir |
`query_string` | - | string | Filter logs by a specific query string. You can do a literal match or regular expression in this field (i.e. 'width=600' or 'regex:width') |
`limit` | 100 | int | How many records should be retrieved per page. Maximum is 1000 |
`start_key` | - | string | String-based key for next page of records to return, for easy pagination or streaming. This key will be provided in the "next_page_key" from a response. |
`sort` | recent | enum(recent, oldest) | Display records sorted by newest first or oldest first |


### Response Parameters

Parameter | Description |
--- | --- | ---
`limit` | The maximum number of records retrieved |
`page` | The current page of records retrieved |
`request_time` | Time in milliseconds for request to complete |
`next_page_key` | Number string that can be used to load the next page |
`records` | Total records displayed |
`bytes` | Total bytes of request |
`client_asn` | Visitor's "access network" (ISP) |
`client_city` | Visitor's city |
`client_continent` | Visitor's continent |
`client_country` | Visitor's country |
`client_dma` | Visitor's "designated market area" |
`client_ip` | Visitor's public IP |
`client_latitude` | Visitor's geographical latitude (roughly) |
`client_longitude` | Visitor's geographical longitude (roughly) |
`client_state` | Visitor's state |
`company_id` | Your company ID |
`cache_status` | CDN status of the file (HIT, MISS) |
`hostname` | Domain name that was visited |
`method` | HTTP request method |
`origin_time` | How long it takes MaxCDN to retrieve the file (if cache status was a MISS) |
`pop` | Point Of Presence that was hit (LAX, LHR, TYO, etc.) |
`protocol` | HTTP protocol used |
`query_string` | Query string attached to a file (ex. ver=1.2) |
`referer` | Referring site |
`scheme` | HTTP or HTTPS |
`status` | HTTP status code (200, 404, 302, etc.) |
`time` | UTC timestamp of the request |
`uri` | File requested |
`user_agent` | Text identifying the visitor's browser |
`zone_id` | ID of the Push/Pull/VOD zone hit |

### Code Samples

<ul class="nav nav-tabs" id="myTab101">
  <li class="active"><a href="#ruby101" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python101" data-toggle='tab'>Python</a></li>
  <li><a href="#perl101" data-toggle='tab'>Perl</a></li>
  <li><a href="#php101" data-toggle='tab'>PHP</a></li>
  <li><a href="#node101" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp101" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response101" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby101">
    <pre>
api.get('/v3/reporting/logs.json?start=2014-01-30&end=2014-01-31&status=200')</pre>
  </div>
  <div class="tab-pane" id="python101">
    <pre>
params = {"start":"2014-01-30", "end":"2014-01-31", "status":"200"}
api.get('/v3/reporting/logs.json', data=params)</pre>
  </div>
  <div class="tab-pane" id="perl101">
    <pre>
$api->get("/v3/reporting/logs.json?start=2014-01-30&end=2014-01-31&status=200");</pre>
  </div>
  <div class="tab-pane" id="php101">
    <pre>
$params = array("start"=>"2014-01-30", "end"=>"2014-01-31", "status"=>"200")
$api->get('/v3/reporting/logs.json', $params)</pre>
  </div>
  <div class="tab-pane" id="node101">
    <pre>
api.get('v3/reporting/logs.json?start=2014-01-30&end=2014-01-31&status=200', function(err, response) {
  console.log(response);
});</pre>
  </div>
  <div class="tab-pane" id="csharp101">
    <pre>
api.Get("/v3/reporting/logs.json?start=2014-01-30&end=2014-01-31&status=200");
</pre>
  </div>
  <div class="tab-pane" id="response101">
    <pre>
{
  "limit":1000,
  "page":1,
  "total":3,
  "next_page_key":"1234abcdef",
  "records":[
    {
      "bytes":175953,
      "asn":"AS4804 Microplex PTY LTD",
      "city":"Brisbane",
      "continent":"OC",
      "country":"AU",
      "dma":"0",
      "ip":"127.0.0.1",
      "latitude":0,
      "longitude":1.2345,
      "cache_status":"HIT",
      "hostname":"cdn.example.com",
      "method":"GET",
      "origin_time":"0",
      "pop":"lax",
      "protocol":"HTTP/1.1",
      "query_string":"",
      "scheme":"https",
      "status_code":200,
      "request_time":"2014-01-30T17:00:12Z",
      "uri":"/content.png",
      "user_agent":"Opera/9.80 (Windows NT 5.1; Edition DriverPack) Presto/2.12.388 Version/12.16",
      "zone":"example"
    },
    {
      "bytes":175953,
      "asn":"AS4804 Microplex PTY LTD",
      "city":"Brisbane",
      "continent":"OC",
      "country":"AU",
      "dma":"0",
      "ip":"127.0.0.1",
      "latitude":0.0,
      "longitude":0.12345,
      "cache_status":"HIT",
      "hostname":"cdn.example.com",
      "method":"GET",
      "origin_time":"0",
      "pop":"lax",
      "protocol":"HTTP/1.1",
      "query_string":"ver=1.2",
      "scheme":"https",
      "status_code":200,
      "request_time":"2014-01-30T17:00:12Z",
      "uri":"/sample/test.swf",
      "user_agent":"Opera/9.80 (Windows NT 5.1; Edition DriverPack) Presto/2.12.388 Version/12.16",
      "zone":"example"
    }
  ]
}</pre>
  </div>
</div>


# Origin Shield API

## Enable Origin Shield

Enable an Origin Shield on your Pull Zone

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/zoneshields.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Description |
--- | --- | ---
`location` | Possible values: sjc for San Jose, vir for Virginia |

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The numerical ID of your request |
`zone_id` | Your Pull Zone ID |
`reporting_code` | The chosen geographical location of the Origin Shield |

### Code Samples

<ul class="nav nav-tabs" id="myTab102">
  <li class="active"><a href="#ruby102" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python102" data-toggle='tab'>Python</a></li>
  <li><a href="#perl102" data-toggle='tab'>Perl</a></li>
  <li><a href="#php102" data-toggle='tab'>PHP</a></li>
  <li><a href="#node102" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp102" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response102" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby102">
    <pre>
id = '97167'
params = {"location"=>"sjc"}
api.post('/zones/pull/'+id+'/zoneshields.json', params)</pre>
  </div>
  <div class="tab-pane" id="python102">
    <pre>
id = '97167'
params = {"location":"sjc"}
api.post('/zones/pull/'+id+'/zoneshields.json', params)</pre>
  </div>
  <div class="tab-pane" id="perl102">
    <pre>
my $id = 123502;
my @params = {location => 'sjc'};
$api->post("/zones/pull/" . $id . "/zoneshields.json", @params);</pre>
  </div>
  <div class="tab-pane" id="php102">
    <pre>
$id = '97167';
$params = array("location"=>"sjc");
$api->post('/zones/pull/'.$id.'/zoneshields.json', $params)</pre>
  </div>
  <div class="tab-pane" id="node102">
    <pre>
var id = '96167'
api.post('/zones/pull/' + id + '/zoneshields.json', { location: 'sjc' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp102">
    <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

api.Post("/zones/pull/" + zoneID + "/zoneshields.json", "location=sjc");
</pre>
  </div>
  <div class="tab-pane" id="response102">
    <pre>
{
  "data": {
    "zoneshields": [
      {
        "id": 26,
        "zone_id": "97167",
        "reporting_code": "sjc",
      },
    ]
  },
  "code": 201
}</pre>
  </div>
</div>


## Update Origin Shield

Update the active Origin Shield for your Pull Zone

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/zoneshields.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Description |
--- | --- | ---
`location` | Possible values: sjc for San Jose, vir for Virginia |

### Response Parameters

Parameter | Description |
--- | --- | ---
`id` | The numerical ID of your request |
`zone_id` | Your Pull Zone ID |
`reporting_code` | The chosen geographical location of the Origin Shield |

### Code Samples

<ul class="nav nav-tabs" id="myTab103">
  <li class="active"><a href="#ruby103" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python103" data-toggle='tab'>Python</a></li>
  <li><a href="#perl103" data-toggle='tab'>Perl</a></li>
  <li><a href="#php103" data-toggle='tab'>PHP</a></li>
  <li><a href="#node103" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp103" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response103" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby103">
    <pre>
id = '97167'
params = {"location"=>"sjc"}
api.put('/zones/pull/'+id+'/zoneshields.json', params)</pre>
  </div>
  <div class="tab-pane" id="python103">
    <pre>
id = '97167'
params = {"location":"sjc"}
api.put('/zones/pull/'+id+'/zoneshields.json', params)</pre>
  </div>
  <div class="tab-pane" id="perl103">
    <pre>
my $id = 123502;
my @params = ('location=sjc');
$api->put("/zones/pull/" . $id . "/zoneshields.json", @params);</pre>
  </div>
  <div class="tab-pane" id="php103">
    <pre>
$id = '97167';
$params = array("location"=>"sjc");
$api->put('/zones/pull/'.$id.'/zoneshields.json', $params)</pre>
  </div>
  <div class="tab-pane" id="node103">
    <pre>
var id = '96167'
api.put('/zones/pull/' + id + '/zoneshields.json', { location: 'sjc' }, function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp103">
    <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

api.Put("/zones/pull/" + zoneID + "/zoneshields.json", "location=sjc");
</pre>
  </div>
  <div class="tab-pane" id="response103">
    <pre>
{
  "data": {
    "zoneshields": [
      {
        "id": 26,
        "zone_id": "97167",
        "reporting_code": "sjc",
      },
    ]
  },
  "code": 201
}</pre>
  </div>
</div>


## Delete Origin Shield

Remove the active Origin Shield from your Pull Zone

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/zones/pull/{zone_id}/zoneshields.json</span></div>
</div>

### Code Samples

<ul class="nav nav-tabs" id="myTab104">
  <li class="active"><a href="#ruby104" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python104" data-toggle='tab'>Python</a></li>
  <li><a href="#perl104" data-toggle='tab'>Perl</a></li>
  <li><a href="#php104" data-toggle='tab'>PHP</a></li>
  <li><a href="#node104" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp104" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response104" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby104">
    <pre>
id = '97167'
api.delete('/zones/pull/'+id+'/zoneshields.json')</pre>
  </div>
  <div class="tab-pane" id="python104">
    <pre>
id = '97167'
api.delete('/zones/pull/'+id+'/zoneshields.json')</pre>
  </div>
  <div class="tab-pane" id="perl104">
    <pre>
my $id = 123502;
$api->delete("/zones/pull/" . $id . "/zoneshields.json");
</pre>
  </div>
  <div class="tab-pane" id="php104">
    <pre>
$id = '97167';
$api->delete('/zones/pull/'.$id.'/zoneshields.json')</pre>
  </div>
  <div class="tab-pane" id="node104">
    <pre>
var id = '96167'
api.delete('/zones/pull/' + id + '/zoneshields.json', function(err, response) {
  console.log('err', err, 'response', response)
})</pre>
  </div>
  <div class="tab-pane" id="csharp104">
    <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

api.Delete("/zones/pull/" + zoneID + "/zoneshields.json");
</pre>
  </div>
  <div class="tab-pane" id="response104">
    <pre>
{
  "code": 200
}</pre>
  </div>
</div>

# SSL Certificate API

## List Certificates

Returns a list of all certificates on the specified account

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/ssl.json</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`certificates` | An array of certificates for the given user |

### Code Samples

<ul class="nav nav-tabs" id="myTab106">
  <li class="active"><a href="#ruby106" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python106" data-toggle='tab'>Python</a></li>
  <li><a href="#perl106" data-toggle='tab'>Perl</a></li>
  <li><a href="#php106" data-toggle='tab'>PHP</a></li>
  <li><a href="#node106" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp106" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response106" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby106">
    <pre>
api.get('/ssl.json')</pre>
  </div>
  <div class="tab-pane" id="python106">
    <pre>
api.get('/ssl.json')</pre>
  </div>
  <div class="tab-pane" id="perl106">
    <pre>
$api->get("/ssl.json");
</pre>
  </div>
  <div class="tab-pane" id="php106">
    <pre>
$api->get('/ssl.json');</pre>
  </div>
  <div class="tab-pane" id="node106">
  <pre>
api.get('/ssl.json', callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="csharp106">
  <pre>
api.Get("/ssl.json");
</pre>
  </div>
  <div class="tab-pane" id="response106">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 1,
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "total": 1,
        "certificates": [
            {
                "id": "1234",
                "company_id": "42",
                "domain": "*.example.com",
                "zone_count": "5",
                "date_updated": "2013-05-15 17:33:09",
                "date_expiration": "2015-11-15",
                "ssl_cabundle": "",
                "globalsign": "0",
                "wilcard": "1",
                "ssl_crt": "-----BEGIN CERTIFICATE-----\n...-----END CERTIFICATE-----",
                "name": "auto_*.example.com_2015-11-15_2013-05-15:173309"
            }
        ]
    }
}</pre>
  </div>
</div>


## Create Certificate

Creates a new SSL Certificate on the specified account

<div class="heading">
<div class="url POST"><span class="http_method">POST</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/ssl.json</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`ssl_crt` | - | <span class="label important">required</span><br />length: text; | Certificate  |
`ssl_key` | - | <span class="label important">required</span><br />length: text | Certificate Private Key |
`ssl_cabundle` | - | length: text | Certificate Authority Intermediate Bundle |
`name` | auto_{domain}_{expiration}_{update} | length: 1-255 | Use descriptive name |


### Response Parameters

Parameter | Description |
--- | --- | ---
`ssl` | The information about the certificate (see List Certificates response)|


### Code Samples

<ul class="nav nav-tabs" id="myTab107">
  <li class="active"><a href="#ruby107" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python107" data-toggle='tab'>Python</a></li>
  <li><a href="#perl107" data-toggle='tab'>Perl</a></li>
  <li><a href="#php107" data-toggle='tab'>PHP</a></li>
  <li><a href="#node107" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp107" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response107" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby107">
    <pre>
params={"ssl_crt"=>"-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----","ssl_key"=>"-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----","ssl_cabundle"=>"-----BEGIN CERTIFICATE.....", "name"=>"Our *.example.com wildcard"}
api.post('/ssl.json',params )</pre>
  </div>
  <div class="tab-pane" id="python107">
    <pre>
params = array("ssl_crt": "-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----","ssl_key": "-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----","ssl_cabundle": "-----BEGIN CERTIFICATE.....", "name": "Our *.example.com wildcard");
api.post('/ssl.json',data=params )</pre>
  </div>
  <div class="tab-pane" id="perl107">
  <pre>
my @params = {ssl_crt => '-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----', ssl_key => '-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----","ssl_cabundle"=>"-----BEGIN CERTIFICATE.....", "name"=>"Our .example.com wildcard');
$api->post("/ssl.json", @params );
  </pre>
  </div>
  <div class="tab-pane" id="php107">
    <pre>
$params = array("ssl_crt"=>"-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----","ssl_key"=>"-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----","ssl_cabundle"=>"-----BEGIN CERTIFICATE.....", "name"=>"Our *.example.com wildcard");
$api->post('/ssl.json',$params );</pre>
  </div>
  <div class="tab-pane" id="node107">
  <pre>
api.post('/ssl.json', { ssl_crt:"-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----",ssl_key:"-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----",ssl_cabundle:"-----BEGIN CERTIFICATE.....",name:"Our *.example.com wildcard" }, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="csharp107">
  <pre>
var cert = "";
var key = "";
Console.Write("Zone id: \n");
int zoneId = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();
using (StreamReader sr = new StreamReader("cert.txt"))
{
cert = sr.ReadToEnd();               
}
using (StreamReader sr = new StreamReader("key.txt"))
{
key = sr.ReadToEnd();
}
var dat = "";
cert = "-----BEGIN CERTIFICATE-----\n" + cert + "\n-----END CERTIFICATE-----\n";
key = "-----BEGIN RSA PRIVATE KEY-----\n" + key + "\n-----END RSA PRIVATE KEY-----\n";

api.Post("/ssl.json", dat="ssl_crt=" + cert + "&ssl_key=" + key);
</pre>
  </div>
  <div class="tab-pane" id="response107">
    <pre>
{
    "code": 200,
    "data": {
        "current_page_size": 1,
        "page": 1,
        "page_size": "50",
        "pages": 1,
        "total": 1,
        "ssl": 
            {
                "id": "1234",
                "company_id": "42",
                "domain": "*.example.com",
                "zone_count": "5",
                "date_updated": "2013-05-15 17:33:09",
                "date_expiration": "2015-11-15",
                "ssl_cabundle": "",
                "globalsign": "0",
                "wilcard": "1",
                "ssl_crt": "-----BEGIN CERTIFICATE-----\n...-----END CERTIFICATE-----",
                "name": "Our *.example.com wildcard"
            }
    }
}</pre>
  </div>
</div>


## Get SSL Certificate

Gets a specific SSL certificate by the {ssl_id} parameter

<div class="heading">
<div class="url GET"><span class="http_method">GET</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/ssl.json/{ssl_id}</span></div>
</div>

### Response Parameters

Parameter | Description |
--- | --- | ---
`ssl` | The information about the certificate (see List Certificates response)|


### Code Samples

<ul class="nav nav-tabs" id="myTab108">
  <li class="active"><a href="#ruby108" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python108" data-toggle='tab'>Python</a></li>
  <li><a href="#perl108" data-toggle='tab'>Perl</a></li>
  <li><a href="#php108" data-toggle='tab'>PHP</a></li>
  <li><a href="#node108" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp108" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response108" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby108">
    <pre>
id = '1234'
api.get('/ssl.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python108">
    <pre>
id = '1234'
api.get('/ssl.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="perl108">
    <pre>
my $id = 1234;
$api->get("/ssl.json/" . $id);
</pre>
  </div>
  <div class="tab-pane" id="php108">
    <pre>
$id = '1234';
$api->get('/ssl.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node108">
  <pre>
var id = '1234'
api.get('/ssl.json/' + id, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="csharp108">
  <pre>
Console.Write("Zone ID: \n");
int zoneID = Convert.ToInt32(Console.ReadLine());

api.Get("/ssl.json/" + zoneID);
</pre>
  </div>
  <div class="tab-pane" id="response108">
    <pre>
{
    "code": 200,
    "data": {
       "ssl": 
            {
                "id": "1234",
                "company_id": "42",
                "domain": "*.example.com",
                "zone_count": "5",
                "date_updated": "2013-05-15 17:33:09",
                "date_expiration": "2015-11-15",
                "ssl_cabundle": "",
                "globalsign": "0",
                "wilcard": "1",
                "ssl_crt": "-----BEGIN CERTIFICATE-----\n...-----END CERTIFICATE-----",
                "name": "Our *.example.com wildcard"
            }
        }
    }
}</pre>
  </div>
</div>


## Update SSL Certificate

Updates an SSL Certificate specified by the {user_id} parameter 

<div class="heading">
<div class="url PUT"><span class="http_method">PUT</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/users.json/{user_id}</span></div>
</div>

### Accepted Request Parameters

Parameter | Default Value | Validation | Description |
--- | --- | --- | --- | ---
`ssl_crt` | - | <span class="label important">required</span><br />length: text; | Certificate  |
`ssl_key` | - | <span class="label important">required</span><br />length: text | Certificate Private Key |
`ssl_cabundle` | - | length: text | Certificate Authority Intermediate Bundle |
`name` | auto_{domain}_{expiration}_{update} | length: 1-255 | Use descriptive name |
`force` | 0 | digit | Override check to ensure that the domain has not changed | 

### Response Parameters

Parameter | Description |
--- | --- | ---
`ssl` | The information about the certificate (see List Certificates response)|


### Code Samples

<ul class="nav nav-tabs" id="myTab109">
  <li class="active"><a href="#ruby109" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python109" data-toggle='tab'>Python</a></li>
  <li><a href="#perl109" data-toggle='tab'>Perl</a></li>
  <li><a href="#php109" data-toggle='tab'>PHP</a></li>
  <li><a href="#node109" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp109" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response109" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby109">
  <pre>
id = '1234'
params={"ssl_crt"=>"-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----","ssl_key"=>"-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----","ssl_cabundle"=>"-----BEGIN CERTIFICATE.....", "name"=>"Our *.example.com wildcard"}
api.put('/ssl.json/'+id,params)
</pre>
  </div>
  <div class="tab-pane" id="python109">
    <pre>
api.put('/ssl.json/'+id,params={ 'ssl_crt':"-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----",'ssl_key':"-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----",'ssl_cabundle':"-----BEGIN CERTIFICATE.....",'name':"Our new *.example.com wildcard" })</pre>
  </div>
  <div class="tab-pane" id="perl109">
    <pre>
my $id = 1234;
my @params = ('ssl_crt=-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----', 'ssl_key=-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----","ssl_cabundle"=>"-----BEGIN CERTIFICATE.....', 'name=Our.example.com-wildcard');
$api->put("/ssl.json/" . $id, @params);
</pre>
  </div>
  <div class="tab-pane" id="php109">
    <pre>
$id = '1234';
$params = array("ssl_crt"=>"-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----","ssl_key"=>"-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----","ssl_cabundle"=>"-----BEGIN CERTIFICATE.....", "name"=>"Our *.example.com wildcard");
$api->put('/ssl.json/'.$id,$params);</pre>
</div>
  <div class="tab-pane" id="node109">
  <pre>
var id = '1234'
api.put('/ssl.json/' + id, { ssl_crt:"-----BEGIN CERTIFICATE-----\n{ you certificate info }\n-----END CERTIFICATE-----",ssl_key:"-----BEGIN RSA PRIVATE KEY-----\n{ your private key info}\n-----END RSA PRIVATE KEY-----",ssl_cabundle:"-----BEGIN CERTIFICATE.....",name:"Our *.example.com wildcard" }, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="csharp109">
  <pre>
var cert = "";
var key = "";
Console.Write("Zone id: \n");
int zoneId = Convert.ToInt32(Console.ReadLine());
Console.Write("Zone type: \n");
string type = Console.ReadLine();
using (StreamReader sr = new StreamReader("cert.txt"))
{
cert = sr.ReadToEnd();               
}
using (StreamReader sr = new StreamReader("key.txt"))
{
key = sr.ReadToEnd();
}

var dat = "";
cert = "-----BEGIN CERTIFICATE-----\n" + cert + "\n-----END CERTIFICATE-----\n";
key = "-----BEGIN RSA PRIVATE KEY-----\n" + key + "\n-----END RSA PRIVATE KEY-----\n";

api.Put("/ssl.json/" + zoneID, dat="ssl_crt=" + cert + "&ssl_key=" + key);
</pre>
  </div>
  <div class="tab-pane" id="response109">
    <pre>
{
    "code": 200,
    "data": {
      "ssl": 
            {
                "id": "1234",
                "company_id": "42",
                "domain": "*.example.com",
                "zone_count": "5",
                "date_updated": "2013-05-15 17:33:09",
                "date_expiration": "2015-11-15",
                "ssl_cabundle": "",
                "globalsign": "0",
                "wilcard": "1",
                "ssl_crt": "-----BEGIN CERTIFICATE-----\n...-----END CERTIFICATE-----",
                "name": "Our *.example.com wildcard"
            }
    }
}</pre>
  </div>
</div>


## Delete SSL Certificiate

Deletes a certificate specified by the {ssl_id} parameter

<div class="heading">
<div class="url DELETE"><span class="http_method">DELETE</span>
<span class="path">https://rws.maxcdn.com/{companyalias}/ssl.json/{ssl_id}</span></div>
</div>


### Code Samples

<ul class="nav nav-tabs" id="myTab110">
  <li class="active"><a href="#ruby110" data-toggle='tab'>Ruby</a></li>
  <li><a href="#python110" data-toggle='tab'>Python</a></li>
  <li><a href="#perl110" data-toggle='tab'>Perl</a></li>
  <li><a href="#php110" data-toggle='tab'>PHP</a></li>
  <li><a href="#node110" data-toggle='tab'>Node</a></li>
  <li><a href="#csharp110" data-toggle='tab'>.NET/C#</a></li>
  <li><a href="#response110" data-toggle='tab'>Response</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="ruby110">
    <pre>
id = '1234'
api.delete('/ssl.json/'+id)</pre>
  </div>
  <div class="tab-pane" id="python110">
    <pre>
id = '1234'
api.delete('/ssl.json/'+id)</pre>
  </div>
    <div class="tab-pane" id="perl110">
      <pre>
my $id = 1234;
$api->delete("/ssl.json/" . $id);</pre>
    </div>
  <div class="tab-pane" id="php110">
    <pre>
$id = '1234';
$api->delete('/ssl.json/'.$id);</pre>
  </div>
  <div class="tab-pane" id="node110">
  <pre>
var id = '1234'
api.delete('/ssl.json/' + id, callback)
function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}</pre>
  </div>
  <div class="tab-pane" id="csharp110">
  <pre>
Console.Write("Zone id: \n");
int zoneId = Convert.ToInt32(Console.ReadLine());

api.Delete("/ssl.json/" + zoneId);
</pre>
  </div>
  <div class="tab-pane" id="response110">
    <pre>
{
  "code":200
}</pre>
  </div>
</div>
