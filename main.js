var index = 0;
$(document).ready(function(){
	getAQI();
	setTimeout(spinner, 1700);
});

function spinner() {
    var classNames = [
      {
        className: 'green',
        title: 'good'
      },
      {
        className: 'yellow',
        title: 'moderate'
      },
      {
        className: 'orange',
        title: 'unhealty'
      },
      {
        className: 'red',
        title: 'bad'
      },
      {
        className: 'black',
        title: 'hazardous'
      }
    ];

	var aqi_color = 0;
	if (index <= 50) {
		aqi_color = 0;
	}
	else if (index > 50 && index <= 100) {
		aqi_color = 1;
	}
	else if (index > 100 && index <= 150) {
		aqi_color = 2;
	}
	else if (index > 150 && index <= 300) {
		aqi_color = 3;
	}
	else {
		aqi_color = 4;
	}
    var svg = document.getElementsByClassName('gauge')[0],
        title = svg.getElementsByClassName('gauge_rating')[0];

    svg.className = "gauge " + classNames[aqi_color].className;
    title.innerHTML = classNames[aqi_color].title;
    svg.getElementsByClassName('gauge_index')[0].innerHTML = "API: " + index;     
}

function getAQI() {
    $.ajax({
        type:'GET',
        url:"https://api.breezometer.com/baqi/?location=zhengzhou,+henan,+china&fields=breezometer_aqi&key=37d4b9c6e1c24609a4edee8d3eda9522",
        success: function(data) {
            index = data.breezometer_aqi;
            index = (index/100)*500;
        },
        dataType : 'json',

    });
}