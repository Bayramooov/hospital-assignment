const client = require('../config/db')

pool.connect((err: any) => {
   if(err) throw err;
})

const fetchAll = (SQL: String) => {
   pool.query(SQL, (err: any, data: []) => {
      if(err) throw err;
      console.log(data);
   })
}

module.exports = {
   fetchAll
}