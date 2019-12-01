const {
  parse
} = require("json2csv");

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}

module.exports = function (app) {
  const Image = app.models.Image;
  const Swipe = app.models.Swipe;
  const Subject = app.models.Subject;

  Swipe.export = function (db_delay, cb) {
    db_delay = db_delay ? db_delay : 1200;
    const swipes = [];
    const images = [];
    const users = [];
    Swipe.find()
      .then(data => swipes.push(data))
      .then(() => delay(db_delay))
      .then(() => Image.find())
      .then(data => images.push(data))
      .then(() => delay(db_delay))
      .then(() => Subject.find())
      .then(data => users.push(data))
      .then(() => {
        const rst = o => JSON.parse(JSON.stringify(o));
        const addPropsPrefixed = (dst, prefix, src) => {
          for (const prop in src) {
            dst[prefix + "_" + prop] = src[prop];
          }
        };
        const res = [];
        swipes.forEach(swipe => {
          swipe = rst(swipe);
          const image = rst(images.find(img => img.id == swipe.image));
          const user = rst(users.find(usr => usr.id == swipe.user));
          const swp = {
            swp_id: swipe.id,
            img_id: image.id,
            usr_id: user.id
          };
          addPropsPrefixed(swp, "swp", swipe);
          addPropsPrefixed(swp, "usr", user);
          addPropsPrefixed(swp, "img", image);
          res.push(swp);
        });

        cb(null, parse(res), "text/csv");
      })
      .catch(err => {
        console.log(err);
        cb(err);
      });
  };
  Swipe.remoteMethod("export", {
    http: {
      path: "/export",
      verb: "get"
    },
    accepts: {
      arg: 'db_delay',
      type: 'number'
    },
    returns: [{
        arg: "body",
        type: "file",
        root: true
      },
      {
        arg: "Content-Type",
        type: "string",
        http: {
          target: "header"
        }
      }
    ]
  });
};
