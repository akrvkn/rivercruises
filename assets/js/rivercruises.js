//var ajax_url = '/assets/lib/data/mtf.php?format=json&section=rivercruises&own=true&loading=true&request=tours';
//var ajax_url = ajax_tours;
//var ajax_url = '/assets/lib/data/tours.txt';
var ajax_url = 'https://www.mosturflot.ru/assets/ajax/index.php?request=tours&own=true';
var booking_url = 'cruise-detailed?tour=';
var ru_RU = {
"processing": "Подождите...",
"search": "Поиск:",
"lengthMenu": "Показать _MENU_ записей",
"info": "Записи с _START_ до _END_ из _TOTAL_ записей",
"infoEmpty": "Записи с 0 до 0 из 0 записей",
"infoFiltered": "(отфильтровано из _MAX_ записей)",
"infoPostFix": "",
"loadingRecords": "Загрузка записей...",
"zeroRecords": "Записи отсутствуют.",
"emptyTable": "В таблице отсутствуют данные",
"paginate": {
"first": "Первая",
"previous": "Назад",
"next": "Вперёд",
"last": "В конец"
},
"aria": {
"sortAscending": ": активировать для сортировки столбца по возрастанию",
"sortDescending": ": активировать для сортировки столбца по убыванию"
}
};

var ships = {
    "207": "Александр Грин",
    "206": "Княжна Виктория",
    "200": "Андрей Рублёв",
    "247": "Россия",
    "14": "Василий Суриков",
    "36": "Илья Репин",
    "19": "Леонид Красин",
    "198": "Михаил Булгаков",
    "150": "Сергей Есенин",
    "139": "И.А.Крылов",
    "92": "Николай Карамзин",
    "5": "Сергей Образцов",
    "72": "Княжна Анастасия",
    "86": "Афанасий Никитин",
    "208": "Виссарион Белинский",
    "248": "Демьян Бедный",
    "83": "Иван Кулибин",
    "251": "Князь Владимир",
    "39": "Константин Коротков",
    "249": "Михаил Светлов",
    "242": "Н.В.Гоголь",
    "84": "Октябрьская Революция"

};


function compare(a,b) {
  if (a.tourstart < b.tourstart)
    return -1;
  if (a.tourstart > b.tourstart)
    return 1;
  return 0;
}

(function($){
	$(document).ready(function() {	    
		moment.locale('ru');
        

    
    /*** all cruises **/
    var rivercruises = $('#rivercruises').DataTable( {
		"dom": 'irft<"clear">p',
		"responsive": "true",
        "ajax": {
            "url": ajax_url,
            "dataSrc": function ( json ) {
		        var data = [];
				  for(var key in json.answer){
					if(json.answer.hasOwnProperty(key)){
                        json.answer[key].year = moment(json.answer[key].tourstart, moment.ISO_8601).format('YYYY');
                        json.answer[key].cruisestart = moment(json.answer[key].tourstart, moment.ISO_8601).format('YYYY <br>DD MMM <i>H:mm</i>,<br> dddd');
                        json.answer[key].tourfinish = moment(json.answer[key].tourfinish, moment.ISO_8601).format('YYYY <br>DD MMM <i>H:mm</i>,<br> dddd');
                        //json.answer[key].tourcabinsfree = json.answer[key].tourcabinsfree==false?'':json.answer[key].tourcabinsfree;
                        data.push(json.answer[key]);
					}
				  }
				  
                data.sort(compare);

				  return data;
				}
        },
        "language":ru_RU,
         "columns": [
                { "data": "year", "class": "m-row", responsivePriority: 6 },
                { "data": "shipname", "class": "m-row-ship", responsivePriority: 0 },
                { "data": "tourdays", "class": "m-row-days", responsivePriority: 0 },
                { "data": "cruisestart", "class": "m-row-date", responsivePriority: 0 },
                { "data": "tourfinish", "class": "m-row-date", responsivePriority: 1 },
                { "data": "tourroute", "class": "m-row", responsivePriority: 0 },
                { "data": "tourminprice", "class": "m-row-price", responsivePriority: 2 },
                { "data": "tourcabinsfree", "class": "m-row-cabins", responsivePriority: 3 },
                { "data": "tourdiscount",  responsivePriority: 7 },
                { "data": "tourholiday", responsivePriority: 8 },
                { "data": "shipown", responsivePriority: 9 }
            ],
        "columnDefs": [
            {
                "targets": [ 0,8,9,10 ],
                "visible": false,
                "searchable": true,
                "sortable": false
            },
            {
                "targets": [ 1, 2, 3, 4, 5, 6, 7],
                "visible": true,
                "sortable": false
            },
            {
                "render": function ( data, type, row ) {
                    //console.log(discounts.toString());
                    if ( row.tourdiscount>0 ) {
                        //console.log(row.tourid);
                        return "<span class='pricelist' title='Цены снижены'>"+row.tourminprice + "</span> <i title='Цены снижены'>руб.</i>&nbsp;<i class='fa fa-long-arrow-down' style='color:red' title='Цены снижены'></i><br><a class='button btn-small' href='"+ booking_url+row.tourid+'&ship='+row.shipid +"#edit-tariffs' target='_blank'>ПОДРОБНЕЕ</a>";
                    }else{
                        return "<span class='pricelist' title='Цены снижены'>"+row.tourminprice + "</span> <i>руб.</i><br><a class='button btn-small' href='"+ booking_url+row.tourid+'&ship='+row.shipid +"#edit-tariffs' target='_blank'>ПОДРОБНЕЕ</a>";
                    }
                },
                "targets": 6
            },
            {
                "render": function ( data, type, row ) {
                        if(ships[row.shipid]){
                            return '<img src="/assets/img/ships/150x80/'+ row.shipid +'.jpg" />'+ '<div class="shipname">' + row.shipname + '</div>';
                        }
                        return '<img src="/assets/img/ships/150x80/ship.jpg" />'+ '<div class="shipname">' + row.shipname + '</div>';

                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {

                    return '<div class="cruise-date">' + row.cruisestart + '</div>';

                },
                "targets": [3]
            },
            {
                "render": function ( data, type, row ) {

                    return '<div class="cruise-date">' + row.tourfinish + '</div>';

                },
                "targets": [4]
            },
            {
                "render": function ( data, type, row ) {
                    if(row.tourcabinsfree||row.tourcabinsfree===0){
                        return row.tourcabinsfree;
                    }

                    return '';

                },
                "targets": [7]
            }
        ],
        "fnRowCallback": function( nRow , aData) {
            $(nRow).on('click', function() {
                window.location.href = booking_url+aData.tourid+'&ship='+aData.shipid;
            });
        }
       
    } );

	} );
})(jQuery);
