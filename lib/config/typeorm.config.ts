export const typeOrmConfig = {
	type: process.env.DATABASE_TYPE as any,
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true
};
