import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(name: string, email: string) {
    const newId = this.users.length + 1;
    this.users.push({ id: newId, name, email });
    console.log(
      `User created: <span class="math-inline">\{name\} \(</span>{email}) with ID ${newId}`,
    );
  }
}
