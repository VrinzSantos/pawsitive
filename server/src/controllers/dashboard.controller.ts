import { Request, Response } from "express";
import Order from "../models/orders.model"; // Assuming the model is imported from a file
import userModel from "../models/user.model";
import Inventory from "../models/inventory.model";
import Appointment from "../models/appointment.model";
import { formatDate } from "../utils";
import ClientRecordModel from "../models/client.model";

// Sales per day
export const getSalesToday = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const salesTodayData = await Order.aggregate([
      {
        $match: {
          orderDate: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          salesToday: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.send({ success: true, salesToday: salesTodayData[0]?.salesToday || 0 });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Total users
export const getUserCount = async (req: Request, res: Response) => {
  try {
    const userCount = await userModel.countDocuments();
    res.status(200).json({ success: true, data: { userCount } }); // Proper response with success status and data
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ success: false, error: "Internal server error" }); // Proper error response
  }
};

// Total appointments
export const getTotalAppointments = async (req: Request, res: Response) => {
  try {
    const appointmentCount = await Appointment.countDocuments();
    res.status(200).json({ success: true, data: { appointmentCount } }); // Proper response with success status and data
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ success: false, error: "Internal server error" }); // Proper error response
  }
};

// Total Products
export const getNumberOfProducts = async (req: Request, res: Response) => {
  try {
    const numberOfProducts = await Inventory.countDocuments();
    res.status(200).json({ success: true, data: { numberOfProducts } }); // Proper response with success status and data
  } catch (error) {
    console.error("Error fetching number of products:", error);
    res.status(500).json({ success: false, error: "Internal server error" }); // Proper error response
  }
};

// Montly average
export const getMonthlyAverageSales = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-based, so we add 1

    // Aggregate total sales for the current month across all years
    const monthlySales = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $month: currentMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
            month: { $month: "$orderDate" },
          },
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Compute the average sales for the current month
    const totalSales = monthlySales.reduce(
      (sum, sale) => sum + sale.totalSales,
      0
    );
    const averageSales = totalSales / monthlySales.length;

    // Prepare the response
    const response = {
      month: currentMonth,
      averageSales,
      targetAchieved: averageSales >= 50000,
    };

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching current month average sales:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get weeekly sales

export const getWeeklySales = async (req: Request, res: Response) => {
  try {
    // Calculate the start date of the current week (Sunday)
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday of the current week
    startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00

    // Calculate the end date of the current week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday of the current week
    endOfWeek.setHours(23, 59, 59, 999); // Set time to 23:59:59

    // Query for orders within the current week and group by day
    const dailySales = await Order.aggregate([
      {
        $match: {
          orderDate: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day
      },
    ]);

    // Prepare the response
    const response = dailySales.map((sale) => ({
      date: sale._id,
      totalSales: sale.totalSales,
    }));

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching weekly sales:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get best selling item
export const getBestSellingProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const value = parseInt(req.query.value as string);

    // Fetch products with stockOut and price information
    const products = await Inventory.find(
      {},
      "productName stocksOut productPrice"
    );

    // Calculate total sales for each product (stocksOut * productPrice)
    const bestSellingProducts = products.map((product) => {
      const stocksOut = product.stocksOut || 0; // Default to 0 if stocksOut is undefined
      const productPrice = product.productPrice || 0; // Use correct field name

      return {
        productName: product.productName,
        stocksOut: stocksOut,
        totalSales: stocksOut * productPrice,
      };
    });

    // Sort products based on total sales in descending order
    bestSellingProducts.sort((a, b) => b.totalSales - a.totalSales);

    // Limit the result to the specified number of best-selling products
    const topProducts = bestSellingProducts.slice(0, value);

    res.send({ success: true, bestSellingProducts: topProducts });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getLowSellingProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const value = parseInt(req.query.value as string);

    // Fetch products with stockOut and price information
    const products = await Inventory.find(
      {},
      "productName stocksOut productPrice"
    );

    // Calculate total sales for each product (stocksOut * productPrice)
    const lowSellingProduct = products.map((product) => {
      const stocksOut = product.stocksOut || 0; // Default to 0 if stocksOut is undefined
      const productPrice = product.productPrice || 0; // Use correct field name

      return {
        productName: product.productName,
        stocksOut: stocksOut,
        totalSales: stocksOut * productPrice,
      };
    });

    // Sort products based on total sales in ascending order
    lowSellingProduct.sort((a, b) => a.totalSales - b.totalSales);

    // Limit the result to the low 3 selling products
    const lowSellingProducts = lowSellingProduct.slice(0, value);

    res.send({ success: true, lowSellingProducts: lowSellingProducts });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// get distribution
export const getProductCategoryDistribution = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Aggregate data to get product category distribution
    const categoryDistribution = await Inventory.aggregate([
      {
        $group: {
          _id: "$productCategory",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.send({ success: true, categoryDistribution });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Montly Sales
export const getMonthlySalesController = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch orders with orderDate information
    const orders = await Order.find({}, "totalAmount orderDate");

    // Organize orders by month
    const monthlySalesData: Record<string, number> = {};

    orders.forEach((order) => {
      const monthYear = order.orderDate.toISOString().slice(0, 7); // Get YYYY-MM (month-year)
      if (!monthlySalesData[monthYear]) {
        monthlySalesData[monthYear] = 0;
      }
      monthlySalesData[monthYear] += order.totalAmount;
    });

    // Convert monthlySalesData object to an array of objects with date instead of monthYear
    const formattedMonthlySalesData = Object.entries(monthlySalesData).map(
      ([monthYear, totalAmount]) => ({
        date: monthYear, // Change monthYear to date
        TotalAmount: totalAmount,
      })
    );

    // Sort the array by date
    formattedMonthlySalesData.sort((a, b) => a.date.localeCompare(b.date));

    res.json({ success: true, monthlySalesData: formattedMonthlySalesData });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// TODO: get monthly best products
export const getMonthlyBestProducts = async (_req: Request, res: Response) => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Perform aggregation to calculate the total amount for each product sold in its respective month
    const result = await Order.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$createdAt" }, currentYear],
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "inventories",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%b", date: "$createdAt" } },
            product: "$productDetails.productName",
          },
          totalAmount: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.productPrice"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          products: {
            $push: {
              productName: "$_id.product",
              totalAmount: "$totalAmount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          products: {
            $filter: {
              input: "$products",
              as: "product",
              cond: { $gt: ["$$product.totalAmount", 15000] },
            },
          },
        },
      },
      // {
      //   $match: { products: { $ne: [] } }, // Remove months with empty products array
      // },
      // {
      //   $sort: { date: 1 }, // Sort by date ascending
      // },
    ]);

    // Transform the data to match the expected output format
    const formattedResult = result.map((item: any) => {
      const formattedItem: any = { date: item.date };
      item.products.forEach((product: any) => {
        formattedItem[product.productName] = product.totalAmount;
      });
      return formattedItem;
    });

    // Send the formatted response
    res.status(200).json({ success: true, data: formattedResult });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMonthlyLowSellingProducts = async (
  _req: Request,
  res: Response
) => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Perform aggregation to calculate the total amount for each product sold in its respective month
    const result = await Order.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$createdAt" }, currentYear],
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "inventories",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%b", date: "$createdAt" } },
            product: "$productDetails.productName",
          },
          totalAmount: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.productPrice"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          products: {
            $push: {
              productName: "$_id.product",
              totalAmount: "$totalAmount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          products: {
            $filter: {
              input: "$products",
              as: "product",
              cond: { $lt: ["$$product.totalAmount", 15000] },
            },
          },
        },
      },
      // {
      //   $match: { products: { $ne: [] } }, // Remove months with empty products array
      // },
      // {
      //   $sort: { date: 1 }, // Sort by date ascending
      // },
    ]);

    // Transform the data to match the expected output format
    const formattedResult = result.map((item: any) => {
      const formattedItem: any = { date: item.date };
      item.products.forEach((product: any) => {
        formattedItem[product.productName] = product.totalAmount;
      });
      return formattedItem;
    });

    // Send the formatted response
    res.status(200).json({ success: true, data: formattedResult });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const citiesInMetroManila = [
  "Manila",
  "Caloocan",
  "Las Piñas",
  "Makati",
  "Malabon",
  "Mandaluyong",
  "Marikina",
  "Muntinlupa",
  "Navotas",
  "Parañaque",
  "Pasay",
  "Pasig",
  "Pateros",
  "Quezon City",
  "San Juan",
  "Taguig",
  "Valenzuela",
];

const generatedColors = new Set<string>();

function generateRandomHexColor(): string {
  let color: string;

  do {
    color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
  } while (generatedColors.has(color));

  generatedColors.add(color);
  return color;
}
export const getClientsByLocation = async (req: Request, res: Response) => {
  try {
    const clients = await ClientRecordModel.find({});

    const cityCounts = citiesInMetroManila
      .map((city) => {
        const cityRegex = new RegExp(city, "i");
        const total = clients.filter((client) =>
          cityRegex.test(client.address)
        ).length;
        return {
          name: city,
          value: total,
          color: generateRandomHexColor(),
        };
      })
      .filter((cityCount) => cityCount.value > 0); // Remove cities with no clients

    res.status(200).json({ success: true, data: cityCounts });
  } catch (error) {
    console.error("Error fetching clients by location:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getPetsBreedCount = async (req: Request, res: Response) => {
  try {
    const clients = await ClientRecordModel.find({});

    const breedCounts: { [breed: string]: number } = {};

    clients.forEach((client) => {
      const breed = client.petsBreed;
      if (breed in breedCounts) {
        breedCounts[breed]++;
      } else {
        breedCounts[breed] = 1;
      }
    });

    const result = Object.keys(breedCounts).map((breed) => ({
      name: breed,
      value: breedCounts[breed],
      color: generateRandomHexColor(),
    }));

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching pets breed count:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
