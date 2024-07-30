$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(function(){
        
        // $('.toggle_btn').on('click', function() {
        //     $(this).toggleClass('active');
            
        // });

        $('.toggle_btn').on('click', function() {
            if ($('header').hasClass('active')) {
            $('header').removeClass('active');
            } else {
            $('header').addClass('active');
            }
        });
        
        // #maskのエリアをクリックした時にメニューを閉じる
        $('#mask').on('click', function() {
            $('header').removeClass('active');
        });
        
        // リンクをクリックした時にメニューを閉じる
        $('.nav-menu a').on('click', function() {
            $('header').removeClass('active');
        });
        
    });

    $(window).scroll(function (){
        $('footer').each(function(){
            var footer = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= footer - windowHeight){
                $(".btn-reservation").addClass('fadeOut');// 画面内に入ったらfadeUpというクラス名を追記
            } else {
                $(".btn-reservation").removeClass('fadeOut');// 画面外に出たらfadeUpというクラス名を外す
            }
        });
    });

    /*=================================================
    ハンバーガ―メニューの色変える
    ===================================================*/
    var logo = jQuery('.toggle_btn span');
	var height = jQuery(window).height(); //ウィンドウの高さ
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 500) { //スクロールが画面の高さを越えたら
			logo.addClass('invert');
		} else { //スクロールが画面の高さを越えなければ
			logo.removeClass('invert');
		}
	});

    /*=================================================
    スムーズスクロール
    ===================================================*/

    $('a[href^="#"]').click(function(){
        // リンクを取得
        let href= $(this).attr("href");
        // ジャンプ先のid名をセット
        let target = $(href == "#" || href == "" ? 'html' : href);
        // トップからジャンプ先の要素までの距離を取得
        let position = target.offset().top -50;
        // animateでスムーススクロールを行う
        // 600はスクロール速度で単位はミリ秒
        $("html, body").animate({scrollTop:position}, 600, "swing");
        return false;
    });


    /*=================================================
    slider
    ===================================================*/
    $('.slider').slick({
		autoplay: true,//自動的に動き出すか。初期値はfalse。
		infinite: true,//スライドをループさせるかどうか。初期値はtrue。
		speed: 500,//スライドのスピード。初期値は300。
		slidesToShow: 3,//スライドを画面に3枚見せる
		slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
		prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
		nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
		centerMode: true,//要素を中央ぞろえにする
		variableWidth: true,//幅の違う画像の高さを揃えて表示
		dots: true,//下部ドットナビゲーションの表示
	});
});


/*=================================================
    スクロールで出す
===================================================*/

function fadeAnime(){

    // ふわっ
    $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
    }else{
    $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
    }
    });

    //左からふわっと
    $('.fadeLeftTrigger').each(function(){ //fadeUpTriggerというクラス名が
        var elemPos = $(this).offset().top;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight + 100){
        $(this).addClass('fadeLeft');// 画面内に入ったらfadeUpというクラス名を追記
        }else{
        $(this).removeClass('fadeLeft');// 画面外に出たらfadeUpというクラス名を外す
        }
        });

    //右からふわっと
    $('.fadeRightTrigger').each(function(){ //fadeUpTriggerというクラス名が
        var elemPos = $(this).offset().top;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight + 100){
        $(this).addClass('fadeRight');// 画面内に入ったらfadeUpというクラス名を追記
        }else{
        $(this).removeClass('fadeRight');// 画面外に出たらfadeUpというクラス名を外す
        }
        });

}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function (){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

/*=================================================
    時間差でフワッと順番に表示（ROOM）
===================================================*/


function delayScrollAnime() {
	var time = 0.2;//遅延時間を増やす秒数の値
	var value = time;
	$('.delayScroll').each(function () {
		var parent = this;					//親要素を取得
		var elemPos = $(this).offset().top;//要素の位置まで来たら
		var scroll = $(window).scrollTop();//スクロール値を取得
		var windowHeight = $(window).height();//画面の高さを取得
		var childs = $(this).children();	//子要素を取得
		
		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			$(childs).each(function () {
				
				if (!$(this).hasClass("fadeUp")) {//アニメーションのクラス名が指定されているかどうかをチェック
					
					$(parent).addClass("play");	//親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
					$(this).addClass("fadeUp");//アニメーションのクラス名を追加
					value = value + time;//delay時間を増加させる
					
					//全ての処理を終わったらplayを外す
					var index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		}else {
			$(childs).removeClass("fadeUp");//アニメーションのクラス名を削除
			value = time;//delay初期値の数値に戻す
		}
	})
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function (){
    delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述


/*=================================================
アコーディオンメニュー（QandA）
===================================================*/
//アコーディオンをクリックした時の動作
$('.title').on('click', function() {//タイトル要素をクリックしたら
	var findElm = $(this).next(".answer");//直後のアコーディオンを行うエリアを取得し
	$(findElm).slideToggle();//アコーディオンの上下動作
    
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去し
	}else{//それ以外は
		$(this).addClass('close');//クラス名closeを付与
	}
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function(){
	$('.accordion-area li:first-of-type .accordion').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
	$(".open").each(function(index, element){	//openクラスを取得
		var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
		$(Title).addClass('close');				//タイトルにクラス名closeを付与し
		var Box =$(element).children('.answer');	//openクラスの子要素boxクラスを取得
		$(Box).slideDown(500);					//アコーディオンを開く
	});
});

