const puppeteer = require("puppeteer");
module.exports.LoginController = function (req, res) {
  try {
    (async function () {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true
      });
      const page = await browser.newPage();
      await page.goto(`https://hot.opensauced.pizza/`, {
        timeout: 0
      });
      const buttonSelector = "#headlessui-menu-button-:r0:";
      const token = await page.evaluate((buttonSelector) => {
        const element = document.querySelector(buttonSelector);
        element.click();
        console.stdlog = console.log.bind(console);
        console.logs = [];
        console.log = function () {
          console.logs.push(Array.from(arguments));
          console.stdlog.apply(console, arguments);
        };
        const authButton = document.querySelector(
          "#headlessui-menu-item-:r16:"
        );
        authButton.click();
        return console.logs[0][1];
      }, buttonSelector);
      res.status(200).json({
        status: "Success",
        description: "Authenticated",
        token: token
      });
      await browser.close();
    })();
  } catch (err) {}
};

module.exports.EmailController = function (req, res) {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASSWD}`
      }
    })
  );

  const mailOptions = {
    from: `${process.env.EMAIL}`,
    to: req.body.email,
    subject: "Invite to OpenSauced",
    text: "Hey I want to invite you to opensauced, Join at https://insights.opensauced.pizza"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
