DBQuery.shellBatchSize = 300;
db.grouponcareers.aggregate([{ $group : { _id : "$location", count: {$sum:1} } }]);
db.grouponcareers.find({ title : { $in : [/VP/, /Vice President/ ]}});
db.grouponcareers.find({ title : { $regex : /Director/i}});
db.grouponcareers.find({ title : { $in : [/Lead/i, /Manager/i ]}});
db.grouponcareers.find({ title : { $in : [/SR/, /Senior/ ]}});
db.grouponcareers.find({ title : { $in : [/I/, /II/, /III/, /Software Engineer/i, /IV/ ], $nin : [/SR/, /Senior/, /Lead/i, /Manager/i, /Director/i ]}});
db.grouponcareers.find({ title : { $nin : [/VP/, /Vice President/ , /Director/, /SR/, /Senior/, /I/, /II/, /III/, /Software Engineer/i, /IV/ ]}});

db.grouponcareers.aggregate([
  { $match : { title : { $in : [/Lead/i, /Manager/i ]} } },
  { $group : { _id : "$location", count: {$sum:1} } }
  ]);
