
const getAll = "SELECT * FROM user";
const addUser = "INSERT INTO user SET ?";
const deleteUser= 'DELETE FROM user WHERE id =?';
const getUser = 'SELECT * FROM user WHERE id =?';
const updateUser = 'UPDATE user SET ? WHERE id =?';
module.exports = {getAll,addUser,deleteUser,getUser,updateUser};
