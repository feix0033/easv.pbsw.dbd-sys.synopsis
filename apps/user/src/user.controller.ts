import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user')
  getUser(@Payload() data: { userId: number }) {
    console.log(`Received 'get_user' message with userId: ${data.userId}`);
    // 模拟从数据库获取用户信息
    const user = this.userService.getUserById(data.userId);
    return user; // 返回给客户端
  }

  // 处理 'create_user' 消息模式的事件
  @MessagePattern('create_user')
  createUser(@Payload() data: { name: string; email: string }) {
    console.log(`Received 'create_user' event with data:`, data);
    // 模拟创建用户
    this.userService.createUser(data.name, data.email);
    // 事件模式通常不返回数据，或者只返回一个确认
    return { status: 'User created successfully' };
  }
}
