import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
	constructor() {}

	@Query(() => String)
	async hello() {
		return 'hello';
	}
}
