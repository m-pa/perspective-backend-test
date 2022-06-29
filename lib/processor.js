module.exports = async(job) => {
  const message = job.data;
  console.log(job.data)
  return {success: true};
}
