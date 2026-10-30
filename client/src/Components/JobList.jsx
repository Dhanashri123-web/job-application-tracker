import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, onDelete, onEdit }) => {
  return (
    <div>
      <h2> My job Application</h2>
      <p>My job Applications:{jobs.length}</p>
      {jobs.map((job ) => (
        <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default JobList;
