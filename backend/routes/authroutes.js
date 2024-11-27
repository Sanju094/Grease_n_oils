const {
  Register,
  Login,
  getStations,
  getuser,
  updateLocation,
  getAllUsers,deleteUser, updateUserRole
} = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const { requireSignIn, isAdmin } = require("../Helper/middleware");

router.post("/register", Register);
router.post("/login", Login);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//fetch the station details
router.post("/getst", getStations);
//fetch the user details
router.post("/getuser", requireSignIn, getuser);
//used  to update the description of the station
router.put("/updatelocation", requireSignIn, updateLocation);
//fetch all the users details
router.post("/getallusers", getAllUsers)
router.delete("/register/:id",deleteUser)
router.patch("/register/:id", updateUserRole);


module.exports = router;
