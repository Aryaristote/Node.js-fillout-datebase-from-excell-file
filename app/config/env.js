const env = {
    database: 'kivugreen_dev',
    username: 'kgreen_dev_user',
    password: 'A6kd9JJiobQBUwPv',
    host: '176.223.133.127',
    dialect: 'mysql',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;