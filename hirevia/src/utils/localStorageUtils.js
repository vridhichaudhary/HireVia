export const getTrackedJobs = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("trackedJobs");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const addTrackedJob = (job) => {
  const jobs = getTrackedJobs();
  const updated = [...jobs, job];
  localStorage.setItem("trackedJobs", JSON.stringify(updated));
};

export const isJobTracked = (id) => {
  const jobs = getTrackedJobs();
  return jobs.some((job) => job.id === id);
};
