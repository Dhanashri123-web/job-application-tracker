import React, { useState, useEffect } from "react";
import JobForm from "./Components/jobForm";
import JobList from "./Components/JobList";
import "./App.css";

const App = () => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);
  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };
  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };
  const handleEditJob = (job) => {
    console.log("Selected job:", job);
    setEditingJob(job);
  };

  const handleUpdate = (updatedJob) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
    setEditingJob(null);
  };
  const filteredJobs = jobs.filter(
    (job) =>
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || job.status === filter)
  );
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    return new Date(a.date) - new Date(b.date);
  });
  const totalJobs = jobs.length;
  const appliedJobs = jobs.filter((job) => job.status === "Applied").length;
  const interviewJobs = jobs.filter((job) => job.status === "Interview").length;
  const selectedJobs = jobs.filter((job) => job.status === "Selected").length;
  const rejectedJobs = jobs.filter((job) => job.status === "Rejected").length;
  return (
    <div>
      <h1>job application tracker</h1>
      <div className="dashboard">
        <div>Total Jobs: {totalJobs}</div>
        <div>Applied: {appliedJobs}</div>
        <div>Interview: {interviewJobs}</div>
        <div>Selected: {selectedJobs}</div>
        <div>Rejected: {rejectedJobs}</div>
      </div>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search Company..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Selected">Selected</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      <JobForm
        onAddJob={handleAddJob}
        editingJob={editingJob}
        onUpdateJob={handleUpdate}
      />
      <JobList
        jobs={sortedJobs}
        onDelete={handleDeleteJob}
        onEdit={handleEditJob}
      />
    </div>
  );
};

export default App;
