const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if you are logged in
    //console.log(...args);
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );
    console.log(item);
    return item;
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // Remove the id from the updates
    delete updates.id;
    //Run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id , title }`);
    // 2. check if they own the item or have permission
    // Todo
    // 3. delete it !
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
