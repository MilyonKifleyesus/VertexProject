import React, { createContext, useContext, useState } from "react";

const JobContext = createContext(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "full-time",
    description:
      "We are looking for a Senior Frontend Developer to join our team and help build amazing user experiences. You will work with React, TypeScript, and modern web technologies.",
    requirements: ["React", "TypeScript", "CSS", "5+ years experience"],
    salary: "$120,000 - $150,000",
    postedDate: "2024-01-15",
    employerId: "1",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    type: "full-time",
    description:
      "Join our product team to drive strategy and execution for our cutting-edge products. Lead cross-functional teams and shape the future of our platform.",
    requirements: [
      "Product Management",
      "Agile",
      "Analytics",
      "3+ years experience",
    ],
    salary: "$100,000 - $130,000",
    postedDate: "2024-01-14",
    employerId: "2",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "remote",
    description:
      "Create beautiful and intuitive user experiences for our digital products. Work with a talented team of designers and developers.",
    requirements: [
      "Figma",
      "User Research",
      "Prototyping",
      "2+ years experience",
    ],
    salary: "$80,000 - $100,000",
    postedDate: "2024-01-13",
    employerId: "3",
  },
];

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(mockJobs);
  const [applications, setApplications] = useState([]);

  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split("T")[0],
    };
    setJobs([newJob, ...jobs]);
  };

  const getJobById = (id) => {
    return jobs.find((job) => job.id === id);
  };

  const applyToJob = (jobId, applicantData) => {
    const newApplication = {
      id: Date.now().toString(),
      jobId,
      applicantId: Date.now().toString(),
      applicantName: applicantData.name,
      applicantEmail: applicantData.email,
      coverLetter: applicantData.coverLetter,
      status: "pending",
      appliedDate: new Date().toISOString(),
    };
    setApplications([...applications, newApplication]);
  };

  const getApplicationsForJob = (jobId) => {
    return applications.filter((app) => app.jobId === jobId);
  };

  const getUserApplications = (userId) => {
    return applications.filter((app) => app.applicantId === userId);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        addJob,
        getJobById,
        applyToJob,
        getApplicationsForJob,
        getUserApplications,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
