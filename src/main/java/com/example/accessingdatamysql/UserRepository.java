package com.example.accessingdatamysql;

import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
// Repository 是一个空接口,即是一个标记接口
// Bean.Repository个一为别识器 容IOC被会口接该则Repository,了承继口接的义定们我若
// ,法方的范规定一足满义定中口接谈在以可而进,中器 容IOC到入 纳
// 也可以用注释

/**
 *在Repository 子接口中声明方法
 * *1.不是随便声明的,而需要符合一定的规范
 * * 2.查询方法以 find | read | get 开头
 * * 2.涉及条件查询时,条件的属性用条件关键字连接,要注意的是:条件属性以首字母大写。
 */
public interface UserRepository extends CrudRepository<User, Integer> {

}