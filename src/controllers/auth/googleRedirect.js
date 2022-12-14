const queryString = require('query-string');
const axios = require('axios');
const { User } = require('../../models');
const statisticsService = require('../../service/statistics');
const { createToken, registerEmail } = require('../../service/user');
const { sendEmail } = require('../../helpers');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL } =
  process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  // eslint-disable-next-line camelcase
  const { given_name, email } = userData.data;
  let user = await User.findOne({ email });

  if (!user) {
    await User.create({ name: given_name, email });
    user = await User.findOne({ email });
    await statisticsService.addStatistics(user._id);
    const mail = await registerEmail({ name: user.name, email: user.email });
    await sendEmail(mail);
  }

  const token = await createToken(user._id);

  return res.redirect(
    // eslint-disable-next-line camelcase
    `${FRONTEND_URL}/answer-google?token=${token}`
  );
};

module.exports = googleRedirect;
