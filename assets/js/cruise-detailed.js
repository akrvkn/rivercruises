function parseUrlQuery(q) {

    var res = '';
    if(location.search) {
        var pair = (location.search.substr(1)).split('&');
        for(var i = 0; i < pair.length; i ++) {
            var param = pair[i].split('=');
	    if(param[0]===q)
            res = decodeURIComponent(param[1]);
        }
    }

    return res;
}

var booking = 'https://booking.mosturflot.ru/rivercruises/booking/new/';

(function($){
	$(document).ready(function() {
        moment.locale('ru');
		var ship = parseUrlQuery('ship');
		var tour = parseUrlQuery('tour');
		$('#shipimg').attr('src', '/assets/img/ships/'+ship+'.jpg');
		$('#zakaz').on('click', function(e){
			e.preventDefault();
			window.location.href = booking + tour;
		});
		//var ship_url = 'lib/data/198.json';
		//var tour_url = 'lib/data/3711.json';
		var tariffs = [];
		var ship_url = 'https://www.mosturflot.ru/assets/ajax/index.php?request=ship&images=true&cabins=true&shipid='+ ship;
		var tour_url = 'https://www.mosturflot.ru/assets/ajax/index.php?request=tour&routedetail=true&tariffs=true&loading=true&tourid='+ tour;
		$.getJSON( tour_url, {
		    tourid: tour,
		    format: "json"
		  })
		  .done(function( data ) {
			  var tourstart = data.answer.tourstart;
			  var tourfinish = data.answer.tourfinish;
			  var table = '';
			  
			  $('.blog-post-title').text(data.answer.tourroute);
			  $('#cruise-date').append(moment(data.answer.tourstart, moment.ISO_8601).format('DD MMM YYYY'));
              $('#cruise-time').append(moment(data.answer.tourstart, moment.ISO_8601).format('H:mm'));
              $('#cruise-days').append('Дней: '+ data.answer.tourdays);
              $('#cruise-id').val('Заявка на круиз ' + data.answer.tourid ).attr('placeholder', 'Заявка на круиз ' + data.answer.tourid);
              //console.log(data.answer.tourid);
			  //var summary = '<li><label>Теплоход:</label>' + data.answer.shipname + '</li>' + '<li><label>Дней:</label>' + data.answer.tourdays + '</li>' + '<li><label>Отход:</label>' + moment(data.answer.tourstart, moment.ISO_8601).format('DD MMM <i>H:mm</i>') + '</li>' + '<li><label>Прибытие:</label>' + moment(data.answer.tourfinish, moment.ISO_8601).format('DD MMM <i>H:mm</i>') + '</li>' + '<li><label>Маршрут:</label>' + data.answer.tourroute + '</li>';
			  
			  $.each( data.answer.tourroutedetail, function( key, val ) {
				  		var arrival = val.arrival==false?'':moment(val.arrival, moment.ISO_8601).format('DD MMM <i>H:mm</i>');
						var departure = val.departure==false?'':moment(val.departure, moment.ISO_8601).format('DD MMM <i>H:mm</i>');
				    	table = table + '<tr><td>'+ (parseInt(key)+1) +'</td>' + '<td>'+ val.cityname +'</td>' + '<td>'+ arrival +'</td>' + '<td>'+ departure +'</td></tr>';
			  });

			  $('#schedule tbody').html(table);
			  $('#deckplan').attr('src', 'https://'+ data.answer.tourloadimage);
			  $('#deck_url').attr('href', 'https://'+ data.answer.tourloadimage);
			  
			  $.each( data.answer.tourtariffs, function(k, v){
				  tariffs.push({name: v.categoryname, price: v.categoryminprice});
			  });
			  
			  if(tariffs.length > 0){
                  getCabinsDesc(ship_url);
			  }
		 
		});
		
	function getCabinsDesc(ship_url) {
        $.getJSON(ship_url, {
            shipid: ship,
            format: "json"
        })
            .done(function (data) {
                var items = '';
                var thumb = '';
                //console.log(data.length);

                var cabins = '';
                var categories = [];

                $.each(data.answer.shipcabins, function (key, val) {
                    if ($.inArray(val.cabincategoryname, categories) == -1) {
                        categories.push(val.cabincategoryname);
                        $.each(tariffs, function (k, v) {

                            if (v.name == val.cabincategoryname) {
                                //tariffs[k].cabindesc = val.cabindesc;
                                var img = 'placehold.it/230x160';
                                var desc = val.cabindesc.replace(/<.*?>/g, '');
                                var clock = 0;
                                $.each(val.cabinimages, function (i, el) {
                                    //console.log(el);
                                    if (el.image && clock == 0) {
                                        img = el.image;
                                        clock++;
                                    }

                                });
                                //console.log(val.cabinimages[Object.keys(val.cabinimages)[0]].image);


                                cabins = cabins + '<li class="media">\
                                            <div class="media-left">\
                                            <a class="hover-effect popup-image" href="https://' + img + '"><img width="240" alt="64x64" src="https://' + img + '" alt="' + val.cabincategoryname + '"> </a>\
                                            </div>\
                                            <div class="media-body">\
                                            <h5  class="c-title" style="padding-top:10px;">' + val.cabincategoryname + '</h5>\
                                        <p><span>Мест: ' + val.cabinmainpass + '</span><br /><span class="price"><small>ЦЕНА</small><strong> ' + v.price + ' руб.</strong></span></p>\
                                        <p>' + desc + '</p>\
                                        </div>\
                                        </li>';

                            }
                        });

                    }
                });

                $('.media-list').html(cabins);
                $('#shipdesc').html('<h2>' + data.answer.shipname + '</h2>' + '<p>' + data.answer.shipdesc.replace(/<a\b[^>]*>(.*?)<\/a>/g,"") + '</p>');


            });
    }

	});
	})(jQuery);