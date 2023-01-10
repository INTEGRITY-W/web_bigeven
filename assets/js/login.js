$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 自定义校验规则
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value)
                return '两次密码输入不一致'
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser',
            data,
            function (res) {
                if (res.status !== 0)
                    return layer.msg(res.message)
                else
                    layer.msg('注册成功');
                // 模拟人的点击事件
                $('#link_reg').click()
            })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                // 将登录成功得到的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到主页
                location.href = '/code_own/index.html'
            }
        })
    })
})