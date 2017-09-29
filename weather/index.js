$(function () {
    $('#search').click(function () {
        var place = $('#place').val();
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=d11905fc73236c8a47518163c1ca0f1c";
        $.get(url, function (data) {            
            if (data['cod'] == '200') {
                var row = "<div id='showweather'><p><strong>" +
                    data['name'] + "</strong><img src='http://openweathermap.org/img/w/" +
                    data['weather'][0]['icon'] + ".png'></p>" +
                    "<h3>" + (data['main']['temp'] * 0.1).toFixed(2) + " C </h3><br>" +
                    "<h5>" + data['weather'][0]['main'] + "<br>" + data['weather'][0]['description'] +
                    "</h5></div>";
                $("#showweather").replaceWith(row);

                var historyRow = "<tr><td>" +
                    "<strong>" + data['name'] + "</strong></td><td>" +
                    "<img src='http://openweathermap.org/img/w/" + data['weather'][0]['icon'] + ".png'></td><td>" +
                    (data['main']['temp'] * 0.1).toFixed(2) + "</td><td>" +
                    data['weather'][0]['main'] + "</td><td>" +
                    data['weather'][0]['description'] + "</td><td>" +
                    "</tr>";

                $('#searchhistory').append(historyRow);                
            }
            if(data['cod']=='404'){
                var result = "<div id='showweather'><p><strong>"+data['message']+"</strong></div>";
                $("#showweather").replaceWith(result);
            }
            $('#place').val("");
        });
    });
})
