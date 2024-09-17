var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/news', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/news.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/submit-login', function(req, res) {
    const { login, password } = req.query;
    if (login && password) {
        fs.appendFile('login_attempts.txt', `Login attempt: ${login} - ${password}\n`, function(err) {
            if (err) throw err;
            console.log('Login attempt recorded.');
        });
        res.send('<h2>Вход выполнен</h2><a href="/">Вернуться на главную</a>');
    } else {
        res.send('<h2>Ошибка: Все поля должны быть заполнены</h2><a href="/login">Попробовать снова</a>');
    }
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/register.html'));
});


app.get('/submit-register', function(req, res) {
    const { login, password, confirmPassword, email } = req.query;
    if (login && password && confirmPassword && email) {
        if (password === confirmPassword) {
            fs.appendFile('registration_attempts.txt', `Registration attempt: ${login} - ${password} - ${email}\n`, function(err) {
                if (err) throw err;
                console.log('Registration attempt recorded.');
            });
            res.send('<h2>Регистрация успешна</h2><a href="/">Вернуться на главную</a>');
        } else {
            res.send('<h2>Пароли не совпадают</h2><a href="/register">Попробовать снова</a>');
        }
    } else {
        res.send('<h2>Ошибка: Все поля должны быть заполнены</h2><a href="/register">Попробовать снова</a>');
    }
});

app.use(function(req, res) {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

app.listen(8080, function() {
    console.log('Server running on port 8080');
});
