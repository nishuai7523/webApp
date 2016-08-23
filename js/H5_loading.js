var H5_loading = function  (images,firstPage) {
        
        var id = this.id;
        console.log(firstPage);
        if(this._images === undefined ){ //  第一次进入
        	
        	this.firstPage=firstPage;
        	
            this._images = ( images || [] ).length;//或许传进来的图片数组的长度
            this._loaded = 0 ;

            
            window[id] = this;      //   把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调


            for(s in images){//images中存放的是三个图片的地址
                var item = images[s];//单一图片地址
                var img = new Image;//创建图片对象

                img.onload = function(){ //	
                    window[id].loader(); //

                }
                img.src = item; // 图片对象需要加载的图片的地址
            }

            $('#rate').text('0%');
            return this;

        }else{

            this._loaded ++ ;
            $('#rate').text(  ( ( this._loaded / this._images  *100) >> 0 ) + '%' );

            if(this._loaded < this._images){
                return this;
            }
        }
        // alert(this._loaded);//结果是3，也就是图片都加载结束了，else中不追执行那个if的
                           //的return，而向下执行就是正常的初始化了。
        window[id] = null;

        this.el.fullpage({
            onLeave:function( index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function( anchorLink, index ) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();

        if(this.firstPage){
            $.fn.fullpage.moveTo( this.firstPage );
        }
}