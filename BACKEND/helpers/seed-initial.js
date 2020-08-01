const fs = require('fs');
const isProd = process.argv.includes('--prod');
const dbDir = './BACKEND/DB';

const seedInitial = () => {
    !fs.existsSync(dbDir) && fs.mkdirSync(dbDir);

    try {
        fs.readFileSync(dbDir + '/users.json');
    } catch {
        fs.writeFileSync(dbDir + '/users.json', '[]');
    }
    
    try {
        fs.readFileSync(dbDir + '/events.json');
    } catch {
        fs.writeFileSync(dbDir + '/events.json', '[]');
    }
    
    if (isProd) {
        // running seed 
    }
};

module.exports = seedInitial;