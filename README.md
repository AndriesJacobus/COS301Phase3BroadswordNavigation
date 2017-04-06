# COS301Phase3BroadswordNavigation
COS 301 Team Broadsword navigation

<table>
  <tr>
    <th>Surname</th>
    <th>Name</th>
    <th>Student Number</th>
  </tr>
  <tr>
    <td>Bondjobo</td>
    <td>Jocelyn</td>
    <td>u13232852</td>
  </tr>
  <tr>
    <td>du Plooy</td>
    <td>Andries</td>
    <td>u15226183</td>
  </tr>
  <tr>
    <td>Brijlal</td>
    <td>Yashvir</td>
    <td>u14387744</td>
  </tr>
  <tr>
    <td>Jones</td>
    <td>Keanan</td>
    <td>u13036892</td>
  </tr>
  <tr>
    <td>Nxumalo</td>
    <td>Banele</td>
    <td>u12201911</td>
  </tr>
  <tr>
    <td>van Schalkwyk</td>
    <td>John</td>
    <td>u14307317</td>
  </tr>
</table>

The Broadsword team will be responsible for the implementation of the Web Navigation system.

<br/>
<h2><b>How to compile:</b></h2>

<ol>
	<li>Start MongoDB</li>
	<li>Run navigationLocal.js in main branch directory</li>
	<li>Navigate to "Nav Node Server" directory and run index.js to start server</li>
</ol>

<h3><b>Compile notes:</b></h3>
<h4>Example code has been given on how the other modules can communicate with Navigation and how Navigation expects them to communicate back.</h4>
<br/>
<br/>
Running a full demo with only the examples can be done simply by using the following steps:</h4>

<ol>
	<li>Start an nsq server by using makefile command "make test-comms"</li>
	<li>Start "Nav Node Server > index.js"</li>
	<li>Start "Nav Node Server > nsqExampleAccess.js"</li>
	<li>Start "Nav Node Server > nsqExampleGIS.js"</li>
</ol>

<b>Note: Whenever index.js is terminated via the command prompt, a new terminal should be opened and the index.js file should be run again from scratch.</b>
