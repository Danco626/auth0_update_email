const jwt_decode = require('jwt-decode');
const { sendOtpEmail, verifyOtp, deleteUser, updateUser } = require("../services/auth.service");

const credentialsView = async (req, res, next) => {
  const user = req.oidc.user;
  res.render('credentials', { user });
};

//add additional check such as prompt=login or mfa
const beginEmailVerification = async (req, res, next) => {
  const updatedEmail = req.body.updated_email;

  if (updatedEmail) {
    try {
      const result = await sendOtpEmail(updatedEmail);
      console.log(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  res.render('verifyEmail', { updatedEmail });
}

const completeEmailVerification = async (req, res, next) => {

  const updatedEmail = req.body.updated_email;
  const otpCode = req.body.otp_code;

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const options = { forwarderFor: ip };

  let signInResult;
  let passwordlessUserId;

  try {
    if (!otpCode) throw new Error("An OTP is required to validate your udpated email");

    signInResult = await verifyOtp(updatedEmail, otpCode, options);
    const decodedIdToken = jwt_decode(signInResult.id_token);
    passwordlessUserId = decodedIdToken.sub;

    const primaryProfileId = req.oidc.user.sub;
    const userUpdateResult = await updateUser(primaryProfileId, { email: updatedEmail, email_verified: true });
    console.log(userUpdateResult);
    deleteUser(passwordlessUserId);
    
    res.oidc.logout({ returnTo: '/' });   

  } catch (err) {
    console.log(err);    
    next(err);
  }

}


module.exports = { credentialsView, beginEmailVerification, completeEmailVerification };