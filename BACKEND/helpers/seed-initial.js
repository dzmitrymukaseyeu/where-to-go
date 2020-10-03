const fs = require('fs');
const path = require('path');
const appRootPath = require('app-root-path').path;
const isProd = process.argv.includes('--prod');
const dbDir = path.join(appRootPath, 'BACKEND/DB');

const initialUsers = isProd
    ? [{'firstName':'Дмитрий','lastName':'Мукасеев','email':'mukas180292@gmail.com','password':'$2b$10$GU8Ypmd6Tj1SoYZ48tmw6u9nCi9m2X0zubiWhee/scINPuTdXRvJO','createdEvents':['51dcce6bfa504a57147ef76834727c675da895a1','fe31d1c5e3fbf8adbf0abb64a8c646b5969dfe34'],'eventsToVisit':['51dcce6bfa504a57147ef76834727c675da895a1','fe31d1c5e3fbf8adbf0abb64a8c646b5969dfe34']},{'firstName':'Денис','lastName':'Дудинский','email':'dudik@gmail.com','password':'$2b$10$YpfuI1r8zGVWh9vdN.DHJO7O1F9A6Et5reepMdDss20wAqrLgdoVu','createdEvents':['91c797bae48ee79122f879e4ba0d93f6f9d934a5','0a1b5f83bb3a6d9770131d0e9765d5fd22133a8b'],'eventsToVisit':['91c797bae48ee79122f879e4ba0d93f6f9d934a5','0a1b5f83bb3a6d9770131d0e9765d5fd22133a8b']}]
    : [];
const initialEvents = isProd
    ? [{'title':'Концерт БИ-2','description':'Ищу компанию на концерт БИ-2 на стадионе Динамо. Иду на VIP-Фан сектор. ','date':'2020-09-12T18:00','type':'Концерты','bgImage':'url(/assets/concert.jpg)','id':'51dcce6bfa504a57147ef76834727c675da895a1','creator':{'firstName':'Дмитрий','lastName':'Мукасеев','email':'mukas180292@gmail.com'},'visitors':[{'firstName':'Дмитрий','lastName':'Мукасеев','email':'mukas180292@gmail.com'}]},{'title':'Довод К.Нолана','description':'Если ты поклонник К.Нолана и считаешь трилогию о Темном рыцаре одним из лучших произведений кинемотографа, то приглашаю тебя на премьеру фильма Довод. Собираюсь пойти в кинотеатр Беларусь. ','date':'2020-09-10T19:00','type':'Кино','bgImage':'url(/assets/cinema.jpg)','id':'fe31d1c5e3fbf8adbf0abb64a8c646b5969dfe34','creator':{'firstName':'Дмитрий','lastName':'Мукасеев','email':'mukas180292@gmail.com'},'visitors':[{'firstName':'Дмитрий','lastName':'Мукасеев','email':'mukas180292@gmail.com'}]},{'title':'Беговая тренировка','description':'Старт ТЦ Столица.\nПриходите чуть раньше, если вам нужно успеть переодеться.\nТренировки рассчитаны на любой уровень подготовки.\n','date':'2020-09-02T19:00','type':'Активности','bgImage':'url(/assets/active.jpg)','id':'91c797bae48ee79122f879e4ba0d93f6f9d934a5','creator':{'firstName':'Денис','lastName':'Дудинский','email':'dudik@gmail.com'},'visitors':[{'firstName':'Денис','lastName':'Дудинский','email':'dudik@gmail.com'}]},{'title':'Комедия Ревизор ','description':'Купаловский театр. Стоимость билетов от 6 рублей.','date':'2020-09-27T19:00','type':'Спектакли','bgImage':'url(/assets/show.jpg)','id':'0a1b5f83bb3a6d9770131d0e9765d5fd22133a8b','creator':{'firstName':'Денис','lastName':'Дудинский','email':'dudik@gmail.com'},'visitors':[{'firstName':'Денис','lastName':'Дудинский','email':'dudik@gmail.com'}]}]
    : [];

const seedInitial = () => {
    !fs.existsSync(dbDir) && fs.mkdirSync(dbDir);

    try {
        fs.readFileSync(dbDir + '/users.json');
    } catch {
        fs.writeFileSync(dbDir + '/users.json', JSON.stringify(initialUsers))
    }
    
    try {
        fs.readFileSync(dbDir + '/events.json');
    } catch {
        fs.writeFileSync(dbDir + '/events.json', JSON.stringify(initialEvents));
    }
    
    if (isProd) {
        // running seed 
    }
};

module.exports = seedInitial;