# API для проекта Mesto.

##  Функционал

В проекте задействованы две сущности: пользователи и карточки. Схемы и модели созданы через `Mongoose` с валидируемыми полями. Все роуты, кроме логина и логаута, защищены мидлвэрей `auth`, которая проверяет Authorization и наличие в нем токена в приходящих запросах. Обращение к API происходит через роуты с валидацией запросов через `Joi` и `celebrate`. В контроллерах описана логика обработки запросов. Контроллер логина создает `JWT токен` сроком на неделю. В контроллере регистрации пользователя пароль хешеруется модулем `bcryptjs`. В проекте реализована централизованная обработка ошибок через конструкторы ошибок - конструкторы передаются в блоках catch через функцию next и далее в мидлвэр обработки ошибок в app.js. Для логгирования запросов и ошибок используется библиотека `Winston`.

## Стек

- HTML, CSS
- Javascript
- React
- Node
- Express
- MongoDB

##  Для запуска проекта необходимо

##### `npm i` – установить зависимости проекта

##### `npm start` – запуск devServer на http://localhost:3000/

##### `npm run build` – production сборка проекта

### **Ссылка на готовый бекенд: [Mesto-Express](https://api.glmesto.nomoredomains.nomoredomains.work)**

### Статус проекта

Проект завершён.



