const Job = require("../models/job");

const getAllJobs = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const jobs = await Job.find({ createdBy: userId });
  res.status(200).json({ count: jobs.length, jobs });
};

const getJob = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { userId },
    } = req;
    const job = await Job.findOne({ _id: id, createdBy: userId });
    if (!job) {
      const err = new Error(`No relevant job found with id ${id}`);
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ job });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createJob = async (req, res, next) => {
  try {
    const {
      body: { company, position },
      user: { userId },
    } = req;
    if (!company || !position) {
      const err = new Error("Company aur position tera baap bataega?!!!");
      err.statusCode = 400;
      throw err;
    }
    const job = await Job.create({ ...req.body, createdBy: userId });
    res.status(201).json({ job });
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { userId },
    } = req;
    const job = await Job.findOneAndRemove({ _id: id, createdBy: userId });
    if (!job) {
      const err = new Error(`No relevant job found with id ${id}`);
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ msg: "job deleted", job });
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { userId },
      body: { company, position },
    } = req;
    if (!company || !position) {
      const err = new Error("Company aur position tera baap bataega?!!!");
      err.statusCode = 400;
      throw err;
    }
    const job = await Job.findOneAndUpdate(
      { _id: id, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      const err = new Error(`No relevant job found with id ${id}`);
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ job });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllJobs, createJob, deleteJob, getJob, updateJob };
