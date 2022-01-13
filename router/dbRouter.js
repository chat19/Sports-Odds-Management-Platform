const Router = require("koa-router");
const shopify = require("../../services/shopify");

const router = new Router({
  prefix: "/api/customers",
});

function register(app) {
  router.post("/get", async (ctx) => {
    // const purchaseUpdate = {
    //   7443809140977: 1,
    //   7516467396849: 5,
    //   7516467298545: 10,
    //   7519373263089: -1,
    // };
    const purchaseUpdate = {
      11912860631281: 1,
      11912860696817: 5,
      11912860729585: 10,
      11912860762353: -1,
    };
    const order_count = await shopify.order.count();
    console.log("ordercount", order_count);
    const orders = await shopify.order.list({
      limit: order_count,
      status: "paid",
    });
    var filtered_orders = [];
    // customer_order = [];
    // for(order in orders ){
    //   customer_order[order.customer.id].push(order)
    // }
    var track = 0;
    orders.forEach((order) => {
      order.line_items.forEach((item) => {
        if (Object.keys(purchaseUpdate).includes(item.id)) {
          const customer_id = order.customer.id;
          if (filtered_orders[customer_id]) {
            track =
              purchaseUpdate[item.id] + filtered_orders[customer_id].track;
            filtered_orders[customer_id].track = track;
          } else {
            track = purchaseUpdate[item.id];
            const temp = {
              [customer_id]: {
                order_id: order.id,
                customer_id: customer_id,
                item_id: item.id,
                email: order.customer.email,
                item_title: item.title,
                track: track,
              },
            };
            filtered_orders.push(temp);
          }
        }
      });
    });

    ctx.body = { success: true, data: filtered_orders, orders: orders };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
