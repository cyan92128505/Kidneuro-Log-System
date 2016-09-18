
/*
 * GET home page.
 */
var fs = require('fs');
var path = require('path');
var XlsxWriter = require('xlsx-writestream');
var nodeThinkGear = require('node-neurosky');



var neurosky_data = {
	timestamp: new Date(),
	attention: 0,
	meditation: 0,
	delta: 0,
	theta: 0,
	lowAlpha: 0,
	highAlpha: 0,
	lowBeta: 0,
	highBeta: 0,
	lowGamma: 0,
	highGamma: 0,
	poorSignalLevel: 0
};

var tgClient = nodeThinkGear.createClient({
	appName:'NodeThinkGear',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});

var today = new Date();
var ex_year = today.getUTCFullYear();
var ex_month = today.getUTCMonth()+1;
var ex_date = today.getUTCDate();
var ex_hour = today.getHours();
var ex_min = today.getMinutes()+1;
var xlex_filename = '';
var file_url = '';

var neuroskylog_switch = false;

var writer = {};


exports.index = function(req, res){
	res.render('index');
};


exports.test = function(req, res){
	res.render('test', { title: 'Test page' });
};

exports.getData = function(req, res){
	res.send(neurosky_data);
};

exports.logs = function(req, res){
	if(!neuroskylog_switch){
		console.log("Logging Now!!! Server_uninit_State="+neuroskylog_switch);
		var kid_name = req.query.kid_name;
		xlex_filename = kid_name+"_"+ex_year+"-"+ex_month+"-"+ex_date+"("+ex_hour+"："+ex_min+")"+".xlsx"
		file_url = path.dirname(process.execPath)+"\\logs\\"+xlex_filename;
		writer = new XlsxWriter(file_url, {});
		writer.getReadStream().pipe(fs.createWriteStream(file_url));
		writer.addRow(neurosky_data);
		neuroskylog_switch = true;
		tgClient.on('data',function(data){
			if(data){
				neurosky_data.attention = data.eSense.attention;
				neurosky_data.meditation = data.eSense.meditation;
				neurosky_data.delta = data.eegPower.delta;
				neurosky_data.theta = data.eegPower.theta;
				neurosky_data.lowAlpha = data.eegPower.lowAlpha;
				neurosky_data.highAlpha = data.eegPower.highAlpha;
				neurosky_data.lowBeta = data.eegPower.lowBeta;
				neurosky_data.highBeta = data.eegPower.highBeta;
				neurosky_data.lowGamma = data.eegPower.lowGamma;
				neurosky_data.highGamma = data.eegPower.highGamma;
				neurosky_data.poorSignalLevel = data.poorSignalLevel;
				neurosky_data.timestamp = new Date();
				writer.addRow(neurosky_data);
			}else{
				neurosky_data.timestamp = new Date();
			}
		});

		tgClient.connect();
		res.render('logs');
	}else{
		console.log("Logging Now!!! Server_uninit_State="+neuroskylog_switch);
		res.render('logs');
	}
};

exports.savelog = function(req, res){
	writer.finalize();
	res.render('savelog',{ log_file: "Save in "+file_url });
};