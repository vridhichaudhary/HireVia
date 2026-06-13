"use client";
export const getTrackedJobs = () => {
  if (typeof window === "undefined") return [];
  try {
    const storage = window.localStorage;
    if (!storage || typeof storage.getItem !== "function") return [];

    const data = storage.getItem("trackedJobs");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Safe localStorage read failed:", error);
    return [];
  }
};

export const saveTrackedJobs = (jobs) => {
  if (typeof window === "undefined") return;
  try {
    const storage = window.localStorage;
    if (!storage || typeof storage.setItem !== "function") return;
    storage.setItem("trackedJobs", JSON.stringify(jobs));
  } catch (error) {
    console.error("Safe localStorage write failed:", error);
  }
};

export const addTrackedJob = (job) => {
  const jobs = getTrackedJobs();
  // Avoid duplicates
  if (!jobs.some((j) => j.id === job.id)) {
    const updated = [...jobs, job];
    saveTrackedJobs(updated);
  }
};

export const removeTrackedJob = (id) => {
  const jobs = getTrackedJobs();
  const updated = jobs.filter((job) => job.id !== id);
  saveTrackedJobs(updated);
  return updated;
};

export const isJobTracked = (id) => {
  const jobs = getTrackedJobs();
  return jobs.some((job) => job.id === id);
};
