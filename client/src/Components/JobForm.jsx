import { useEffect, useState } from "react";

const JobForm = ({ onAddJob, editingJob, onUpdateJob }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    console.log("Editing job in form:", editingJob);
    if (editingJob) {
      setName(editingJob.name);
      setRole(editingJob.role);
      setStatus(editingJob.status);
      setDate(editingJob.date);
    } else {
      setName("");
      setRole("");
      setStatus("");
      setDate("");
    }
  }, [editingJob]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !role.trim() || !status || !date) {
      alert("Please fill all fields");
      return;
    }

    const job = {
      id: editingJob ? editingJob.id : Date.now(),
      name: name,
      role: role,
      status: status,
      date: date,
    };
    if (editingJob) {
      onUpdateJob(job);
    } else {
      onAddJob(job);
    }
    setName("");
    setRole("");
    setStatus("");
    setDate("");
    console.log(job);
  };

  return (
    <div>
      <h2>Add Job Application</h2>

      <form onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Job Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>

        <label>Application Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">
          {editingJob ? "Update Application" : "Add Application"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
