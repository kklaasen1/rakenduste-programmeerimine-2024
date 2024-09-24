const cats = ["Fluffy"];

exports.create = (req, res) => {
    const { name } = req.body;

    const newCat = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        updatedAt: null,
        deleted: false,
    }

    cats.push({ newCat });

    res.send(newCat);
};

exports.read = (req, res) => {
    res.send("ok");
};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};