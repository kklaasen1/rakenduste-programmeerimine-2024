const crypto = require('crypto');

let todos = [
    {
        id: "db300c39-8b80-47f1-80cf-1adb775b9587",
        title: "Complete project report",
        priority: 1,
        status: "in progress",
        category: "Work",
        createdAt: 1727425014199,
        updatedAt: null,
        deleted: false
    },
    {
        id: "d304ff4d-cf26-4ba6-8162-6b3a36de3652",
        title: "Plan weekend getaway",
        priority: 3,
        status: "not started",
        category: "Travel",
        createdAt: 1727425085327,
        updatedAt: null,
        deleted: false
    },
    {
        id: "52dcd4fc-45ee-4209-ba40-acfdaad7dcaf",
        title: "Attend yoga class",
        priority: 2,
        status: "scheduled",
        category: "Health",
        createdAt: 1727425104837,
        updatedAt: null,
        deleted: false
    },
    {
        id: "c86fab9d-62d2-451d-9045-a473ae63c881",
        title: "Clean the house",
        priority: 5,
        status: "not started",
        category: "Personal",
        createdAt: 1727425134464,
        updatedAt: null,
        deleted: false
    },
    {
        id: "680fb0bb-08bf-468c-86da-d8acc6448f8f",
        title: "Prepare group presentation slides",
        priority: 4,
        status: "in progress",
        category: "School",
        createdAt: 1727425206312,
        updatedAt: 1727425283258,
        deleted: false
    }
];

exports.create = (req, res) => {
    const { title, priority, status, category } = req.body;

    if (!title || typeof priority !== 'number' || !status || !category) {
        return res.status(400).send({ type: "Error", message: "Must include title, priority, status, and category" });
    }

    const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        priority: priority,
        status: status,
        category: category,
        createdAt: Date.now(),
        updatedAt: null,
        deleted: false,
    };

    todos.push(newTodo);
    res.status(201).send(newTodo);
};

exports.read = (req, res) => {
    const filteredTodos = todos.filter(todo => !todo.deleted);
    res.send(filteredTodos);
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { title, priority, status, category } = req.body;

    const todo = todos.find(todo => todo.id === id);
    if (!todo || todo.deleted) {
        return res.status(404).send({ message: "Todo not found" });
    }

    if (title) {
        todo.title = title;
    }
    if (typeof priority === 'number') {
        todo.priority = priority;
    }
    if (status) {
        todo.status = status;
    }
    if (category) {
        todo.category = category;
    }
    todo.updatedAt = Date.now();

    res.send(todo);
};

exports.delete = (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === id);

    if (!todo || todo.deleted) {
        return res.status(404).send({ message: "Todo not found" });
    }

    todo.deleted = true;
    res.send({ message: "Todo marked as deleted", todo });
};