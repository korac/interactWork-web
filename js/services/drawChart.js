app.service('drawChart', function(){
	


	this.draw = function(userdata){
		var labout = [];
		var data1 = [];
		var user = userdata.interactions_in_time;

		for(var i = 0; i < user.length; i++){
			data1.push(user[i].count);
			
			var date = user[i].key.split(/\//);
			date = [ date[1], date[0], date[2] ].join('/');
			labout.push(date);
		}

		
		//Na izlazu tribamo imat: data1 popunjen sa nulama
		//popunit datume koji fale za labout
		
		Date.prototype.addDays = function(days) {
		    var dat = new Date(this.valueOf())
		    dat.setDate(dat.getDate() + days);
		    return dat;
		}
 
		function getDates(startDate, stopDate) {
		    var dateArray = new Array();
		    var currentDate = startDate;
		    while (currentDate <= stopDate) {
		        var day = currentDate.getDate()
		        var month = currentDate.getMonth()+1
		        var year = currentDate.getFullYear()
		        dateArray.push(month+"/"+day+"/"+year )
		        currentDate = currentDate.addDays(1);
		    }
		    return dateArray;
		}
		
		//FULL YEAR DATES ARRAY 
		var dateArray = getDates(new Date("January 1, 2015 00:00:00"), new Date("December 31, 2015 00:00:00"));



		//Genetaring user data for whole year
		var dataout = [];
		var counter = 0;
		for(var i = 0; i < labout.length; i++){
			var j = counter;
			for(j; j < dateArray.length; j++){
				if(Date.parse(labout[i]) === Date.parse(dateArray[j])){
					dataout.push(data1[i]);
					counter++;
					break;
				}else{
					dataout.push(0);
					counter++;
				}				
			}
		}

		for(var i = dataout.length; i < dateArray.length; i++){
			dataout.push(0);
		}

		var display = {
			toData: dataout,
			toLabels: dateArray
		}

		return display;
	}
});
