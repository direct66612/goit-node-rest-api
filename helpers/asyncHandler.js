async function asyncHandler(clb, ...data) {
  try {
    return data ? await clb(...data) : await clb();
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = { asyncHandler };
