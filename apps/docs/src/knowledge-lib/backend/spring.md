# Spring

[IntelliJ IDEA 2025 创建 SpringBoot 项目](https://blog.csdn.net/m0_63325890/article/details/149111366)


1、PO：Persistant Object(持久对象)，基本上，PO对象中的属性就是对应着数据库中表的字段，加上⼀些get和set⽅法的组成。例：个⼈信息表中分别有：id，name，age，sex，birthday则PO对象中的属性有：id，name，age，sex，birthday{“id”: 1,“name”: “张三”,“age”: 20,“sex”: “男”,“birthday”: “2000-03-24”}
2、BO：Business Object(业务对象)，相⽐于PO来说，BO的信息则是在PO信息的基础上进⾏扩充，也可以理解为多个PO对象的信息按照业务流程必要的拼凑在⼀起形成的对象。例：个⼈信息表中分别有：id，name，age，sex，birthday个⼈学历表中分别有：id，school，educational_background按照个⼈信息表与学历表进⾏关联，将⽤户的个⼈信息集合在⼀起。则BO对象中可以是两个表信息的组合：id，name，age，sex，birthday，school，educational_background{“id”: 1,“name”: “张三”,“age”: 20,“sex”: “男”,“birthday”: “2000-03-24”,“school”:“⽯家庄铁道⼤学”,“educational_background”:“本科”}
3、DTO：Data Transfer Object(数据传输对象)，顾名思义，dto的作⽤是传递数据。但是我们按照业务流程处理得到的数据，并不是全部都要进⾏显⽰，或者并不能完全都按照当前形势进⾏展⽰，按照业务要求，还要在已有数据的基础上进⾏过滤删减。例：个⼈信息表中分别有：id，name，age，sex，birthday我们可能只需要⽤户的名字、年龄和性别来显⽰，像⽣⽇这样的信息就没有必要进⾏传输了，所以对已有的数据进⾏删减，只传输需要的信息。则DTO对象中的信息为：id，name，age，sex{“id”: 1,“name”:“张三”,“age”: 20,“sex”: “男”}
4、VO：Value Object(值对象)，可以理解为展⽰要⽤的数据，传递到前端页⾯上，直接进⾏展⽰。为了保证数据可以直接展⽰使⽤，就要对数据进⾏处理。例：个⼈信息表中分别有：id，name，age，sex，birthday我们需要展⽰的是⽤户的当前状态，像年龄和性别则没有必要分开显⽰，可以进⾏合并。则vo对象中的信息为：id，name，type，birthday{“id”: 1,“name”: “张三”,“type”:“少年”,“birthday”: “2000-03-24”}
5、DAO：Data Access Object(数据访问对象)，存储访问数据库完成数据处理操作的⽅法的对象。

<img src="https://img2024.cnblogs.com/blog/340444/202511/340444-20251119120244179-2027392169.png">