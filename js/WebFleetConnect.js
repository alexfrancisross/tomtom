// TomTom Webfleet Connect WDC 
// Version: v1.0
// Authour: Alex Ross
// Date: 07/09/2017

var actions = [{
    'action': 'showVehicleReportExtern',
    'type': 'all'
}, {
    'action': 'showObjectReportExtern',
    'type': 'all'
}, {
    'action': 'showContracts',
    'type': 'all'
}, {
    'action': 'showObjectGroups',
    'type': 'all'
}, {
    'action': 'showOrderReportExtern',
    'type': 'all'
}, {
    'action': 'showMessages',
    'type': 'all'
}, {
    'action': 'showDriverReportExtern',
    'type': 'all'
}, {
    'action': 'showOptiDriveIndicator',
    'type': 'all'
}, {
    'action': 'showDriverGroups',
    'type': 'all'
}, {
    'action': 'showDriverGroupDrivers',
    'type': 'all'
}, {
    'action': 'showAddressReportExtern',
    'type': 'all'
}, {
    'action': 'showAddressGroupReportExtern',
    'type': 'all'
}, {
    'action': 'showAddressGroupAddressReportExtern',
    'type': 'all'
}, {
    'action': 'showEventReportExtern',
    'type': 'all'
}, {
    'action': 'getEventForwardConfigs',
    'type': 'all'
}, {
    'action': 'getEventForwardConfigRecipients',
    'type': 'eventforwardconfiguid'
}, {
    'action': 'showTripReportExtern',
    'type': 'all'
}, {
    'action': 'showTracks',
    'type': 'object'
}, {
    'action': 'showLogbook',
    'type': 'all'
}, {
    'action': 'showLogbookHistory',
    'type': 'object'
}, {
    'action': 'showWorkingTimes',
    'type': 'driver'
}, {
    'action': 'showIdleExceptions',
    'type': 'all'
}, {
    'action': 'getObjectKPIs',
    'type': 'object'
}, {
    'action': 'getDriverKPIs',
    'type': 'driver'
}, {
    'action': 'getRemainingDrivingTimesEU',
    'type': 'all'
}, {
    'action': 'showIOReportExtern',
    'type': 'all'
}, {
    'action': 'showAccelerationEvents',
    'type': 'driver'
}, {
    'action': 'showSpeedingEvents',
    'type': 'driver'
}, {
    'action': 'getCrashLog',
    'type': 'object'
}, {
    'action': 'showSettings',
    'type': 'all'
}, {
    'action': 'showAccountOrderStates',
    'type': 'all'
}, {
    'action': 'showAccountOrderAutomations',
    'type': 'all'
}, {
    'action': 'getAccountStatusMessages',
    'type': 'all'
}, {
    'action': 'getStatusMessages',
    'type': 'object'
}, {
    'action': 'getVehicleConfig',
    'type': 'all'
}, {
    'action': 'showUsers',
    'type': 'all'
}, {
    'action': 'showMaintenanceSchedules',
    'type': 'all'
}, {
    'action': 'showMaintenanceTasks',
    'type': 'all'
}, {
    'action': 'getArchivedReportList',
    'type': 'all'
}, {
    'action': 'getReportList',
    'type': 'all'
}, {
    'action': 'getAreas',
    'type': 'all'
}, {
    'action': 'getAreaPoints',
    'type': 'area'
}, {
    'action': 'getAreaAssignments',
    'type': 'area'
}, {
    'action': 'getAreaSchedules',
    'type': 'area'
}, {
    'action': 'getLocalAuxDeviceConfig',
    'type': 'all'
}, {
    'action': 'getRemoteAuxDeviceConfig',
    'type': 'all'
}];

var range_patterns = [{
    'name': 'd0',
    'value': 'Today'
}, {
    'name': 'd-1',
    'value': 'Yesterday'
}, {
    'name': 'd-2',
    'value': 'Two days ago'
}, {
    'name': 'd-3',
    'value': 'Three days ago'
}, {
    'name': 'd-4',
    'value': 'Four days ago'
}, {
    'name': 'd-5',
    'value': 'Five  days ago'
}, {
    'name': 'd-6',
    'value': 'Six days ago'
}, {
    'name': 'w0',
    'value': 'Current week'
}, {
    'name': 'w-1',
    'value': 'Last week'
}, {
    'name': 'w-2',
    'value': 'Two weeks ago'
}, {
    'name': 'w-3',
    'value': 'Three weeks ago'
}, {
    'name': 'wf0',
    'value': 'Floating week, current day and previous seven days'
}, {
    'name': 'wf-1',
    'value': 'Floating week, the seven calendar days before wf0'
}, {
    'name': 'wf-2',
    'value': 'Floating week, the seven calendar days before wf-1'
}, {
    'name': 'wf-3',
    'value': 'Floating week, the seven calendar days before wf-2'
}, {
    'name': 'm0',
    'value': 'Current month'
}, {
    'name': 'm-1',
    'value': 'Last month'
}, {
    'name': 'm-2',
    'value': 'Two months ago'
}, {
    'name': 'm-3',
    'value': 'Three months ago'
}];

// Define our Web Data Connector
(function() {
    window.onload = function() {

        var sel = document.getElementById('actionList');
        for (var i = 0; i < actions.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = actions[i].action;
            opt.value = actions[i].action;
            sel.appendChild(opt);
        }

        var sel = document.getElementById('range_patternList');
        for (var i = 0; i < range_patterns.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = range_patterns[i].value + ' (' + range_patterns[i].name + ')';
            opt.value = range_patterns[i].name;
            opt.label = range_patterns[i].value + ' (' + range_patterns[i].name + ')';
            sel.appendChild(opt);
        }
    };

    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function(schemaCallback) {
        // Create a promise to get our table schema info as well, just like above
        var tables = new Promise(function(resolve, reject) {
            //loadJSON("StandardConnectionsTableInfoData", function(json) {
            //var action='showVehicleReportExtern';
            //var action='showObjectReportExtern';
            var connectionData = JSON.parse(tableau.connectionData);
            var action = connectionData.action;
            var tableList = [];

            loadSchema(action, 'csv', function(data) {
                //var obj = JSON.parse(data);
                var lines = data.split(/\r\n|\r|\n/);

                //display error if only one line in data
                if (lines.length == 1) {
                    //alert(lines[0]);
                    tableau.log("Webfleet Error: " + data);
                    tableau.abortWithError("Webfleet Error: " + data);
                    return;
                }

                // creates columns by splitting first line of csv
                var columnnames = lines[0].split(';')
                var lineone = lines[1].split(';')
                //var columnnames = Object.keys(obj[0]);
                //console.log(columnnames);
                var typeList = [];
                for (var i = 0; i < columnnames.length; i++) {
                    var val = lineone[i].replace(/"/g, "");
                    var type = "";
                    if (isNaN(val)) {
                        type = "string";
                    } else {
                        type = "float";
                    }
                    typeList.push(type);
                }
                //console.log(typeList);
                var columns = []
                for (var i = 0; i < columnnames.length; i++) {
                    //example format  { "id" : "userId", "alias" : "User ID", "dataType" : "int"    },
                    column = {};
                    column["id"] = columnnames[i].replace(/"/g, "");
                    column["alias"] = columnnames[i].replace(/"/g, "");
                    column["dataType"] = typeList[i];
                    //column = '{ "id" : "'+columnnames[i]+'", "alias" : "'+columnnames[i]+'", "dataType" : "' + typeList[i]+'" }'	
                    columns.push(column);
                }
                //console.log(columns);

                //example format
                var table = {};
                table["id"] = action;
                table["alias"] = action;
                table["columns"] = columns;

                //'{ "id" : "' + action +'", "alias" : "'+ action+ '","columns" :' + columns +' }';
                //console.log(table);

                //console.log(table);
                tableList.push(table);

                resolve(tableList);
            })
        });

        // Once all our promises are resolved, we can call the schemaCallback to send this info to Tableau
        Promise.all([tables]).then(function(data) {
            console.log('calling schemaCallback');
            schemaCallback(data[0]); //,data[7],data[8],data[9]);
        });
    }

    myConnector.getData = function(table, doneCallback) {
        // Load our data from the API. Multiple tables for WDC work by calling getData multiple times with a different id
        // so we want to make sure we are getting the correct table data per getData call
        //loadJSON(table.tableInfo.id, function(data) {
        var action = table.tableInfo.id;
        loadSchema(action, 'json', function(data) {
            var obj = JSON.parse(data);
            var tableData = [];
            var columnnames = table.tableInfo.columns;
            // Iterate through the data and build our table
            for (var i = 0; i < obj.length; i++) {
                tableEntry = {};
                var ref = obj[i];
                // We can use this handy shortcut because our JSON column names match our schema's column names perfectly
                //Object.getOwnPropertyNames(ref).forEach(function(val, idx, array){
                //  tableEntry[val] = ref[val];
                //});
                for (var x = 0; x < columnnames.length; x++) {
                    var val = columnnames[x].id;
                    if (typeof ref[val] == "undefined") {
                        tableEntry[val] = '';
                    } else {
                        tableEntry[val] = ref[val];
                    }
                }
                tableData.push(tableEntry);
            }
            // Once we have all the data parsed, we send it to the Tableau table object
            table.appendRows(tableData);
            doneCallback();
        });
    }
    tableau.registerConnector(myConnector);

    function loadSchema(action, outputformat, cb) {
        var connectionData = JSON.parse(tableau.connectionData);
        var baseurl = 'https://csv.business.tomtom.com/extern?lang=en&range_pattern=' + connectionData.range_pattern + '&apikey=' + connectionData.apikey + '&account=' + connectionData.account + '&username=' + connectionData.username + '&password=' + connectionData.password;

        var obj = new XMLHttpRequest();
        obj.overrideMimeType("application/json");
        var url = baseurl + '&outputformat=' + outputformat + '&action=' + action;

        if (action == 'getDriverKPIs' || action == 'getObjectKPIs') {
            url = url + '&kpinames=tripstats,ecostats,optidrive,speedingevents,drivingevents,orders';
        }

        var type = '';
        for (i = 0; i < actions.length; i++) {

            if (actions[i].action == action) {
                type = actions[i].type;
            }
        }

        if (type == 'object') {
            url = url + '&objectno=' + connectionData.objectno;
        }
        if (type == 'driver') {
            url = url + '&driverno=' + connectionData.driverno;
        }
        if (type == 'area') {
            url = url + '&areano=' + connectionData.areano;
        }

        console.log(url);
        obj.open("GET", url, true);

        obj.onreadystatechange = function() {
            if (obj.readyState == 4 && obj.status == "200") {
                //format response
                cb(obj.responseText);
            }
        }
        obj.send(null);
    }
})();

function actionSelected(element) {
	document.getElementById('objectno').innerHTML = "";
	document.getElementById('driverno').innerHTML = "";
	document.getElementById('areano').innerHTML = "";
    var action = element.options[element.selectedIndex].value;
    var type = '';

    for (i = 0; i < actions.length; i++) {
        if (actions[i].action == action) {
            type = actions[i].type;
        }
    }

    if (type == 'object') {
        var url = 'https://csv.business.tomtom.com/extern?lang=en&range_pattern=d0&apikey=' + document.getElementById('apikey').value + '&account=' + document.getElementById('account').value + '&username=' + document.getElementById('username').value + '&password=' + document.getElementById('password').value + '&action=showObjectReportExtern&outputformat=json';
        var obj = new XMLHttpRequest();
        obj.overrideMimeType("application/json");
        console.log(url);
        obj.open("GET", url, true);

        obj.onreadystatechange = function() {
            if (obj.readyState == 4 && obj.status == "200") {
                //format response
                data = JSON.parse(obj.responseText);
                var sel = document.getElementById('objectno');
                for (var i = 0; i < data.length; i++) {
                    var opt = document.createElement('option');
                    opt.innerHTML = data[i].objectno + ' (' + data[i].objectname + ')';
                    opt.value = data[i].objectno;
                    opt.label = data[i].objectno + ' (' + data[i].objectname + ')';
                    sel.appendChild(opt);
                }
            }
        }
        obj.send(null);

    } else if (type == 'driver') {
        {

            var url = 'https://csv.business.tomtom.com/extern?lang=en&range_pattern=d0&apikey=' + document.getElementById('apikey').value + '&account=' + document.getElementById('account').value + '&username=' + document.getElementById('username').value + '&password=' + document.getElementById('password').value + '&action=showDriverReportExtern&outputformat=json';
            var obj = new XMLHttpRequest();
            obj.overrideMimeType("application/json");
            console.log(url);
            obj.open("GET", url, true);

            obj.onreadystatechange = function() {
                if (obj.readyState == 4 && obj.status == "200") {
                    //format response
                    data = JSON.parse(obj.responseText);
                    var sel = document.getElementById('driverno');
                    for (var i = 0; i < data.length; i++) {
                        var opt = document.createElement('option');
                        opt.innerHTML = data[i].driverno + ' (' + data[i].name1 + ')';
                        opt.value = data[i].driverno;
                        opt.label = data[i].driverno + ' (' + data[i].name1 + ')';
                        sel.appendChild(opt);
                    }
                }
            }
            obj.send(null);
        }

    } else if (type == 'area') {
        {
            var url = 'https://csv.business.tomtom.com/extern?lang=en&range_pattern=d0&apikey=' + document.getElementById('apikey').value + '&account=' + document.getElementById('account').value + '&username=' + document.getElementById('username').value + '&password=' + document.getElementById('password').value + '&action=getAreas&outputformat=json';
            var obj = new XMLHttpRequest();
            obj.overrideMimeType("application/json");
            console.log(url);
            obj.open("GET", url, true);

            obj.onreadystatechange = function() {
                if (obj.readyState == 4 && obj.status == "200") {
                    //format response
                    data = JSON.parse(obj.responseText);
                    var sel = document.getElementById('areano');
                    for (var i = 0; i < data.length; i++) {
                        var opt = document.createElement('option');
                        opt.innerHTML = data[i].areano + ' (' + data[i].areaname + ')';
                        opt.value = data[i].areano;
                        opt.label = data[i].areano + ' (' + data[i].areaname + ')';
                        sel.appendChild(opt);
                    }
                }
            }
            obj.send(null);
        }

    } 
}

function send() {
    var action = document.getElementById('actionList').value;
    var connectionData = {};
    connectionData.action = action;
    connectionData.apikey = document.getElementById('apikey').value;
    connectionData.account = document.getElementById('account').value;
    connectionData.password = document.getElementById('password').value;
    connectionData.username = document.getElementById('username').value;
    connectionData.range_pattern = document.getElementById('range_patternList').value;
    connectionData.objectno = document.getElementById('objectno').value;
    connectionData.driverno = document.getElementById('driverno').value;
    connectionData.areano = document.getElementById('areano').value;
    tableau.connectionData = JSON.stringify(connectionData); // Use this variable to pass data to your getSchema and getData functions

    var temp = ''
    if (connectionData.objectno != '') {
        temp = ' for objectno: ' + document.getElementById('objectno').value;
    }
    if (connectionData.driverno != '') {
        temp = ' for driverno: ' + document.getElementById('driverno').value;
    }
    if (connectionData.areano != '') {
        temp = ' for areano: ' + document.getElementById('areano').value;
    }
    tableau.connectionName = action + temp; // This will be the data source name in Tableau
    tableau.submit();
}