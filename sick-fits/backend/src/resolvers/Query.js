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
  },
  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId)
      throw new Error("You must be logged in to see this order");
    // 2. Query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id }
      },
      info
    );
    // 3. Check if they have permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermission = ctx.request.user.permissions.includes("ADMIN");
    if (!ownsOrder || !hasPermission)
      throw new Error("You have no permission fellow");
    // 4. Return the order
    return order;
  }
  // async items(parent, args, ctx, info) {
  //   console.log("getting items");
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
};

module.exports = Query;
