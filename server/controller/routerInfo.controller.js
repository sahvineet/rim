var RouterInfo = require('../models/routerInfo.model'),
    moment = require('moment');



module.exports.getTotalSiteAccessGraph = function(req, res) {
    // return res.json({});
    RouterInfo.find({})
        .exec(function(err, data) {
            if (err)
                return console.log(err);
            var myData = JSON.parse(JSON.stringify(data));
            var resArr = [];
            resArr.push(['Date', 'Count'])

            myData.forEach(function(ele, ind) {
                var tempArr = []
                tempArr[0] = moment.unix(ele.timestamp).format('MM/DD/YYYY hh:mm a')
                tempArr[1] = 0;
                var webAccessCount = 0;
                if ('webinfo' in ele) {
                    for (var k in ele.webinfo) {
                        if (ele.webinfo.hasOwnProperty(k)) {
                            ++webAccessCount;
                        }
                    }
                    tempArr[1] = webAccessCount;
                }
                resArr.push(tempArr)
            })
            res.json(resArr);
        })
}

module.exports.getTotalVolumnGraph = function(req, res) {

    RouterInfo.find({})
        .exec(function(err, data) {
            if (err)
                return console.log(err);
            var myData = JSON.parse(JSON.stringify(data));
            var resArr = [];
            var allMacInfoObj = {};
            resArr.push(['MacId', 'Volumn'])
            myData.forEach(function(ele, ind) {
                var tempArr = []
                var webAccessCount = 0;
                if ('dnsinfo' in ele) {
                    for (var macid in ele.dnsinfo) {
                        // console.log()
                        if ('dnsinfo' in ele.dnsinfo[macid]) {
                            if (!allMacInfoObj.hasOwnProperty(macid))
                                allMacInfoObj[macid] = [];
                            allMacInfoObj[macid].push(ele.dnsinfo[macid]['dnsinfo'].length)
                        }

                    }
                }
            })

            for (var macId in allMacInfoObj) {
                console.log(allMacInfoObj[macId]);
                var volumn = allMacInfoObj[macId].reduce(function(a, b) {
                    return a + b
                }, 0);
                resArr.push([macId, volumn])
            }
            res.json(resArr);
        })
}


module.exports.getTotalOutInGraph = function(req, res) {

    RouterInfo.find({})
        .exec(function(err, data) {
            if (err)
                return console.log(err);
            var myData = JSON.parse(JSON.stringify(data));
            var resArr = [];
            var allMacInfoObj = {};
            resArr.push(['MacId', 'Outgoing', 'Incoming'])
            myData.forEach(function(ele, ind) {
                var tempArr = []
                var webAccessCount = 0;
                if ('webinfo' in ele) {
                    for (var macid in ele.webinfo) {
                        // console.log()
                        if ('bwinfo' in ele.webinfo[macid]) {

                            if (!allMacInfoObj.hasOwnProperty(ele.webinfo[macid].ip))
                                allMacInfoObj[ele.webinfo[macid].ip] = [];

                            var tempOut = 0;
                            var tempIn = 0;
                            ele.webinfo[macid]['bwinfo'].forEach(function(ele, index) {
                                tempOut += ele.out;
                                tempIn += ele.in;
                            })

                            allMacInfoObj[ele.webinfo[macid].ip].push([tempOut, tempIn]);
                        }

                    }
                }
            })




            for (var ip in allMacInfoObj) {

                var tempOut = 0;
                var tempIn = 0;
                allMacInfoObj[ip].forEach(function(ele, index) {
                    tempOut += ele[0];
                    tempIn += ele[1];
                })

                resArr.push([ip, tempOut, tempIn])
            }
            console.log(resArr);
            res.json(resArr);
        })
}
