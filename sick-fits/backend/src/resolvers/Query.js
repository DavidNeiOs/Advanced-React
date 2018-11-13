const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");
const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    //check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  users(parent, args, ctx, info) {
    // 1 check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in");
    }
    // 2 check if user has the permission to query all users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    // 3 query all users
    return ctx.db.query.users({}, info);
  }
  // async items(parent, args, ctx, info) {
  //   console.log("getting items");
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
};

module.exports = Query;
