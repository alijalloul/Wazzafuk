import jobPostDB from "../schema/JobPostSchema.js";
import applicationDB from "../schema/applicationSchema.js";
import employeeDB from "../schema/employeeSchema.js";

export async function getJobPostsForEmployer(req, res) {
  const { employerId, page } = req.params;

  try {
    const LIMIT = 8;
    const startIndex = (page - 1) * LIMIT;
    const totalPosts = await jobPostDB.countDocuments({ employer_id: employerId });

    const jobPosts = await jobPostDB.find({ employer_id: employerId }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: jobPosts, numberOfPages: Math.ceil(totalPosts / LIMIT) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching job posts" });
  }
}

export async function getJobPostsForEmployee(req, res) {
  const { employeeId, page } = req.params;

  console.log(req.params);
  try {
    const LIMIT = 8;
    const startIndex = (page - 1) * LIMIT;
    const totalPosts = await applicationDB.find({ employee_id: employeeId }).populate("job_id").countDocuments();

    const applications = await applicationDB.find({ employee_id: employeeId }).populate("job_id").sort({ _id: -1 }).limit(LIMIT).skip(startIndex).exec();
    const appliedJobPosts = applications.map((app) => app.job_id);

    console.log(appliedJobPosts);

    res.status(200).json({ data: appliedJobPosts, numberOfPages: Math.ceil(totalPosts / LIMIT) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching job posts" });
  }
}

export async function getAppliedEmployees(req, res) {
  const { jobId } = req.params;

  try {
    const applications = await applicationDB.find({ job_id: jobId }).sort({ _id: -1 });

    const employeeData = await Promise.all(
      applications.map(async (application) => {
        const employee = await employeeDB.findOne({ _id: application.employee_id });
        employee._doc.coverLetter = application.coverLetter;
        return employee;
      })
    );

    res.status(200).json(employeeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applications" });
  }
}

export async function hireEmployee(req, res) {
  const { jobId, employeeId } = req.params;

  try {
    await jobPostDB.findByIdAndRemove(jobId);

    await applicationDB.findOneAndUpdate({ job_id: jobId, employee_id: employeeId }, { status: "hired" });

    res.status(200).send("Hired successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error hiring employee" });
  }
}

export async function createJobPost(req, res) {
  const body = req.body;

  try {
    const newJobPost = await jobPostDB.create(body);
    res.status(200).json(newJobPost);
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: "Error creating job post" });
  }
}

export async function deleteJobPost(req, res) {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No post with that id" });
    }

    await jobPostDB.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting job post" });
  }
}

export async function getJobPosts(req, res) {
  const { page } = req.params;

  try {
    const LIMIT = 8;
    const startIndex = (page - 1) * LIMIT;
    const totalPosts = await jobPostDB.countDocuments({});

    const jobPosts = await jobPostDB.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: jobPosts, numberOfPages: Math.ceil(totalPosts / LIMIT) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching job posts" });
  }
}

export async function applyForJob(req, res) {
  const body = req.body;

  try {
    const applied = await applicationDB.findOne({
      employee_id: body.employee_id,
      job_id: body.job_id,
    });

    if (applied) {
      return res.status(404).json({ message: "You have already applied to this job" });
    }

    await applicationDB.create(body);
    res.status(200).send("Applied successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying for job" });
  }
}
