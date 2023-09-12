const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  user: process.env.USER,
  password : process.env.PASSWORD,
  database : 'prac1',
  port : 5432
});

const createEmployee = (req,res) => {
    const {name , email} = req.body

    pool.query('INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING * ', [name,email], (err,result) => {
        if (err){
            console.log(err,"this is error")
        }
        console.log(result,"this is result")
        res.status(200).json({
            msg : "employess created succesfully",
            data : result
        })
    })
}

const getEmployees = (req,res) => {
    pool.query('SELECT * FROM employees' ,(err,result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).json({msg:"got all the employees" , data: result.rows})
    })
}

const getOneEmployee = (req, res) => {
  const eid = parseInt(req.params.id)
  pool.query("SELECT * FROM employees employees WHERE id=$1",[eid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "got all the employees", data: result.rows });
  });
};

const updateOneEmployee = (req, res) => {
  const eid = parseInt(req.params.id)
  const { name, email } = req.body;

  pool.query("UPDATE employees SET name =$1 , email =$2 WHERE id=$3",[name,email,eid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "updated one employee", data: result.rows });
  });
};

const deleteOneEmployee = (req, res) => {
  const eid = parseInt(req.params.id)

  pool.query("DELETE FROM employees WHERE id=$1",[eid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "deleted one employee", data: result.rows });
  });
};

module.exports = {
  createEmployee,
  getEmployees,
  getOneEmployee,
  updateOneEmployee,
  deleteOneEmployee,
};