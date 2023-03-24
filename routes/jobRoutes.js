const express = require("express");
const {
  getAllJobs,
  createJob,
  deleteJob,
  getJob,
  updateJob,
} = require("../controllers/jobs");

const router = express.Router();

router.post("/", createJob);

router.get("/", getAllJobs);

router.get("/:id", getJob);

router.delete("/:id", deleteJob);

router.patch("/:id", updateJob);

module.exports = router;
