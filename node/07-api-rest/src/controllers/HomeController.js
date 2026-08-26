class HomeController {
  index(req, res) {
    res.json({ message: "Welcome to the API" });
  }
}

export default new HomeController();
