import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Logger } from 'nestjs-pino';

@Resolver()
export class UsersResolver {
	constructor(private readonly logger: Logger) {}

	@Query(() => String)
	async hello() {
		this.logger.warn('Test');
		return 'hello';
	}
}
