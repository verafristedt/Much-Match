const { parse } = require("json2csv");

module.exports = function(app) {
  const Image = app.models.Image;
  const Swipe = app.models.Swipe;
  const Subject = app.models.Subject;

  Swipe.export = function(cb) {
    Promise.all([Swipe.find(), Image.find(), Subject.find()])
      .then(([swipes, images, users]) => {
        const res = [];

        swipes.forEach(swipe => {
          const rst = o => JSON.parse(JSON.stringify(o));
          swipe = rst(swipe);
          const image = rst(images.find(img => img.id == swipe.image));
          const user = rst(users.find(usr => usr.id == swipe.user));
          const swp = {
            swp_id: swipe.id,
            img_id: image.id,
            usr_id: user.id
          };
          const addPropsPrefixed = (dst, prefix, src) => {
            for (const prop in src) {
              dst[prefix + "_" + prop] = src[prop];
            }
          };
          addPropsPrefixed(swp, "swp", swipe);
          addPropsPrefixed(swp, "usr", user);
          addPropsPrefixed(swp, "img", image);
          res.push(swp);
        });

        // const fields = Object.keys(res[0]);
        // const opts = { fields };

        cb(null, parse(res), "text/csv");
      })
      .catch(err => cb(err));
  };
  Swipe.remoteMethod("export", {
    http: {
      path: "/export",
      verb: "get"
    },
    returns: [
      {
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
    // {
    //   type: "array"
    // }
  });
};
