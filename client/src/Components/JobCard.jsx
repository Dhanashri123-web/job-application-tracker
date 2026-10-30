import React from "react";

const JobCard = ({ job, onDelete, onEdit }) => {
  return (
    <div className="job-card">
      <div className="job-info">
        <h3>{job.name}</h3>
        <p>
          <strong>Role:</strong> {job.role}
        </p>
        <p>
          <strong>Status:</strong> {job.status}
        </p>
        <p>
          <strong>Application Date:</strong> {job.date}
        </p>
      </div>

      <div className="job-actions">
        <button type="button" onClick={() => onEdit(job)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(job.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
