const router = require("express").Router();
const path = require("path");
const UserController = require("../controller/userController");
const authentication = require("../middleware/authentication");

router.get("/", (req, res) => {
  return res.sendFile(path.join(process.cwd() + "/FE/lib/index.html"));
});
router.get("/login", (req, res) => {
  return res.sendFile(path.resolve(process.cwd() + "/FE/lib/login.html"));
});
router.post("/login", UserController.Login);
router.get("/register", (req, res) => {
  return res.sendFile(
    path.join(process.cwd() + "/FE/lib/register.html")
  );
});
router.post("/register", UserController.Register);
router.get('/home', (req, res) => {
  return res.sendFile(
    path.join(process.cwd() + "/FE/lib/home.html")
  );
})
router.get("/balance", authentication, UserController.GetBalance);
router.post("/balance", authentication, UserController.AddBalance);

module.exports = router;
