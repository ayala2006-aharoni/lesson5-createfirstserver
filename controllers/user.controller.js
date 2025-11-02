import DB from '../DB.js';
const {books,users} = DB;

function getalluser(req, res) {
    const result = users;
    res.json(result);
}
export {getalluser}

export const signUpUser = (req, res) => {
    const newUser = req.body;
    newUser.code = users.length + 1;
    newUser.books = [];
    users.push(newUser);
    res.json({ message: "User registered!", user: newUser });
};
export const login= (req,res)=>
{
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) res.json({ message: "Logged in!", user });
    else res.status(401).json({ message: "Invalid credentials" });

}
