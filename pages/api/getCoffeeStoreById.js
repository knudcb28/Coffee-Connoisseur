const getCoffeeStoreById = (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      res.json({ message: `id is created ${id}` });
    } else {
        res.status(400);
        res.json({message: "Id is missing"})
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "something went wrong", error });
  }
};

export default getCoffeeStoreById;
