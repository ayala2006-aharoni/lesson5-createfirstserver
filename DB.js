let books = [
    {
        id: 1,
        name: "Isterak",
        code: 10,
        category: "regesh",
        price: 50,
        IsBorrow: false,
        borrows: []  // ריק
    },
    {
        id: 2,
        name: "World",
        code: 20,
        category: "metach",
        price: 50,
        IsBorrow: false,
        borrows: [101, 102]  // כבר מושאל
    },
    {
        id: 3,
        name: "my heart",
        code: 30,
        category: "regesh",
        price: 50,
        IsBorrow: false,
        borrows: []  // ריק
    },
    {
        id: 1,
        name: "Isterak",
        code: 40,
        category: "regesh",
        price: 50,
        IsBorrow: false,
        borrows: [201]  // כבר מושאל
    }
]

let users = [
    {
        code: 1,
        nameuser: "ayala",
        email: "ayala14351@gmail.com",
        password: "1234",
        books: []  // ריק
    },
    {
        code: 2,
        nameuser: "ayala",
        email: "ayala14351@gmail.com",
        password: "12345",
        books: []  // ריק
    },
    {
        code: 3,
        nameuser: "ayala",
        email: "ayala14351@gmail.com",
        password: "123456",
        books: []  // ריק
    },
]

export default {
    books,
    users
  };