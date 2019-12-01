const {
  parse
} = require("json2csv");

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}

function rst(o) {
  return JSON.parse(JSON.stringify(o))
}

function addPropsPrefixed(dst, prefix, src) {
  for (const prop in src) {
    dst[prefix + "_" + prop] = src[prop];
  }
}

module.exports = function (app) {
  const Image = app.models.Image;
  const Swipe = app.models.Swipe;
  const Subject = app.models.Subject;

  Swipe.export = async function (db_delay) {
    db_delay = db_delay ? db_delay : 1200;
    const swipes = await Swipe.find();
    await delay(db_delay);
    const images = await Image.find();
    await delay(db_delay);
    const users = await Subject.find();
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

    return [parse(res), "text/csv"]
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
