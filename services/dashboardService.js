const config = require('../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false,
  }
);

class DashboardService {
  formatDate(date) {
    console.log('ggggggggggg', date);
    const formatDate = new Date(date);
    const previousDate = formatDate.setDate(formatDate.getDate() - 7);
    const dateMinusSevenDays = new Date(previousDate);
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    // Generate yyyy-mm-dd date string
    let formattedDate = year + '-' + month + '-' + day;

    return {
      year,
      month,
      dateMinusSevenDays: dateMinusSevenDays.toISOString().split('T')[0],
      formattedDate,
    };
  }

  async getTop10MostSeledProducts(topTenDate) {
    const { year, month } = this.formatDate(topTenDate);
    const [results] = await sequelize.query(
      `SELECT p.id, p.name, p.price, p.amount AS 'stock', COUNT(sd.amount) AS 'sold_units', s.sale_date AS 'sale_date'
      FROM products AS p 
      INNER JOIN sales_details AS sd ON p.id= sd.id_product 
      INNER JOIN sales AS s ON s.id = sd.id_sale 
      WHERE MONTH(s.sale_date) = ${month} AND  YEAR(s.sale_date) = ${year}
      GROUP BY p.id, s.sale_date
      ORDER BY sold_units DESC
      LIMIT 10;`
    );
    return [results];
  }
  async getTop10LessSoldProducts(topTenDate) {
    const { year, month } = this.formatDate(topTenDate);
    const [results] = await sequelize.query(
      `SELECT p.id, p.name, p.price, p.amount AS 'stock', COUNT(sd.amount) AS 'sold_units', s.sale_date AS 'sale_date'
      FROM products AS p 
      INNER JOIN sales_details AS sd ON p.id= sd.id_product 
      INNER JOIN sales AS s ON s.id = sd.id_sale 
      WHERE MONTH(s.sale_date) = ${month} AND  YEAR(s.sale_date) = ${year}
      GROUP BY p.id, s.sale_date
      ORDER BY sold_units ASC
      LIMIT 10;`
    );
    return [results];
  }
  async getMonthlyIncome(monthlyIncomeDate) {
    const { year } = this.formatDate(monthlyIncomeDate);
    const [results] = await sequelize.query(
      `SELECT MONTH(sale_date) AS 'month', SUM(total_purchase) AS 'total_per_month' 
      FROM sales 
      WHERE YEAR(sale_date) = ${year} 
      GROUP BY MONTH(sale_date)
      ORDER BY month ASC;`
    );
    return [results];
  }
  async getDailySales(date) {
    const { dateMinusSevenDays, formattedDate } = this.formatDate(date);
    const [results] = await sequelize.query(
      `SELECT sale_date, SUM(total_purchase) AS 'total_per_day' 
      FROM sales 
      WHERE sale_date BETWEEN '${dateMinusSevenDays}' AND '${formattedDate}'  
      GROUP BY sale_date;`
    );
    return [results];
  }
}

module.exports = DashboardService;
