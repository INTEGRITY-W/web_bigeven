$(function () {
    getUserInfo();

    var layer = layui.layer

    $('#btnExit').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {

            localStorage.removeItem('token');
            location.href = '/code_own/login.html';

            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0)
                return layui.layer.msg('用户信息错误');

            // 调用渲染用户头像的函数
            rederAvatar(res.data);
        },
        // complete: function (res) {
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/code_own/login.html';
        //     }
        // }
    })


}

// 渲染用户头像的函数
function rederAvatar(res) {
    var name = res.username || res.nickname;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染用户头像
    if (res.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}