$(function() {
        getUserInfo()
        var layer = layui.layer
            //退出登录
        $('#logOut_btn').on('click', function() {
            layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
                //do something
                //清空本地储存中的token
                localStorage.removeItem('token')
                    //重新跳转到登录页
                location.href = '/login.html'
                    //关闭询问框
                layer.close(index);
            });
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        //成功才调用
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //渲染用户头像
            renderAvater(res.data)
        },
        //无论成功还是失败都会调用
        // complete: function(res) {
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空token 防止假token登录
        //         localStorage.removeItem('token')
        //             //强制跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvater(user) {
    //获取用户的名称
    var name = user.username || user.nickname
        //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').show()
        $('.text-avater').hide()
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide()
            //获取名称的第一个字母并且大写
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}