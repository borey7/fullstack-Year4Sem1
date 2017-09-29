$(function () {
    $('#search').click(function () {
        var place = $('#place').val();
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=d11905fc73236c8a47518163c1ca0f1c";
        $.get(url, function (data) {
            var row = "<div id='showweather'><p>"+data['name']+"</p><h3>" + data['main']['temp'] + " C </h3><br>" +
                "<h5>" + data['weather'][0]['main'] + "<br>" + data['weather'][0]['description'] + "</h5></div>";

            $("#showweather").replaceWith(row);
        });
    });
})