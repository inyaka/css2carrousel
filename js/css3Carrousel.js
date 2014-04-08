
(function($) {
    var settings = {
        items:3,
        width: {},
        el:{}


    };

    var methods = {
        init: function()
        {

            methods.config();
            settings.el.ul.width(settings.itemContainer);
            settings.el.root.find('.c3c-container').width(settings.width.container);
            settings.el.root.on('click','.c3c-button-prev',methods.movePrev);
            settings.el.root.on('click','.c3c-button-next',methods.moveNext);
            if(settings.el.root.hasClass('c3c-steps')) methods.drawSteps();

        },
        movePrev: function(){
            if(settings.el.ul.hasClass('c3c-stop-amimate')) return false;
            settings.position  =  settings.el.ul.position();
            if(0>settings.position.left){
                settings.el.ul.css({left: '+='+settings.width.container})
            }else{
                settings.el.ul.css({left: 0});                
            }
            methods.stopAnimation();
        },
        moveNext: function(){
            if(settings.el.ul.hasClass('c3c-stop-amimate')) return false;
            settings.position  =  settings.el.ul.position();
            if((settings.itemContainer*-1)<=(settings.position.left -( settings.width.container + settings.width.item))){
                settings.el.ul.css({left: '-='+settings.width.container})                
            }else{
                settings.el.ul.css({left: 0});
            }
            methods.stopAnimation();
        },
        drawSteps: function(){
            li = '';
            $.each(settings.el.ul.find('.c3c-item'),function(i,val){
                val = $(val);
                id= 'c3c-item-'+i;
                val.attr('id',id);
                li += '<li><a href="#'+id+'">'+val.attr('title')+'</a></li>';
            });
            settings.el.root.prepend('<ul class="c3c-steps-nav">'+li+'</ul>');
            settings.el.navSteps = settings.el.root.find('.c3c-steps-nav')
            methods.goToStep();
        },
        goToStep: function(){
            var firstChildLeft = $(settings.el.navSteps.find('li:eq(0) a').attr('href')).position().left;
            settings.el.navSteps.find('li a').click(function(e){
                e.preventDefault();
                var href = $(this).attr('href');
                var p = $(href).position();
                settings.el.ul.css({left:-p.left+firstChildLeft});
            })

        },
        startAnimation: function(){
            settings.el.ul.removeClass('c3c-stop-amimate');
        },
        stopAnimation: function(){        
            settings.el.ul.addClass('c3c-stop-amimate');
            setTimeout(methods.startAnimation,settings.animateTime);
        },
        config: function(){
            settings.el.container =  settings.el.root.find('.c3c-container');
            settings.el.ul =  settings.el.container.find('ul');
            settings.el.prev = settings.el.root.find('.c3c-button-prev');
            settings.el.item = settings.el.root.find('.c3c-item');
            settings.el.item.fontSize = parseInt(settings.el.item.css('font-size'));

            settings.position  =  settings.el.ul.position();

            settings.animateTime =  methods.css3Time2Milsecons(settings.el.ul.css('transition-duration'));
            
            settings.wordSpacing = parseInt(settings.el.ul.css('word-spacing'));
            settings.width.button = settings.el.prev.outerWidth(true);
            settings.width.el = settings.el.root.width();
            settings.width.item =   settings.el.item.outerWidth(true)+ (settings.wordSpacing*2);
            settings.itemsContainer = Math.floor((settings.width.el-(settings.width.button*2))/ settings.width.item);
            if(settings.itemsContainer==0) settings.itemsContainer = 1;
            settings.width.moveContainer = settings.itemsContainer * settings.width.item;
            settings.width.container = settings.width.moveContainer     ;
            settings.items =  settings.el.item.length;
            settings.itemContainer = settings.width.item * settings.items;
        },
        css3Time2Milsecons: function(cssTime) {
            var regex = /^([\-\+]?[0-9]+(\.[0-9]+)?)(m?s)$/;
            var matches = regex.exec(cssTime);
            if (matches === null) {
                throw new Error('Invalid CSS time');
            }
            return parseFloat(matches[1]) * (matches[3] === 's' ? 1000 : 1);
        }
    };
    $.fn.css3Carrousel = function(options){
        settings.el.root = $(this);
        settings = $.extend({}, settings, options);
        methods.init.apply();
        // document.settings = settings;
        return this;
   }
})(jQuery);