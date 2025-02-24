# 依赖倒置原则

符合开闭原则：对新增开放，对修改关闭

依赖注入、工厂模式解决手动设置当前用哪一个具体底层实现的不足

依赖注入（Dependency Injection, DI）和工厂模式（Factory Pattern）是实现依赖倒置原则（Dependency Inversion Principle, DIP）的两种常见方式。依赖倒置原则是面向对象设计原则之一，强调高层模块不应依赖于低层模块，二者都应依赖于抽象。下面我们通过 JavaScript 代码示例来说明这两种模式如何帮助实现依赖倒置原则。

## 依赖注入（Dependency Injection, DI）

依赖注入是一种设计模式，通过**将依赖项从外部注入到类中**，而不是在类内部直接创建依赖项。这样可以减少类之间的耦合，使得类更加灵活和可测试。

假设我们有一个 UserService，它依赖于 UserRepository 来获取用户数据。我们可以通过依赖注入的方式将 UserRepository 注入到 UserService 中。

```js
// UserRepository.js
class UserRepository {
  getUsers() {
    return ['Alice', 'Bob', 'Charlie'];
  }
}

// UserService.js
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers() {
    return this.userRepository.getUsers();
  }
}

// 使用依赖注入
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

console.log(userService.getAllUsers()); // 输出: ['Alice', 'Bob', 'Charlie']
```

在这个例子中，UserService 不直接依赖于具体的 UserRepository 实现，而是通过构造函数接收一个 UserRepository 实例。这样，UserService 就可以与任何实现了 UserRepository 接口的类一起工作，符合依赖倒置原则。

## 工厂模式（Factory Pattern）

工厂模式是一种创建型设计模式，它提供了一种创建对象的方式，而无需指定具体的类。工厂模式可以帮助我们将**对象的创建逻辑与使用逻辑分离**，从而降低耦合。

假设我们有一个 Logger 接口，并且有多个不同的日志实现（如 ConsoleLogger 和 FileLogger）。我们可以使用工厂模式来创建这些日志实例。

```js
// Logger.js
class Logger {
  log(message) {
    throw new Error('Method not implemented');
  }
}

// ConsoleLogger.js
class ConsoleLogger extends Logger {
  log(message) {
    console.log(`Console: ${message}`);
  }
}

// FileLogger.js
class FileLogger extends Logger {
  log(message) {
    // 模拟将日志写入文件
    console.log(`File: ${message}`);
  }
}

// LoggerFactory.js
class LoggerFactory {
  static createLogger(type) {
    switch (type) {
      case 'console':
        return new ConsoleLogger();
      case 'file':
        return new FileLogger();
      default:
        throw new Error('Unknown logger type');
    }
  }
}

// 使用工厂模式
const logger = LoggerFactory.createLogger('console');
logger.log('This is a log message'); // 输出: Console: This is a log message
```

在这个例子中，LoggerFactory 负责创建具体的 Logger 实例。高层模块（如使用 Logger 的代码）不需要知道具体的 Logger 实现，只需要通过工厂获取 Logger 实例即可。这样，高层模块和低层模块都依赖于 Logger 抽象，符合依赖倒置原则。