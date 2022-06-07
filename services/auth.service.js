const authClient = require("../libs/authenticationHelper").getAuthClient();
const mgmtClient = require("../libs/authenticationHelper").getMgmtClient();

const sendOtpEmail = async (email) => {
  if (!email) throw new Error("Email is required");

  return authClient.passwordless.sendEmail({
    email: email,
    send: "code"
  });
};

const verifyOtp = async (email, otp, options) => {
  if (!email) throw new Error("Email is required");
  if (!otp) throw new Error("OTP Code is required");

  return authClient.passwordless.signIn({
    username: email,
    otp: otp,
    realm: 'email'
  }, options);
};

const deleteUser = async (id) => {
  if (!id) throw new Error("User id is required");

  const userIdObject = { id };
  return mgmtClient.deleteUser(userIdObject);
};

//https://auth0.github.io/node-auth0/ManagementClient.html#updateUser
const updateUser = async (id, userData) => {
  if (!id) throw new Error("User id is required");

  if (!userData.hasOwnProperty("email") && !userData.hasOwnProperty("password")) {
    throw new error("Only email and password updates are supported");
  }

  const userIdObject = { id };
  return mgmtClient.updateUser(userIdObject, userData);
};

module.exports = { sendOtpEmail, verifyOtp, deleteUser, updateUser };