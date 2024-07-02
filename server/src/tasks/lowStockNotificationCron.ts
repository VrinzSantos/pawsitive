import cron from "node-cron";
import Inventory, { IInventory } from "../models/inventory.model";
import Notification from "../models/notification.model";

cron.schedule("*/10 * * * * *", async () => {
  // console.log("Running every 10 seconds");
  try {
    // Query for low stock products (you can adjust the threshold as needed)
    const lowStockProducts: IInventory[] = await Inventory.find({
      stocksLeft: { $lte: 5 }, // Example threshold: less than or equal to 5 stocks left
    });

    // Iterate through each low stock product
    for (const product of lowStockProducts) {
      // Check if a notification already exists for the product
      const existingNotification = await Notification.findOne({
        title: `${product.productName} is low in stock`,
      });

      // If no notification exists, create a new one
      if (!existingNotification) {
        const newNotification = new Notification({
          title: `${product.productName} is low in stock`,
          image: product.productImage,
          description: `Only ${product.stocksLeft} stocks left for ${product.productName}`,
          date: new Date(),
          seen: false,
        });

        // Save the new notification to the database
        await newNotification.save();

        console.log(`New notification created for ${product.productName}`);
      }
    }

    // console.log("Low stock notifications processed successfully");
  } catch (error) {
    console.error("Error processing low stock notifications:", error);
  }
});
