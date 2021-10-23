$(function() {
    //去注册的链接
    $('#link_reg').on('click', function() {
            $('.reg-box').show();
            $('.login-box').hide();
        })
        //去登录的链接
    $('#link_login').on('click', function() {
            $('.reg-box').hide();
            $('.login-box').show();
        })
        //自定义校验规则
        //导入layui的模块
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验两次密码是否相同
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val();
                if (value !== pwd) {
                    return '两次输入密码不一致！';
                }
            }
        })
        //监听注册的事件
    $('#reg_form').on('submit', function(e) {
            e.preventDefault();
            var data = { username: $('#reg_form [name=username]').val(), password: $('#reg_form [name=password]').val() };
            $.post(
                '/api/reguser', data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功！去登陆');
                    $('#link_login').click();
                }
            )
        })
        //监听登录的事件
    $('#login_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                //将获取到的token储存到本地储存中
                localStorage.setItem('token', res.token);
                location.href = '/index.html';

            }
        })
    })
})