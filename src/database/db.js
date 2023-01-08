const { Pool } = pg
export const connection = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '9695',
    database: 'Laboleria'
})