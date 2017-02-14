(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('HomeCtrl', HomeCtrl);
    HomeCtrl.$inject = ['$scope', '$http'];

    function HomeCtrl($scope, $http) {
        $http.get('/getTotalSiteAccessGraph')
            .success(function(res) {
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable(res);

                    var options = {
                        title: 'Total Site Access',
                        curveType: 'function',
                        legend: { position: 'bottom' },
                        explorer: {
                            maxZoomOut: 2,
                            keepInBounds: true
                        }
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('graph1'));

                    chart.draw(data, options);
                }
            })
            .error(function(err) {

            })


        $http.get('/getTotalVolumnGraph')
            .success(function(res) {
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable(res);

                    var options = {
                        title: 'Total Macid Volumn',
                        curveType: 'function',
                        legend: { position: 'bottom' },
                        explorer: {
                            maxZoomOut: 2,
                            keepInBounds: true
                        }
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('graph2'));

                    chart.draw(data, options);
                }
            })
            .error(function(err) {

            })


            $http.get('/getTotalOutInGraph')
            .success(function(res) {
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable(res);

                    var options = {
                        title: 'Total Outgoing Incoming Data by Ip',
                        curveType: 'function',
                        legend: { position: 'bottom' },
                        explorer: {
                            maxZoomOut: 2,
                            keepInBounds: true
                        }
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('graph3'));

                    chart.draw(data, options);
                }
            })
            .error(function(err) {

            })
    }



})();
