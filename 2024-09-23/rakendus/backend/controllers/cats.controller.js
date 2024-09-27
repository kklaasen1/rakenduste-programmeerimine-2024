const crypto = require('crypto');
const cats = [
    {
      id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
      name: "Meow",
      createdAt: 1727098800585,
      updatedAt: null,
      deleted: false,
    },
    {
      id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
      name: "Kitty",
      createdAt: 1727098952739,
      updatedAt: null,
      deleted: false,
    },
    {
        id: "61df6a0d-9cef-4e4c-8298-1a5d555adb2e",
        name: "Fluffy",
        createdAt: 1727422834959,
        updatedAt: null,
        deleted: false
    },
    {
        id: "7cfad279-90c9-4e2b-b470-a64442028e83",
        name: "John",
        createdAt: 1727422852759,
        updatedAt: null,
        deleted: false
    }
];

exports.create = (req, res) => {
    const { name } = req.body;

    if (!name || name === "") {
        return res
          .status(418)
          .send({ type: "Error", message: "Must include a name" });
      }

    const newCat = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        updatedAt: null,
        deleted: false,
    }

    cats.push(newCat);

    res.send(newCat);
};

exports.read = (req, res) => {
    const filteredCats = cats.filter(cat => !cat.deleted);
    res.send(filteredCats);
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const cat = cats.find(cat => cat.id === id);
    if (!cat || cat.deleted) {
        return res.status(404).send({ message: "Cat not found" });
    }

    if (name) {
        cat.name = name;
        cat.updatedAt = Date.now();
    }

    res.send(cat);
};

exports.delete = (req, res) => {
    const { id } = req.params;
    const cat = cats.find(cat => cat.id === id);

    if (!cat || cat.deleted) {
        return res.status(404).send({ message: "Cat not found" });
    }

    cat.deleted = true;
    res.send({ message: "Cat marked as deleted", cat });
};