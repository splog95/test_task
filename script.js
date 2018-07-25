var LIST_COMPONENT = function (options) {
    var self = {
        _options: {
            idProperty: 'id', // Дефолт значение
            target: 'body', // QuerySelector блока в который рисуем
            list: []
        }
    };

    self.init = function (opts) {
        // Функция инициализации
        this._options.list = opts.list;
        this._options.idProperty = opts.idProperty;
        this._options.target = opts.target;
    }

    self.drawByBlock = function (field) {
        // печать блоками
        var target = $('body').find(this._options.target);
        var items = prepareToPrint(self._options.list, field);
        for (var key in items) {
            if (!items.hasOwnProperty(key)) continue;
            // Генерируем блок
            var el = drawBlock(items[key]);
            // Встраиваем в ДОМ-дерево
            target.append(el);
        }
    };

    function drawItem(item) {
        // Вернет ДОМ-элемент для нашего объекта JSON.
        var el = $('<div/>');
        el.attr('data-id', item.id);
        el.addClass('person-contact')
        el.get(0).innerText = item.name + ' ' + item.secondname;
        return el.get(0);
    }
    function drawBlock(item) {
        // Вернет ДОМ-элемент Блока для нашего объекта JSON.
        var block = $('<div/>');
        block.addClass('block_class');
        var header = $('<div/>');
        header.addClass('sticky')
        header.get(0).innerText = item.block_title;
        block.append(header);
        item.items.forEach(function (item) {
            block.append(drawItem(item));
        });
        return block;
    }

    function prepareToPrint(items, field) {
        var prepared_items = {};
        var att;
        items.forEach(function (item) {
            attr = get_priznak(item,field);
            if (prepared_items[attr]) {
                prepared_items[attr].items.push(item);
            }
            else {
                prepared_items[attr] = {
                    block_title: attr,
                    items: [item]
                };
            }
        });
        function get_priznak(elem, field) {
            return elem[field].toUpperCase()[0];
        }
        return prepared_items;
    }

    // Биндим draw на self, чтобы всегда в контексте был self
    self.drawByBlock.bind(self);
    // Вызываем инит внутри.
    self.init.call(self, options);
    return self;
};
$(document).ready(function () {
    var list = new LIST_COMPONENT({
        idProperty: 'id',
        target: '#list',
        list: [{
            id: 1,
            name: 'Иван',
            secondname:'Иванов'
        }, {
            id: 1,
            name: 'Степан',
            secondname:'Петров'
        },{
            id: 1,
            name: 'Петр',
            secondname:'Сидоров'
        },{
            id: 1,
            name: 'Сергей',
            secondname:'Курилов'
        },{
            id: 1,
            name: 'Роман',
            secondname:'Зобнин'
        },{
            id: 1,
            name: 'Андрей',
            secondname:'Аршавин'
        },{
            id: 1,
            name: 'Антон',
            secondname:'Кузьмин'
        }]
    });
    //list.drawByBlock(); 
    $('#name_btn').on('click',function(){
        list.drawByBlock('name')
    });

    $('#second_name_btn').on('click', function(){
        list.drawByBlock('secondname')
    });
    $('#clear').on('click', function(){
        $( ".block_class" ).remove();
    });

})
