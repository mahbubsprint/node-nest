import { CreateUserDto } from './create-user.dto.js';

describe('CreateUserDtoTs', () => {
  it('should be defined', () => {
    expect(new CreateUserDto()).toBeDefined();
  });
});
