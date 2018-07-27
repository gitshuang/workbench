~ function(window) {

    var CAS_SERVER = "https://idtest.yyuap.com";

    window.yhtTest = function() {
        viewYhtUser(function() {
            window.location.href = CAS_SERVER + "/usercenter";
        }, CAS_SERVER + "/c.html");
    }
    window.yhtTest1 = function() {
        viewYhtUser(CAS_SERVER + "/usercenter", CAS_SERVER + "/c.html");
    }
    window.viewYhtUser = function(destUrl, htmlUrl, option) {
        if ($('#yhtAppendCover').length) {
            $('#yhtAppendCover').remove();
        }
        var _option = option || {};
        var right = _option.right || 0,
            left = _option.left || 0,
            top = _option.top || '194px',
            bottom = _option.bottom || 0;
        var iframeHtml = '<div id="yhtAppendCover" style="display:none;"><div id="yhtAppendIframe" style="background-color: transparent;opacity: 1;text-align:center;position: fixed;' +
            'right: ' + right + ';top: ' + top + ';left:' + left + ';bottom:' + bottom + ';z-index:1050;">' +
            '<div style="width: 400px;min-height:342px;margin: auto;background: #fff;">' +
            '<div style="position:relative;border-bottom:2px solid #eee;padding-bottom:7px;padding-top: 23px;margin-bottom: 10px;font-family:PingFangSC-Medium;font-weight:600;font-size:20px;color:#636363;text-align:left;">' +
            // '<span id="toyhtFrameReg" href="#yhtFrameReg" style="cursor:pointer!important;margin-left: 90px;margin-right: 100px;text-decoration: none;color: #636363;padding: 8px 10px;border-bottom: 4px solid #e50113;" >注册</span>' +
            // '<span id="toyhtFrameLogin"  href="#yhtFrameLogin" style="cursor:pointer!important;text-decoration: none;color: #636363;padding: 8px 10px;border-bottom: 4px solid transparent;" >登录</span>' +
            '<span id="yhtModalClose" style="position:absolute;right:10px;top:6px;font-size: large;color:#9B9B9B;cursor:pointer!important;" >×</span></div>' +
            // '<div  id="yhtFrameReg" >' +
            // '<iframe id="yhtregIframe" frameborder=0 border=0 width=320 height=296 marginheight=0 marginwidth=0 scrolling=no ></iframe></div>' +
            '<div  id="yhtFrameLogin">' +
            '<iframe id="yhtloginIframe" frameborder=0 border=0 width=320 height=356 marginheight=0 marginwidth=0 scrolling=no ></iframe></div>' +
            '</div></div>' +
            '<div style="background-color: #000;opacity: 0.2;position: fixed;right:0;left:0;top:0px;bottom:0;z-index:1040;"></div></div>';
        $('body').append(iframeHtml);
        $('#yhtFrameLogin').show();
        $('#toyhtFrameLogin').css('color', '#e50113').css('borderBottomColor', '#e50113');
            

        $("#yhtModalClose").mouseover(function() {
            $("#yhtModalClose").css("color", "#e50113");
        });
        $("#yhtModalClose").mouseout(function() {
            $("#yhtModalClose").css("color", "#9B9B9B");
        });
        $('#yhtModalClose').click(function() {
            // $('#yhtAppendCover').hide();
            $('#yhtAppendCover').remove();
        });
        window.yhtLoginCallbackFun = destUrl;
        window.yhthtmlUrl = htmlUrl;
        yhtloginCheckAjax(destUrl);
    }
    window.yhtjsonpcallback = function(respon) {
        var destUrl = yhtLoginCallbackFun;
        if (respon.status == 1 && 　!respon.needrelogin) {
            if (destUrl instanceof Function) {
                destUrl();
            } else {
                // window.location.href = destUrl;
                yhtOpenTarget(destUrl);
            }
        } else {
            var _destUrl = destUrl;
            if (destUrl instanceof Function) {
                _destUrl = 'isfunction';
            }
            var yhtssoisloginUrl = CAS_SERVER + '/cas/iframeloginredirect';
            var yhthtmlUrl = window.yhthtmlUrl;
            var loginUrl = CAS_SERVER + '/cas/login?sysid=market&mode=light&service=' + encodeURIComponent(yhtssoisloginUrl + '?yhtrealservice=' + _destUrl + '&yhtdesturl=' + yhthtmlUrl);
            var regUrl = CAS_SERVER + '/register?sysid=market&mode=light&yhtrealservice=' + _destUrl;
            $('#yhtloginIframe').attr('src', loginUrl);
            // $('#yhtregIframe').attr('src', regUrl);
            $('#yhtAppendCover').show();
        }
    }
    window.yhtloginCheckAjax = function(destUrl) {
        $.ajax({
            url: CAS_SERVER + '/cas/checkislogin',
            dataType: 'jsonp',
            data: null,
            jsonp: 'yhtssoislogincallback',
            async: false,
            success: function(respon) {

            }.bind(this),
            error: function(xhr, status, err) {
                // console.error(status, err.toString());
            }.bind(this)
        });

    }
    window.yhtloginsuccess = function(realservice, loginurl) {
        if (realservice == 'isfunction') {
            if (window.yhtLoginCallbackFun instanceof Function) {
                window.yhtLoginCallbackFun(loginurl);
            }
        } else {
            if (loginurl) {
                realservice = loginurl + '&service=' + realservice;
            }
            // window.location.href = realservice;
            yhtOpenTarget(realservice);
        }
        if ($('#yhtAppendCover').length) {
            $('#yhtAppendCover').remove();
        }
    }
    window.yhtOpenTarget = function(realservice) {
        // window.location.href = realservice;
        if ($('#yhtOpenTargetAnchor').length) {
            $('#yhtOpenTargetAnchor').remove();
        }
        $('body').append('<a id="yhtOpenTargetAnchor" target="_blank" href="' + realservice + '" style="height:0;width:0;"><span>test</span></a>');
        //$('#yhtOpenTargetAnchor span').trigger('click');
        document.getElementById("yhtOpenTargetAnchor").click();

    }
}(window);