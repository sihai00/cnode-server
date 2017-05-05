# cnode-server
把node作为中间层，对cnode社区公开的api数据进行操作后存入mongodb中，再返回处理后的数据

## mongo
* show dbs : 查找当前所有数据库
* use (dbName) : 使用当前数据库（例如：use cnode-server）
* db.dropDatabase() : 删除当前使用的数据库

* show tables : 查找当前表
* db.(tableName).insert() : 写入数据（如果当前表不存在，创建该表且插入数据）
* db.(tableName).remove() : 删除数据
* db.(tableName).find() : 查找当前table表的所有数据（例如：db.artlist.find({a:1})）
* db.(tableName).find().limit(n) : 查找数据（限制数量n）
* db.(tableName).find().skip(n) : 查找数据（过滤数量n）
* db.(tableName).find().sort() : 查找数据（排序）(例如sort({a:1}),以a排序)
* db.(tableName).find().update(v1, v2) : 更新数据（v1更新为v2）