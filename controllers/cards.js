const { CARDS } = require("./mockData.module");

class CardsController {
  getItems(req, res) {
    const { search } = req.query;
    return res.json({
      data: CARDS.filter(
        (c) =>
          c.title.toLowerCase().includes(search?.toLowerCase()|| "") ||
          c.text.toLowerCase().includes(search?.toLowerCase() || ""),
      ),
    });
  }
}

module.exports = new CardsController();
